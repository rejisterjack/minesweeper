// 1. populate a board with tiles/mines
// 2. left click to reveal a tile
// 3. right click to flag a tile
// 4. game over when mine is revealed
// 5. game won when all non-mine tiles are revealed
// 6. reset game

import {
  createBoard,
  markTile,
  revealTile,
  TILE_STATUSES,
  checkWin,
  checkLose,
} from "./logic"

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector(".board")
const minesLeftText = document.querySelector("[data-mine-count]")
const messageText = document.querySelector(".subtext")

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.appendChild(tile.element)
    tile.element.addEventListener("click", () => {
      revealTile(board, tile)
      checkGameEnd()
    })
    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault()
      markTile(tile)
      listMinesLeft()
    })
  })
})

boardElement.style.setProperty("--size", BOARD_SIZE)
minesLeftText.textContent = NUMBER_OF_MINES

function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
    )
  }, 0)
  minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount
}

function checkGameEnd() {
  const win = checkWin(board)
  const lose = checkLose(board)

  if (win || lose) {
    boardElement.addEventListener("click", stopProp, {
      capture: true,
    })
    boardElement.addEventListener("contextmenu", stopProp, {
      capture: true,
    })
  }

  if (win) {
    messageText.textContent = "You Win"
  }

  if (lose) {
    messageText.textContent = "You Lose"
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
        if (tile.mine) revealTile(board, tile)
      })
    })
  }
}

function stopProp(e) {
  e.stopImmediatePropagation()
}
