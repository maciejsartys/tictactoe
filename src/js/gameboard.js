import {Map} from 'immutable';

export default function gameBoard() {
    this.BOARD_ROWS = 3;
    this.BOARD_COLS = 3;
    
    this.boardScaffold = Map({});
    for (var i = 0; i < this.BOARD_ROWS; i++) {
        for (var j = 0; j < this.BOARD_COLS; j++) {
            this.boardScaffold = this.boardScaffold.set('r'+i+'c'+j, null);
        }
    }
    this.reset();
}

gameBoard.prototype.getBoardState = function() {
    return this.playerO.mergeWith((previos, next) => previos || next, (this.playerX));
};

gameBoard.prototype.reset = function() {
    this.playerO = Map({}).merge(this.boardScaffold);
    this.playerX = Map({}).merge(this.boardScaffold);
};

gameBoard.prototype.move = function(player, field) {
    if (this[player].has(field) && this.getBoardState().get(field) === null) {
        this[player] = this[player].set(field, player.charAt(6));
    } else {
        throw new Error('Illegal move');
    }
};