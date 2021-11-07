'use strict'

const {
  solve,
  checkRegionPlacement,
  checkColPlacement,
  checkRowPlacement,
} = require('../controllers/sudoku-solver.js')

module.exports = function (app) {
  app.route('/api/check').post((req, res) => {
    const { puzzle, coordinate, value } = req.body
    if (!puzzle || !coordinate || !value) return res.json({ error: 'Required field(s) missing' })

    const row = coordinate.split('')[0]
    const column = coordinate.split('')[1]
    if (coordinate.length !== 2 || !/[a-i]/i.test(row) || !/[1-9]/i.test(column)) {
      return res.json({ error: 'Invalid coordinate' })
    }
    if (!/[1-9]/i.test(value)) return res.json({ error: 'Invalid value' })
    if (puzzle.length != 81) return res.json({ error: 'Expected puzzle to be 81 characters long' })
    if (/[^0-9.]/g.test(puzzle)) return res.json({ error: 'Invalid characters in puzzle' })

    let validCol = checkColPlacement(puzzle, row, column, value)
    let validReg = checkRegionPlacement(puzzle, row, column, value)
    let validRow = checkRowPlacement(puzzle, row, column, value)

    let conflicts = []
    if (validCol && validReg && validRow) return res.json({ valid: true })

    if (!validRow) {
      conflicts.push('row')
    }
    if (!validCol) {
      conflicts.push('column')
    }
    if (!validReg) {
      conflicts.push('region')
    }
    res.json({ valid: false, conflict: conflicts })
  })

  app.route('/api/solve').post((req, res) => {
    const { puzzle } = req.body
    if (!puzzle) return res.json({ error: 'Required field missing' })
    if (puzzle.length != 81) return res.json({ error: 'Expected puzzle to be 81 characters long' })
    if (/[^0-9.]/g.test(puzzle)) return res.json({ error: 'Invalid characters in puzzle' })

    const solvedString = solve(puzzle)
    if (!solvedString) return res.json({ error: 'Puzzle cannot be solved' })
    res.json({ solution: solvedString })
  })
}
