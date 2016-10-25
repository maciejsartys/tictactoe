import {Map} from 'immutable';

/** 
* gameBoard object
* 
* Holds information about board state and accept moves that change it.
* Moves of player X And O are hold in seperate Maps.
* Board is a Map, with keys in format "rXcY" where X address row and
* Y address column of board:
* 
* [r0c0] [r0c1] ...
* [r1c0] [r1c1] ...
*  ...     ...
* 
*/

export default function gameBoard() {
    this.BOARD_ROWS = 3;
    this.BOARD_COLS = 3;
    
    // Map of empty board with keys set
    this.boardScaffold = Map({});
    for (var i = 0; i < this.BOARD_ROWS; i++) {
        for (var j = 0; j < this.BOARD_COLS; j++) {
            this.boardScaffold = this.boardScaffold.set('r'+i+'c'+j, null);
        }
    }
    this.reset();
}

/**
 * reset() 
 * clear players moves 
 */

gameBoard.prototype.reset = function() {
    this.playerO = Map({}).merge(this.boardScaffold);
    this.playerX = Map({}).merge(this.boardScaffold);
};

/**
 * getBoardState()
 * returns current state of board based on players moves
 */

gameBoard.prototype.getBoardState = function() {
    return this.playerO.mergeWith(
        (previos, next) => previos || next, (this.playerX));
};

/**
 * move() 
 * adds next move onto board and checks if move is legal (field is empty).
 * Throws 'Illegal move' error if not.
 */

gameBoard.prototype.move = function(player, field) {
    // TODO check if player parameter have correct form
    
    if (this[player].has(field) && this.getBoardState().get(field) === null) {
        this[player] = this[player].set(field, player.charAt(6));
    } else {
        throw new Error('Illegal move');
    }
};