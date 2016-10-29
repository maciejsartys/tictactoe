import { expect } from 'chai';
import Ui from '../src/js/ui';

describe('User interface', () => {
  before(() => {
    
    let boardElement = document.body.appendChild(document.createElement('div'));
    boardElement.classList.add('gameBoard');
    boardElement.id = 'gameBoard';
    boardElement.innerHTML = (
      "<div class='field' id='r0c0'><p class='mark xmark hidden'>X</p><p class='mark omark hidden'>O</p></div>" +
      "<div class='field' id='r0c1'><p class='mark xmark hidden'>X</p><p class='mark omark hidden'>O</p></div>" +
      "<div class='field' id='r0c2'><p class='mark xmark hidden'>X</p><p class='mark omark hidden'>O</p></div>" +
      "<div class='field' id='r1c0'><p class='mark xmark hidden'>X</p><p class='mark omark hidden'>O</p></div>" +
      "<div class='field' id='r1c1'><p class='mark xmark hidden'>X</p><p class='mark omark hidden'>O</p></div>" +
      "<div class='field' id='r1c2'><p class='mark xmark hidden'>X</p><p class='mark omark hidden'>O</p></div>" +
      "<div class='field' id='r2c0'><p class='mark xmark hidden'>X</p><p class='mark omark hidden'>O</p></div>" +
      "<div class='field' id='r2c1'><p class='mark xmark hidden'>X</p><p class='mark omark hidden'>O</p></div>" +
      "<div class='field' id='r2c2'><p class='mark xmark hidden'>X</p><p class='mark omark hidden'>O</p></div>"
      );
  });
  
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
});