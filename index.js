import GameBoard from './js/GameBoard.js'
import Boundary from './js/Boundary.js'
import Player from './js/Player.js'
import Controller from './js/Controller.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gameBoard = new GameBoard(c)
const player = new Player({
	position: {
		x: Boundary.width + Boundary.width / 2,
		y: Boundary.height + Boundary.height / 2,
	},
	velocity: {
		x: 0,
		y: 0,
	},
})
const controller = new Controller(player)

function animate() {
	requestAnimationFrame(animate)
	c.clearRect(0, 0, canvas.width, canvas.height)
	gameBoard.draw(c)
	player.move(c, { controller })
}

animate()
