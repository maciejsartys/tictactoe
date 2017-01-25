require('./css/main.scss')
import Game from './js/game'

function ready (fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

ready(() => {
  const game = new Game()
  return game
})
