import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import gameBoard from '../src/js/gameboard.js';

describe('gameboard', () => {
  const emptyBoard = fromJS({
    r0c0: null, r0c1: null, r0c2: null,
    r1c0: null, r1c1: null, r1c2: null,
    r2c0: null, r2c1: null, r2c2: null,
  });
  
  let board = new gameBoard();
  
  beforeEach(() => {
    board = new gameBoard();
  });
  
  describe('state', () => {
    it('is empty after initialization', () => {
      expect(board.playerO).to.equal(emptyBoard);
      expect(board.playerX).to.equal(emptyBoard);
    });
    
    it('returns current state', () => {
      board.playerO = emptyBoard.set('r0c0', 'O').set('r1c1', 'O');
      board.playerX = emptyBoard.set('r2c0', 'X').set('r2c1', 'X');
      expect(board.getBoardState()).to.equal(fromJS({
        r0c0: 'O', r0c1: null, r0c2: null,
        r1c0: null, r1c1: 'O', r1c2: null,
        r2c0: 'X', r2c1: 'X', r2c2: null,
      }));
    });
    
    it('resets state', ()=> {
      board.playerO = emptyBoard.set('r0c0', 'O').set('r1c1', 'O');
      board.playerX = emptyBoard.set('r2c0', 'X').set('r2c1', 'X');
      board.reset();
      expect(board.getBoardState()).to.equal(emptyBoard);
    });
  });
 
  describe('move', () => {
    before(() => {
      board.playerO = emptyBoard.set('r0c0', 'O').set('r1c1', 'O');
      board.playerX = emptyBoard.set('r2c0', 'X').set('r2c1', 'X');
    });
    
    it('accepts legal move', () => {
      board.move('playerO', 'r0c2');
      board.move('playerX', 'r2c2');
      expect(board.getBoardState()).to.equal(fromJS({
        r0c0: 'O', r0c1: null, r0c2: 'O',
        r1c0: null, r1c1: 'O', r1c2: null,
        r2c0: 'X', r2c1: 'X', r2c2: 'X',
      }));
    });
    
    it('refuse illegal move', () => {
      try {
        board.move('playerO', 'r2c0');
      } catch (e) {
        expect(e).to.equal(new Error('Illegal move'));
      }
    });
  });
});