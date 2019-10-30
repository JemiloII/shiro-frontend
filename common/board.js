export const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
export const ranks = ['8', '7', '6', '5', '4', '3', '2', '1']

export default function board(chess) {
  let board = []
  chess
    .board()
    .map(tileBoard)
    .forEach((row) => {
      board = [...board, ...row]
    })
  return board
}

function getColor(ri, ci) {
  return (ri + ci) % 2 === 0 ? 'w' : 'b'
}

function getPosition(ri, ci) {
  return `${files[ci]}${ranks[ri]}`.toLowerCase()
}

function tileBoard(r, ri) {
  return r.map((c, ci) => ({
    ...c,
    tile: getColor(ri, ci),
    position: getPosition(ri, ci)
  }))
}
