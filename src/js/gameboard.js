import {Map, List} from 'immutable';

/** 
* Gameboard object
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

export default function Gameboard() {
    this.BOARD_ROWS = 3;
    this.BOARD_COLS = 3;
    
    // Map of empty board with keys set
    this.boardScaffold = Map({});
    for (var i = 0; i < this.BOARD_ROWS; i++) {
        for (var j = 0; j < this.BOARD_COLS; j++) {
            this.boardScaffold = this.boardScaffold.set('r'+i+'c'+j, null);
        }
    }
    //lines helps find if game is won by any of players
    this._lines = List.of(
    List.of('r0c0', 'r0c1', 'r0c2'),
    List.of('r1c0', 'r1c1', 'r1c2'),
    List.of('r2c0', 'r2c1', 'r2c2'),
    List.of('r0c0', 'r1c0', 'r2c0'),
    List.of('r0c1', 'r1c1', 'r2c1'),
    List.of('r0c2', 'r1c2', 'r2c2'),
    List.of('r0c0', 'r1c1', 'r2c2'),
    List.of('r0c2', 'r1c1', 'r2c0')
    );
    this._playerO;
    this._playerX;
    
    this.reset();
}

/**
 * boardState
 * getter: returns current state of board based on players moves
 */
Gameboard.prototype = {
    get boardState() {
        return this._playerO.mergeWith(
            (previos, next) => previos || next, (this._playerX));
    },
    get lines() {
        return this._lines;
    }
};


/**
 * reset() 
 * clear players moves 
 */

Gameboard.prototype.reset = function() {
    this._playerO = Map({}).merge(this.boardScaffold);
    this._playerX = Map({}).merge(this.boardScaffold);
};


Gameboard.prototype.getPlayerMoves = function(player) {
    if (player !== 'playerX' && player !== 'playerO' ) {
        throw new Error('Illegal argument');
    }
    return this['_' + player];
};


/**
 * addMove() 
 * adds next move onto board and checks if move is legal (field is empty).
 * Throws 'Illegal move' error if not.
 */

Gameboard.prototype.addMove = function(player, field) {
    player = '_' + player;
    if (typeof this[player] === undefined) {
        throw new Error('Wrong player parameter');
    }
    if (this[player].has(field) !== true || this.boardState.get(field) !== null) {
        throw new Error('Wrong field parameter ' + field);
    }
    this[player] = this[player].set(field, player.charAt(7));
    return this;
};

Gameboard.prototype.isFull = function() {
    return this.boardState.filter((element) => {
        return element === null;
        }).size > 0 ? false : true;
};