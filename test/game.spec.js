import { assert } from 'chai';
import { Map } from 'immutable';
import Game from '../src/js/game';

describe('Game', () => {
  let game;
  beforeEach(() => {
    game = new Game();
  });
  //choose side, playerMove, gameFinished,
  it('initialize new game at beginning', () => {
    assert.deepEqual(game.state, new Map({
      type: 'chooseSide',
      value: null
    }));
  });
  it('wait for next move if game is still underway');
  it('is finished when one of players won');
  it('is finished when it is draw');
  describe('result', () => {
    it('can show that game is still underway', () => {
      game.gameboard.move('playerO', 'r1c1').move('playerO', 'r0c0');
      game.gameboard.move('playerX', 'r2c0').move('playerX', 'r2c1');
      let lastMove = Map({
        player: 'playerX',
        field: 'r2c1'
      });
      assert.equal(game.checkResult(lastMove), 'underway');
    });
    it('can show that game is won by one of players', () => {
      game.gameboard.move('playerO', 'r1c1').move('playerO', 'r0c0')
        .move('playerO', 'r2c2');
      game.gameboard.move('playerX', 'r2c0').move('playerX', 'r2c1');
      let lastMove = Map({
        player: 'playerO',
        field: 'r2c2'
      });
      assert.equal(game.checkResult(lastMove), 'won');
      
      game = new Game();
      game.gameboard.move('playerO', 'r0c1').move('playerO', 'r1c0')
        .move('playerO', 'r1c2').move('playerO', 'r2c0').move('playerO', 'r2c1');
      game.gameboard.move('playerX', 'r0c0').move('playerX', 'r0c2')
        .move('playerX', 'r1c1').move('playerX', 'r2c2');
      lastMove = Map({
        player: 'playerX',
        field: 'r2c2'
      });
      assert.equal(game.checkResult(lastMove), 'won');
    });
    it('can determines if game is drawn', () => {
      game.gameboard.move('playerO', 'r0c1').move('playerO', 'r1c0')
        .move('playerO', 'r1c2').move('playerO', 'r2c0').move('playerO', 'r2c2');
      game.gameboard.move('playerX', 'r0c0').move('playerX', 'r0c2')
        .move('playerX', 'r1c1').move('playerX', 'r2c1');
      let lastMove = Map({
        player: 'playerO',
        field: 'r2c2'
      });
      assert.equal(game.checkResult(lastMove), 'draw');
    });
  });
  describe('players moves', () => {
    it('lets player choose side');
    it('handle player move');
    it('gets move from AI');
    it('refuses invalid moves');
    it('check game result after move');
  });
});
