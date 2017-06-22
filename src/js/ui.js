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
    chooseSide: document.getElementById('chooseSide'),
    startNewGame: document.getElementById('resetGame')
  }
  this.eventHandlers = this.setHandlers()
  this.clearBoard()
}

Ui.prototype.clearBoard = function () {
  const fields = this.DOMElements.gameBoard.querySelectorAll('.field p')
  Array.prototype.forEach.call(fields, (el, i) => {
    el.classList.remove('visible')
    el.classList.add('hidden')
  })
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
  if (this.game.state.get('type') === 'underway' && event.target.className.includes('field')) {
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

Ui.prototype.startNewGameHandler = function (event) {
  this.game.reset()
}

Ui.prototype.setHandlers = function () {
  this.DOMElements.gameBoard.addEventListener('click', (event) => this.boardClickHandler(event))
  this.DOMElements.chooseSide.addEventListener('click', (event) => this.chooseSideHandler(event))
  this.DOMElements.startNewGame.addEventListener('click', (event) => this.startNewGameHandler(event))
  return {
    boardClickHandler: {
      type: 'click',
      element: this.DOMElements.gameboard
    },
    chooseSideHandler: {
      type: 'click',
      element: this.DOMElements.chooseSide
    },
    startNewGameHandler: {
      type: 'click',
      element: this.DOMElements.startNewGame
    }
  }
}
