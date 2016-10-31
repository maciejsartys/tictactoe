import gameBoard from './gameboard';
import { Map } from 'immutable';

/** 
* game object
* 
*/

export default function Game() {
  this.state = new Map({
    type: 'chooseSide',
    value: null
  });
  this.gameBoard = new gameBoard();
  
}