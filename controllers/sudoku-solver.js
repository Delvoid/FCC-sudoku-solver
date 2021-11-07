const letterToNumber = (row) => {
  switch (row.toUpperCase()) {
    case 'A':
      return 1
    case 'B':
      return 2
    case 'C':
      return 3
    case 'D':
      return 4
    case 'E':
      return 5
    case 'F':
      return 6
    case 'G':
      return 7
    case 'H':
      return 8
    case 'I':
      return 9
    default:
      return 'none'
  }
}
const transform = (puzzleString) => {
  // take ..53..23.23. => [[0,0,5,3,0,0,2,3,0],
  // [2,3,0]
  let grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
  let row = -1
  let col = 0
  for (let i = 0; i < puzzleString.length; i++) {
    if (i % 9 == 0) {
      row++
    }
    if (col % 9 == 0) {
      col = 0
    }

    grid[row][col] = puzzleString[i] === '.' ? 0 : +puzzleString[i]
    col++
  }
  return grid
}
const checkRowPlacement = (puzzleString, row, column, value) => {
  let grid = transform(puzzleString)
  row = letterToNumber(row)
  if (grid[row - 1][column - 1] !== 0) return false

  for (let i = 0; i < 9; i++) {
    if (grid[row - 1][i] == value) return false
  }
  return true
}
const checkColPlacement = (puzzleString, row, column, value) => {
  let grid = transform(puzzleString)
  row = letterToNumber(row)
  if (grid[row - 1][column - 1] !== 0) return false

  for (let i = 0; i < 9; i++) {
    if (grid[i][column - 1] == value) return false
  }
  return true
}
const checkRegionPlacement = (puzzleString, row, col, value) => {
  let grid = transform(puzzleString)
  row = letterToNumber(row)
  if (grid[row - 1][col - 1] !== 0) return false

  let startRow = row - (row % 3),
    startCol = col - (col % 3)
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) if (grid[i + startRow][j + startCol] == value) return false
  return true
}

const solveSuduko = (grid, row, col) => {
  const N = 9
  if (row == N - 1 && col == N) return grid
  if (col == N) {
    row++
    col = 0
  }
  if (grid[row][col] != 0) return solveSuduko(grid, row, col + 1)

  for (let num = 1; num < 10; num++) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num

      if (solveSuduko(grid, row, col + 1)) return grid
    }
    grid[row][col] = 0
  }
  return false
}

const isSafe = (grid, row, col, num) => {
  // Check if we find the same num
  // in the similar row , we
  // return false
  for (let x = 0; x <= 8; x++) if (grid[row][x] == num) return false

  // Check if we find the same num
  // in the similar column ,
  // we return false
  for (let x = 0; x <= 8; x++) if (grid[x][col] == num) return false

  // Check if we find the same num
  // in the particular 3*3
  // matrix, we return false
  let startRow = row - (row % 3),
    startCol = col - (col % 3)
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) if (grid[i + startRow][j + startCol] == num) return false

  return true
}

const transformBack = (grid) => {
  return grid.flat().join('')
}
const solve = (puzzleString) => {
  if (puzzleString.length != 81) return false

  if (/[^0-9.]/g.test(puzzleString)) return false

  let grid = transform(puzzleString)
  let solved = solveSuduko(grid, 0, 0)
  if (!solved) return false

  let solvedString = transformBack(solved)
  console.log('solvedString :>> ', solvedString)
  return solvedString
}

module.exports = { solve, checkRegionPlacement, checkColPlacement, checkRowPlacement }
