import { expect } from 'chai';
import { render } from '../src/js/ui.js';

describe('Document', () => {
  it('has div', () => {
    render();
    expect(document.getElementById('test')).not.be.a('null');
  });
});