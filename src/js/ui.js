import { Map } from 'immutable'

/**
 * Ui object
 *
 * Resposible for view rendering and attaching events handlers
 */

export default function Ui (game) {
  this.game = game
  this.eventHandlers = Map({})
  this.DOMElements = Map({
    gameBoard: document.getElementById('gameBoard'),
    shutter: document.getElementById('shutter'),
    infoBox: document.getElementById('infoBox'),
    chooseSide: document.getElementById('chooseSide')
  })
  this.eventHandlers = Map({})
}

/**
 * showMark(field, mark)
 * shows player mark in gameboard field
 */

Ui.prototype.showMark = function (move) {
  const mark = move.get('player').slice(-1)
  const selector = '#' + move.get('field') + ' .' + mark + 'mark'
  const element = this.DOMElements.get('gameBoard').querySelector(selector)
  element.classList.remove('hidden')
  element.classList.add('visible')
}

Ui.prototype.setInfoBoxMessage = function (messageType) {
  let message = (() => {
    switch (messageType) {
      case 'sideSelect':
        return 'Choose side'
      case 'draw':
        return 'It\'s a draw'
      case 'playerTurn':
        return 'Your turn'
      case 'AITurn':
        return 'Computer turn'
      default:
        throw new Error('Wrong type of message')
    }
  })()
  this.DOMElements.get('infoBox').children[0].innerHTML = message
}

Ui.prototype.boardClickHandler = function (event) {
  if (event.target.className === 'field') {
    this.game.move(Map({
      player: this.game.playerMark,
      field: event.target.id
    }))
  }
}

Ui.prototype.chooseSideHandler = function (event) {
  if (event.target.tagName === 'BUTTON') {
    this.game.setPlayerMark(event.target.id)
  }
}

Ui.prototype.toggleChooseSide = function () {
  if (this.eventHandlers.has('chooseSide')) {
    let handler = this.eventHandlers.get('chooseSide')
    handler.get('element').removeEventListener(handler.get('type'), handler.get('func'))
    this.eventHandlers = this.eventHandlers.delete('chooseSide')
  } else {
    this.DOMElements.get('chooseSide').addEventListener('click', event => this.chooseSideHandler(event))
    this.eventHandlers = this.eventHandlers.set('chooseSide', Map({
      type: 'click',
      element: this.DOMElements.get('chooseSide'),
      func: event => this.chooseSideHandler(event)
    }))
  }
}

Ui.prototype.toggleBoard = function () {
  if (this.eventHandlers.has('boardClick')) {
    let handler = this.eventHandlers.get('boardClick')
    handler.get('element').removeEventListener(handler.get('type'), handler.get('func'))
    this.eventHandlers = this.eventHandlers.delete('boardClick')
  } else {
    this.DOMElements.get('gameBoard').addEventListener('click', (event) => this.boardClickHandler(event))
    this.eventHandlers = this.eventHandlers.set('boardClick', Map({
      type: 'click',
      element: this.DOMElements.get('gameBoard'),
      func: (event) => this.boardClickHandler(event)
    }))
  }
}
