// 1. populate a board with tiles/mines
// 2. left click to reveal a tile
// 3. right click to flag a tile
// 4. game over when mine is revealed
// 5. game won when all non-mine tiles are revealed
// 6. reset game

import { createBoard } from "./logic"

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
console.log(board)
const boardElement = document.querySelector(".board")
boardElement.style.setProperty("--size", BOARD_SIZE)
board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.appendChild(tile.element)
  })
})
