import {expect} from 'chai'
import sinon from 'sinon'
import Ui from '../src/js/ui'
import { Map } from 'immutable'

describe('User interface', () => {
  describe('InfoBox', () => {
    it('should display choosen message to user', () => {
      let ui = new Ui()
      ui.setInfoBoxMessage('sideSelect')
      let message = ui.DOMElements.infoBox.children[0].innerHTML
      expect(message).equal('Choose side')
      ui.setInfoBoxMessage('draw')
      message = ui.DOMElements.infoBox.children[0].innerHTML
      expect(message).equal('It\'s a draw')
    })
  })
  describe('Choose side box', () => {
    it('should allow to choose side', () => {
      let game = {}
      let ui = new Ui(game)
      const setPlayerMarkSpy = game.setPlayerMark = sinon.spy()
      ui.chooseSideHandler({
        target: {
          tagName: 'BUTTON',
          id: 'playerX'
        }
      })
      expect(setPlayerMarkSpy.calledWith('playerX')).to.be.true
    })
  })
  describe('Start New Game button', () => {
    it('should reset game when clicked', () => {
      let game = {}
      let ui = new Ui(game)
      const reset = game.reset = sinon.spy()
      ui.startNewGameHandler()
      expect(reset.calledOnce).to.be.true
    })
  })
  describe('gameboard', () => {
    it('should switch visibility of mark in field', () => {
      const ui = new Ui()
      ui.showMark(Map({
        field: 'r0c0',
        player: 'playerX'}))
      const markX = ui.DOMElements.gameBoard.querySelector('#r0c0 .Xmark')
      expect(markX.classList.contains('visible')).to.equal(true)
      expect(markX.classList.contains('hidden')).to.equal(false)
      ui.showMark(Map({
        field: 'r1c2',
        player: 'playerO'
      }))
      const markO = ui.DOMElements.gameBoard.querySelector('#r1c2 .Omark')
      expect(markO.classList.contains('visible')).to.be.true
      expect(markO.classList.contains('hidden')).to.be.false
    })
    it('should react when user click field', () => {
      let game = {}
      game.playerMark = 'playerX'
      game.state = Map({type: 'underway'})
      const moveSpy = game.move = sinon.spy()
      let ui = new Ui(game)

      ui.boardClickHandler({
        target: {
          className: 'field',
          id: 'r1c1'
        }
      })
      expect(moveSpy.calledOnce).to.be.true
    })
  })
})
