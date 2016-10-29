/**
 * Ui object
 * 
 * Resposible for view rendering and attaching events handlers
 */


export default function Ui() {
    this.DOMElements = {
        gameBoard: document.getElementById('gameBoard'),
    };
};

/**
 * showMark(field, mark) 
 * shows player mark in gameboard field
 */

Ui.prototype.showMark = function(field, mark) {
    const selector = "#" + field + ' .' + mark + 'mark';
    const element = this.DOMElements.gameBoard.querySelector(selector);
    element.classList.remove('hidden');
    element.classList.add('visible');
};
