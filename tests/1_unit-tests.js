const chai = require('chai')
const assert = chai.assert

const {
  solve,
  checkRegionPlacement,
  checkColPlacement,
  checkRowPlacement,
} = require('../controllers/sudoku-solver.js')

let validPuzzle =
  '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
suite('UnitTests', () => {
  suite('solver tests', function () {
    test('Logic handles a valid puzzle string of 81 characters', function (done) {
      let complete =
        '769235418851496372432178956174569283395842761628713549283657194516924837947381625'
      assert.equal(solve(validPuzzle), complete)
      done()
    })

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function (done) {
      let inValidPuzzle =
        '..9..5.1.85.4....2432...g..1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
      assert.equal(solve(inValidPuzzle), false)
      done()
    })

    test('Logic handles a puzzle string that is not 81 characters in length', function (done) {
      let inValidPuzzle =
        '..9..5.1.85.4....2432.........1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
      assert.equal(solve(inValidPuzzle), false)
      done()
    })

    test('Logic handles a valid row placement', function (done) {
      assert.equal(checkRowPlacement(validPuzzle, 'A', '2', '6'), true)
      done()
    })

    test('Logic handles an invalid row placement', function (done) {
      assert.equal(checkRowPlacement(validPuzzle, 'A', '2', '9'), false)
      done()
    })

    test('Logic handles a valid column placement', function (done) {
      assert.equal(checkColPlacement(validPuzzle, 'A', '2', '6'), true)
      done()
    })

    test('Logic handles an invalid column placement', function (done) {
      assert.equal(checkColPlacement(validPuzzle, 'A', '2', '9'), false)
      done()
    })

    test('Logic handles a valid region (3x3 grid) placement', function (done) {
      assert.equal(checkRegionPlacement(validPuzzle, 'A', '2', '6'), true)
      done()
    })

    test('Logic handles an invalid region (3x3 grid) placement', function (done) {
      assert.equal(checkRegionPlacement(validPuzzle, 'A', '2', '9'), false)
      done()
    })
    test('Valid puzzle strings pass the solver', function (done) {
      assert.equal(
        solve(validPuzzle),
        '769235418851496372432178956174569283395842761628713549283657194516924837947381625'
      )
      done()
    })
    test('Invalid puzzle strings fail the solver', function (done) {
      let inValidPuzzle =
        '115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      assert.equal(solve(inValidPuzzle), false)
      done()
    })
    test('Solver returns the the expected solution for an incomplete puzzzle', function (done) {
      assert.equal(
        solve('..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'),
        '218396745753284196496157832531672984649831257827549613962415378185763429374928561'
      )
      done()
    })
  })
})
