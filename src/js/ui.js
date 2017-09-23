import { Map } from 'immutable'

/**
 * Ui object
 *
 * Resposible for view rendering and managing events handlers
 */

export default function Ui (game) {
  this.game = game
  this.eventHandlers = Map({})
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
  if (this.game.state.get('type') === 'playerMove' && event.target.className.includes('field')) {
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
  const boardClickHandler = this.boardClickHandler.bind(this)
  const chooseSideHandler = this.chooseSideHandler.bind(this)
  const startNewGameHandler = this.startNewGameHandler.bind(this)

  this.DOMElements.gameBoard.addEventListener('click', boardClickHandler)
  this.DOMElements.chooseSide.addEventListener('click', chooseSideHandler)
  this.DOMElements.startNewGame.addEventListener('click', startNewGameHandler)
  return Map({
    boardClickHandler: {
      type: 'click',
      element: this.DOMElements.gameBoard,
      fn: boardClickHandler
    },
    chooseSideHandler: {
      type: 'click',
      element: this.DOMElements.chooseSide,
      fn: chooseSideHandler
    },
    startNewGameHandler: {
      type: 'click',
      element: this.DOMElements.startNewGame,
      fn: startNewGameHandler
    }
  })
}

Ui.prototype.removeHandler = function (handlerName) {
  const handler = this.eventHandlers.get(handlerName)
  handler.element.removeEventListener(handler.type, handler.fn)
  this.eventHandlers.delete(handlerName)
}

Ui.prototype.removeAllHandlers = function () {
  this.eventHandlers.forEach((handler, handlerName) => {
    this.removeHandler(handlerName)
  })
}

Ui.prototype.waitForPlayerMove = function () {

}

Ui.prototype.changeVisibility = function(element, action) {
  switch (element) {
    case 'chooseSideBox':
      break
    case 'startNewGame':
      break
    case 'shutter':
      break
  }

}