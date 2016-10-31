import { assert } from 'chai';
import { Map } from 'immutable';
import Game from '../src/js/game';
import gameBoard from '../src/js/gameboard';

describe('Game Logic', () => {
  let game;
  describe('game state', () => {
    beforeEach(() => {
      game = new Game();
    });
    
    it('has game state', () => {
      assert.typeOf(game.state, 'object');
    });
        //choose side, playerMove, gameFinished,
    it('initialize new game at beginning', () => {
      assert.deepEqual(game.state, new Map({ type: 'chooseSide', value: null}));
    }); 
    it('has board state', () => {
      assert.instanceOf(game.gameBoard, gameBoard);
    });
    it('can check if game is won by one of players');
    it('can determine if game is drawn');
  });
  describe('players moves', () => {
    it('lets player choose side');
    it('handle player move');
    it('gets move from AI');
    it('refuses invalid moves');
    it('check game result after move');
  });
});
