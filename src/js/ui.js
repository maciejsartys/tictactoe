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
  this.eventHandlers.boardClick = this.setBoardClickHandler()
}

/**
 * showMark(field, mark)
 * shows player mark in gameboard field
 */

Ui.prototype.showMark = function (field, mark) {
  const selector = '#' + field + ' .' + mark + 'mark'
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

Ui.prototype.setBoardClickHandler = function () {
  this.DOMElements.gameBoard.addEventListener('click', (event) => {
    if (event.target.className === 'field') {
      this.game.move(Map({
        player: this.game.playerMark,
        field: event.target.id
      }))
    }
  })
  return {
    type: 'click',
    element: this.gameboard
  }
}
