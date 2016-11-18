import { assert, expect } from 'chai';
import { Map } from 'immutable';
import Game from '../src/js/game';
const sinon = require('sinon');

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
  it('wait for next move if game is still underway', () => {
    game.state = Map({
      type: 'playerMove',
      value: 'playerO'
    });
    game.next('underway');
    expect(game.state).equal(Map({
      type: 'playerMove',
      value: 'playerX'
    }));
    
    game.state = Map({
      type: 'playerMove',
      value: 'playerX'
    });
    game.next('underway');
    expect(game.state).equal(Map({
      type: 'playerMove',
      value: 'playerO'
    }));
  });
  it('is finished when one of players won', () => {
    game.state = Map({
      type: 'playerMove',
      value: 'playerO'
    });
    game.next('won');
    expect(game.state).equal(Map({
      type: 'won',
      value: 'playerO'
    }));
  });
  it('is finished when it is draw', () => {
    game.state = Map({
      type: 'playerMove',
      value: 'playerO'
    });
    game.next('underway');
    expect(game.state).equal(Map({
      type: 'draw',
      value: null
    }));
  });
  describe('result', () => {
    it('can show that game is still underway', () => {
      game.gameboard.addMove('playerO', 'r1c1').addMove('playerO', 'r0c0');
      game.gameboard.addMove('playerX', 'r2c0').addMove('playerX', 'r2c1');
      let lastMove = Map({
        player: 'playerX',
        field: 'r2c1'
      });
      assert.equal(game.checkResult(lastMove), 'underway');
    });
    it('can show that game is won by one of players', () => {
      game.gameboard.addMove('playerO', 'r1c1').addMove('playerO', 'r0c0')
        .addMove('playerO', 'r2c2');
      game.gameboard.addMove('playerX', 'r2c0').addMove('playerX', 'r2c1');
      let lastMove = Map({
        player: 'playerO',
        field: 'r2c2'
      });
      assert.equal(game.checkResult(lastMove), 'won');
      
      game = new Game();
      game.gameboard.addMove('playerO', 'r0c1').addMove('playerO', 'r1c0')
        .addMove('playerO', 'r1c2').addMove('playerO', 'r2c0').addMove('playerO', 'r2c1');
      game.gameboard.addMove('playerX', 'r0c0').addMove('playerX', 'r0c2')
        .addMove('playerX', 'r1c1').addMove('playerX', 'r2c2');
      lastMove = Map({
        player: 'playerX',
        field: 'r2c2'
      });
      assert.equal(game.checkResult(lastMove), 'won');
    });
    it('can determines if game is drawn', () => {
      game.gameboard.addMove('playerO', 'r0c1').addMove('playerO', 'r1c0')
        .addMove('playerO', 'r1c2').addMove('playerO', 'r2c0').addMove('playerO', 'r2c2');
      game.gameboard.addMove('playerX', 'r0c0').addMove('playerX', 'r0c2')
        .addMove('playerX', 'r1c1').addMove('playerX', 'r2c1');
      let lastMove = Map({
        player: 'playerO',
        field: 'r2c2'
      });
      assert.equal(game.checkResult(lastMove), 'draw');
    });
  });
  it('updates board state after move', () => {
    const addMove_spy = sinon.spy(game.gameboard, 'addMove');
    const nextMove = Map({
        player: 'playerO',
        field: 'r1c1'
      });
    
    game.move(nextMove);
    expect(addMove_spy.withArgs('playerO', 'r1c1').calledOnce).to.be.true;
    game.gameboard.addMove.restore();
    });
    it('check result after move', () => {
      const checkResult_spy = sinon.spy(game, 'checkResult');
      const nextMove = Map({
        player: 'playerO',
        field: 'r1c1'
      });
      game.move(nextMove);
      expect(checkResult_spy.calledOnce).to.be.true;
    });
});
