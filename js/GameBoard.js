import Boundary from './Boundary.js'

class GameBoard {
	constructor(c) {
		this.map = [
			['-', '-', '-', '-', '-', '-', '-'],
			['-', ' ', ' ', ' ', ' ', ' ', '-'],
			['-', ' ', '-', ' ', '-', ' ', '-'],
			['-', ' ', ' ', ' ', ' ', ' ', '-'],
			['-', ' ', '-', ' ', '-', ' ', '-'],
			['-', ' ', ' ', ' ', ' ', ' ', '-'],
			['-', '-', '-', '-', '-', '-', '-'],
		]
		this.boundaries = []
		this.map.forEach((row, i) => {
			row.forEach((symbol, j) => {
				switch (symbol) {
					case '-':
						this.boundaries.push(
							new Boundary({
								position: {
									x: j * Boundary.width,
									y: i * Boundary.height,
								},
							}),
						)
						break
				}
			})
		})
	}

	circleCollisionWithRectangle({ circle, rectangle }) {
		return (
			circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
			circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
			circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
			circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
		)
	}

	checkCollision(c, player) {
		this.boundaries.forEach((boundary) => {
			boundary.draw(c)
			if (this.circleCollisionWithRectangle({ circle: player, rectangle: boundary })) {
				player.velocity.x = 0
				player.velocity.y = 0
			}
		})
	}
}

export default GameBoard
