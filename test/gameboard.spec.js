import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import Gameboard from '../src/js/gameboard.js';
import emptyBoard from './emptyboard';

describe('gameboard', () => {
  
  let board = new Gameboard();
  
  beforeEach(() => {
    board = new Gameboard();
  });
  
  describe('state', () => {
    it('is empty after initialization', () => {
      expect(board._playerO).to.equal(emptyBoard);
      expect(board._playerX).to.equal(emptyBoard);
    });
    
    it('returns current state', () => {
      board.move('playerO', 'r0c0').move('playerO', 'r1c1')
      .move('playerX', 'r2c0').move('playerX', 'r2c1');
      expect(board.boardState).to.equal(fromJS({
        r0c0: 'O', r0c1: null, r0c2: null,
        r1c0: null, r1c1: 'O', r1c2: null,
        r2c0: 'X', r2c1: 'X', r2c2: null,
      }));
    });
    
    it('resets state', ()=> {
      board.move('playerO', 'r0c0').move('playerO', 'r1c1')
      .move('playerX', 'r2c0').move('playerX', 'r2c1');
      board.reset();
      expect(board.boardState).to.equal(emptyBoard);
    });
  });
 
  describe('move', () => {
    beforeEach(() => {
      board.move('playerO', 'r0c0').move('playerO', 'r1c1')
      .move('playerX', 'r2c0').move('playerX', 'r2c1');
    });
    
    it('accepts legal move', () => {
      board.move('playerO', 'r0c2');
      board.move('playerX', 'r2c2');
      expect(board.boardState).to.equal(fromJS({
        r0c0: 'O', r0c1: null, r0c2: 'O',
        r1c0: null, r1c1: 'O', r1c2: null,
        r2c0: 'X', r2c1: 'X', r2c2: 'X',
      }));
    });
    
    it('refuse illegal move', () => {
      expect(() => {
        board.move('playerO', 'r2c0');
      }).to.throw('Illegal move');
    });
  });
});