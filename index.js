import GameBoard from './js/GameBoard.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gameBoard = new GameBoard(c)
gameBoard
