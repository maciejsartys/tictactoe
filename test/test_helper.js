import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const doc = jsdom.jsdom("<!doctype html><html> \
    <div id='app' class='container'> \
        <div id='infoBox' class='container'> \
            <h2 class='comm'></h2> \
        </div> \
        <div id='main' class='container'> \
            <div id='shutter' class='hidden'> \
                <h2 id='gameResult' class='comm'></h2> \
                <button id='resetGame' class='btn'>Start new game</button> \
            </div> \
            <div id='gameBoard' class='container gameBoard'> \
                <div class='field' id='r0c0'><p class='mark Xmark hidden'>X</p><p class='mark Omark hidden'>O</p></div> \
                <div class='field' id='r0c1'><p class='mark Xmark hidden'>X</p><p class='mark Omark hidden'>O</p></div> \
                <div class='field' id='r0c2'><p class='mark Xmark hidden'>X</p><p class='mark Omark hidden'>O</p></div> \
                <div class='field' id='r1c0'><p class='mark Xmark hidden'>X</p><p class='mark Omark hidden'>O</p></div> \
                <div class='field' id='r1c1'><p class='mark Xmark hidden'>X</p><p class='mark Omark hidden'>O</p></div> \
                <div class='field' id='r1c2'><p class='mark Xmark hidden'>X</p><p class='mark Omark hidden'>O</p></div> \
                <div class='field' id='r2c0'><p class='mark Xmark hidden'>X</p><p class='mark Omark hidden'>O</p></div> \
                <div class='field' id='r2c1'><p class='mark Xmark hidden'>X</p><p class='mark Omark hidden'>O</p></div> \
                <div class='field' id='r2c2'><p class='mark Xmark hidden'>X</p><p class='mark Omark hidden'>O</p></div> \
            </div> \
            <div id='chooseSide' class='hidden'> \
                <button id='playerO'>O</button> \
                <button id='playerX'>X</button> \
            </div> \
        </div> \
    </div> \
</body></html>");
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);

