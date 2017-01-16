/* global eventFire, doc */

import {expect} from 'chai';
import Sinon from 'sinon'
import Ui from '../src/js/ui';

describe('User interface', () => {
  describe('InfoBox', () => {
    it('Display choosen message to user', () => {
      let ui = new Ui();
      ui.setInfoBoxMessage('sideSelect');
      let message = ui.DOMElements.infoBox.children[0].innerHTML;
      expect(message).equal('Choose side');
      
      ui.setInfoBoxMessage('draw');
      message = ui.DOMElements.infoBox.children[0].innerHTML;
      expect(message).equal('It\'s a draw');
    });
  });

  describe('gameboard', () => {

    it('can switch visibility of mark in field', () => {
      const ui = new Ui();
      ui.showMark('r0c0', 'x');
      const markX = ui.DOMElements.gameBoard.querySelector('#r0c0 .xmark');
      expect(markX.classList.contains('visible')).to.equal(true);
      expect(markX.classList.contains('hidden')).to.equal(false);
      ui.showMark('r1c2', 'o');
      const markO = ui.DOMElements.gameBoard.querySelector('#r1c2 .omark');
      expect(markO.classList.contains('visible')).to.equal(true);
      expect(markO.classList.contains('hidden')).to.equal(false);
    });
    it('react when user click field', () => {
      let game = {}
      game.playerMark = 'playerX'
      const moveSpy = game.move = Sinon.spy()
      let ui = new Ui(game)
      document.getElementById('r1c1').click()
      expect(moveSpy.calledOnce).to.equal(true)
    })
  });
});
