/**
 * Ui object
 *
 * Resposible for view rendering and attaching events handlers
 */

export default function Ui () {
  this.DOMElements = {
    gameBoard: document.getElementById('gameBoard'),
    shutter: document.getElementById('shutter'),
    infoBox: document.getElementById('infoBox'),
    chooseSide: document.getElementById('chooseSide')
  }
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
