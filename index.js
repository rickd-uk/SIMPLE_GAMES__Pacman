import GameBoard from './js/GameBoard.js'
import Boundary from './js/Boundary.js'
import Player from './js/Player.js'
import Controller from './js/Controller.js'

const scoreEl = document.querySelector('#scoreEl')
let score = 0

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const pellets = []

const gameBoard = new GameBoard(pellets)

const player = new Player({
	position: {
		x: Boundary.width + Boundary.width / 2 + GameBoard.BOARD_START_POS_X,
		y: Boundary.height + Boundary.height / 2 + GameBoard.BOARD_START_POS_Y,
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

	for (let i = pellets.length - 1; 0 < i; i--) {
		const pellet = pellets[i]
		pellet.draw(c)

		if (Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y) < pellet.radius + player.radius) {
			pellets.splice(i, 1)
			score += 10
			scoreEl.innerHTML = score
		}
	}

	player.move({ c, controller, gameBoard })

	gameBoard.boundaries.forEach((boundary) => {
		boundary.draw(c)
		gameBoard.checkCollision(c, player)
	})
	// gameBoard.draw(c, player)
	player.update(c)
}

animate()
