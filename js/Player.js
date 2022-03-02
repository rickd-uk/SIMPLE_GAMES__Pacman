import Boundary from './Boundary.js'
import Controller from './Controller.js'

class Player {
	constructor({ position, velocity }) {
		this.position = position
		this.velocity = velocity
		this.radius = 15
	}

	draw(c) {
		c.beginPath()
		c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
		c.fillStyle = 'yellow'
		c.fill()
		c.closePath()
	}

	update(c) {
		this.draw(c)
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
	}

	move({ c, controller, gameBoard }) {
		const keys = controller.keys
		const lastKey = controller.lastKey
		this.velocity.y = 0
		this.velocity.x = 0

		if (keys.w.pressed && lastKey === 'w') {
			for (let i = 0; i < gameBoard.boundaries.length; i++) {
				const boundary = gameBoard.boundaries[i]
				if (
					gameBoard.circleCollisionWithRectangle({
						circle: {
							...this,
							velocity: {
								x: 0,
								y: -5,
							},
						},
						rectangle: boundary,
					})
				) {
					this.velocity.y = 0
					break
				} else {
					this.velocity.y = -5
				}
			}
		} else if (keys.s.pressed && lastKey === 's') {
			for (let i = 0; i < gameBoard.boundaries.length; i++) {
				const boundary = gameBoard.boundaries[i]
				if (
					gameBoard.circleCollisionWithRectangle({
						circle: {
							...this,
							velocity: {
								x: 0,
								y: 5,
							},
						},
						rectangle: boundary,
					})
				) {
					this.velocity.y = 0
					break
				} else {
					this.velocity.y = 5
				}
			}
		} else if (keys.a.pressed && lastKey === 'a') {
			for (let i = 0; i < gameBoard.boundaries.length; i++) {
				const boundary = gameBoard.boundaries[i]
				if (
					gameBoard.circleCollisionWithRectangle({
						circle: {
							...this,
							velocity: {
								x: -5,
								y: 0,
							},
						},
						rectangle: boundary,
					})
				) {
					this.velocity.x = 0
					break
				} else {
					this.velocity.x = -5
				}
			}
		} else if (keys.d.pressed && lastKey === 'd') {
			for (let i = 0; i < gameBoard.boundaries.length; i++) {
				const boundary = gameBoard.boundaries[i]
				if (
					gameBoard.circleCollisionWithRectangle({
						circle: {
							...this,
							velocity: {
								x: 5,
								y: 0,
							},
						},
						rectangle: boundary,
					})
				) {
					this.velocity.x = 0
					break
				} else {
					this.velocity.x = 5
				}
			}
		}
	}
	stop() {
		this.velocity.x = 0
		this.velocity.y = 0
	}
}

export default Player
