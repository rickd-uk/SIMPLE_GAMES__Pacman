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

	static set(c) {
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
		player.draw(c)
	}

	move(c, { controller }) {
		const keys = controller.keys
		const lastKey = controller.lastKey
		this.velocity.y = 0
		this.velocity.x = 0

		if (keys.w.pressed && lastKey === 'w') {
			this.velocity.y = -5
		} else if (keys.s.pressed && lastKey === 's') {
			this.velocity.y = 5
		} else if (keys.a.pressed && lastKey === 'a') {
			this.velocity.x = -5
		} else if (keys.d.pressed && lastKey === 'd') {
			this.velocity.x = 5
		}
		this.update(c)
	}
}

export default Player
