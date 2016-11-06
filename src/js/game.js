import { Map, List } from 'immutable';
import Gameboard from './gameboard';

/** 
* game object
* 
*/

export default function Game() {
  this.state = new Map({
    type: 'chooseSide',
    value: null
  });
  this.gameboard = new Gameboard();
  this.playerMark = null;
}


/** 
* function checkResult
* depending on gameboard state can return 'won', 'draw' or 'underway'
*/

Game.prototype.checkResult = function(lastMove) {
    let linesValues = this.gameboard.lines.map((diagonal) => {
      return diagonal.map((field) => {
        return this.gameboard.getPlayerMoves(lastMove.get('player'))
               .get(field) === null ? 0 : 1;
      });
    });
    let isWon = linesValues.filter((diagonal) => {
      return diagonal.reduce((prev, next) => prev+next) === 3;
    }, 0).size > 0 ? true : false;
    if (isWon) {
      return  'won';
    } else {
      return this.gameboard.isFull() === true ? 'draw' : 'underway';
    }
};