import { Map } from 'immutable'
import Gameboard from './gameboard'
import Ui from './ui'
import Ai from './ai'

/**
* game object
*
*/

export default function Game () {
  this.reset()
}

Game.prototype.reset = function () {
  this.state = Map({
    type: 'chooseSide',
    value: null
  })
  this.gameboard = new Gameboard()
  this.playerMark = null
  if (typeof this.ui !== 'undefined') {
    this.ui.removeAllHandlers()
  }
  this.ui = new Ui(this)
  this.ai = new Ai()
}

/**
 * function checkResult
 * @param object
 * depending on gameboard state can return 'won', 'draw' or 'underway'
 */

Game.prototype.checkResult = function (lastMove) {
  let linesValues = this.gameboard.lines.map((diagonal) => {
    return diagonal.map((field) => {
      return this.gameboard.getPlayerMoves(lastMove.get('player'))
        .get(field) === null ? 0 : 1
    })
  })
  let isWon = linesValues.filter((diagonal) => {
    return diagonal.reduce((prev, next) => prev + next) === 3
  }, 0).size > 0
  if (isWon) {
    return 'won'
  } else {
    return this.gameboard.isFull() === true ? 'draw' : 'underway'
  }
}

/**
 * function move
 * @param move
 * process current move and runs next step
 */
Game.prototype.move = function (move) {
  if (move instanceof Map !== true) {
    throw new TypeError('Invalid parameter')
  }
  this.gameboard.addMove(move.get('player'), move.get('field'))
  this.ui.showMark(move)
  const gameResult = this.checkResult(move)
  this.next(gameResult, move)
}

/**
 * function getNextMove
 * @param player
 */
Game.prototype.getNextMove = function (player) {
  if (player !== 'playerX' && player !== 'playerO') {
    throw new Error('Wrong parameter value: ' + player)
  }
  if (player === this.playerMark) {
    this.ui.waitForPlayerMove()
  } else {
    this.move(Map({
      field: this.ai.getMove(this.gameboard.boardState, player),
      player: player
    }))
  }
}

/**
 * function next
 * set new state of Game based on last action
 */

Game.prototype.next = function (result, lastMove) {
  switch (result) {
    case 'beginning':
      this.ui.setInfoBoxMessage('sideSelect')
      this.ui.showChooseSideBox()
    case 'underway':
      if (lastMove === null) {
        const firstSide = this.randomizeFirstSide()
        this.state = Map({
          type: 'playerMove',
          value: firstSide
        })
      } else {
        this.state = Map({
          type: 'playerMove',
          value: lastMove.get('player') === 'playerX' ? 'playerO' : 'playerX'
        })
      }
      this.getNextMove(this.state.get('value'))
      break
    case 'draw':
      this.state = Map({
        type: 'finished',
        value: 'draw'
      })
      break
    case 'won':
      this.state = Map({
        type: 'finished',
        value: lastMove.get('player')
      })
      break
  }
}

/**
 * function randomizeFirstSide
 * randomize side which will start game
 */

Game.prototype.randomizeFirstSide = function () {
  return Math.floor((Math.random() * 2)) === 0 ? 'playerO' : 'playerX'
}

Game.prototype.setPlayerMark = function (mark) {
  if (!(mark === 'playerO' || mark === 'playerX')) {
    throw new Error('Wrong player mark')
  }
  this.playerMark = mark
  this.next('underway', null)
}
