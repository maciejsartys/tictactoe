export default function Ai () {
}

Ai.prototype.getMove = function (board, player) {
  let field
  do {
    field = this.getRandomField()
  } while (board.get(field) !== null)
  return field
}

Ai.prototype.getRandomField = function () {
  const row = Math.floor(Math.random() * 3)
  const column = Math.floor(Math.random() * 3)
  return 'r' + row + 'c' + column
}
