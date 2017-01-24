import { fromJS } from 'immutable'
import { expect } from 'chai'
import Gameboard from '../src/js/gameboard.js'
import emptyBoard from './emptyboard'

describe('gameboard', () => {
  let board = new Gameboard()
  beforeEach(() => {
    board = new Gameboard()
  })
  describe('state', () => {
    it('should be empty after initialization', () => {
      expect(board._playerO).to.equal(emptyBoard)
      expect(board._playerX).to.equal(emptyBoard)
    })
    it('should return current state', () => {
      board.addMove('playerO', 'r0c0').addMove('playerO', 'r1c1')
      .addMove('playerX', 'r2c0').addMove('playerX', 'r2c1')
      expect(board.boardState).to.equal(fromJS({
        r0c0: 'O', r0c1: null, r0c2: null,
        r1c0: null, r1c1: 'O', r1c2: null,
        r2c0: 'X', r2c1: 'X', r2c2: null
      }))
    })
    it('should reset state', () => {
      board.addMove('playerO', 'r0c0').addMove('playerO', 'r1c1')
      .addMove('playerX', 'r2c0').addMove('playerX', 'r2c1')
      board.reset()
      expect(board.boardState).to.equal(emptyBoard)
    })
  })
  describe('move', () => {
    beforeEach(() => {
      board.addMove('playerO', 'r0c0').addMove('playerO', 'r1c1')
      .addMove('playerX', 'r2c0').addMove('playerX', 'r2c1')
    })
    it('should accept legal move', () => {
      board.addMove('playerO', 'r0c2')
      board.addMove('playerX', 'r2c2')
      expect(board.boardState).to.equal(fromJS({
        r0c0: 'O', r0c1: null, r0c2: 'O',
        r1c0: null, r1c1: 'O', r1c2: null,
        r2c0: 'X', r2c1: 'X', r2c2: 'X'
      }))
    })
    it('should refuse illegal move', () => {
      expect(() => {
        board.addMove('playerO', 'r2c0')
      }).to.throw()
      expect(() => {
        board.addMove('playerZ', 'r0c1')
      }).to.throw()
    })
  })
})
