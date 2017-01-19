import { Map } from 'immutable'

/**
 * Ui object
 *
 * Resposible for view rendering and attaching events handlers
 */

export default function Ui (game) {
  this.game = game
  this.eventHandlers = {}
  this.DOMElements = {
    gameBoard: document.getElementById('gameBoard'),
    shutter: document.getElementById('shutter'),
    infoBox: document.getElementById('infoBox'),
    chooseSide: document.getElementById('chooseSide')
  }
  this.eventHandlers = this.setHandlers();
}

/**
 * showMark(field, mark)
 * shows player mark in gameboard field
 */

Ui.prototype.showMark = function (move) {
  const mark = move.get('player').slice(-1)
  const selector = '#' + move.get('field') + ' .' + mark + 'mark'
  const element = this.DOMElements.gameBoard.querySelector(selector)
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
  this.DOMElements.infoBox.children[0].innerHTML = message
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

Ui.prototype.setHandlers = function () {
  this.DOMElements.gameBoard.addEventListener('click', this.boardClickHandler)
  this.DOMElements.chooseSide.addEventListener('click', this.chooseSideHandler)
  return {
    boardClickHandler: {
      type: 'click',
      element: this.DOMElements.gameboard
    },
    chooseSideHandler: {
      type: 'click',
      element: this.DOMElements.chooseSide
    }
  }
}

