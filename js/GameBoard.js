import Boundary from './Boundary.js'
import Pellet from './Pellet.js'

class GameBoard {
	static PARENT_DIR = './images/boardPieces'
	static BOARD_START_POS_X = 100
	static BOARD_START_POS_Y = 50

	constructor(pellets) {
		// this.map = [
		// 	['┌', '-', '-', '-', '-', '-', '┐'],
		// 	['|', ' ', ' ', ' ', ' ', ' ', '|'],
		// 	['|', ' ', '▀', ' ', '▀', ' ', '|'],
		// 	['|', ' ', ' ', ' ', ' ', ' ', '|'],
		// 	['|', ' ', '▀', ' ', '▀', ' ', '|'],
		// 	['|', ' ', ' ', ' ', ' ', ' ', '|'],
		// 	['└', '-', '-', '-', '-', '-', '┘'],
		// ]
		this.map = [
			['┌', '-', '-', '-', '-', '-', '-', '-', '-', '-', '┐'],
			['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
			['|', '.', '▀', '.', '[', '7', ']', '.', '▀', '.', '|'],
			['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
			['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
			['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
			['|', '.', '▀', '.', '[', '+', ']', '.', '▀', '.', '|'],
			['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
			['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
			['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
			['|', '.', '▀', '.', '[', '~', ']', '.', '▀', '.', '|'],
			['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
			['└', '-', '-', '-', '-', '-', '-', '-', '-', '-', '┘'],
		]
		this.boundaries = []

		this.map.forEach((row, i) => {
			row.forEach((symbol, j) => {
				switch (symbol) {
					case '-':
						this.addPiece(`${GameBoard.PARENT_DIR}/pipeHorizontal.png`, i, j)
						break
					case '|':
						this.addPiece(`${GameBoard.PARENT_DIR}/pipeVertical.png`, i, j)
						break
					case '┌':
						this.addPiece(`${GameBoard.PARENT_DIR}/pipeCorner1.png`, i, j)
						break
					case '┐':
						this.addPiece(`${GameBoard.PARENT_DIR}/pipeCorner2.png`, i, j)
						break
					case '┘':
						this.addPiece(`${GameBoard.PARENT_DIR}/pipeCorner3.png`, i, j)
						break
					case '└':
						this.addPiece(`${GameBoard.PARENT_DIR}/pipeCorner4.png`, i, j)
						break
					case '▀':
						this.addPiece(`${GameBoard.PARENT_DIR}/block.png`, i, j)
						break

					case '[':
						this.addPiece(`${GameBoard.PARENT_DIR}/capLeft.png`, i, j)
						break

					case ']':
						this.addPiece(`${GameBoard.PARENT_DIR}/capRight.png`, i, j)
						break
					case '_':
						this.addPiece(`${GameBoard.PARENT_DIR}/capBottom.png`, i, j)
						break
					case '^':
						this.addPiece(`${GameBoard.PARENT_DIR}/capTop.png`, i, j)
						break

					case '+':
						this.addPiece(`${GameBoard.PARENT_DIR}/pipeCross.png`, i, j)
						break

					case '~':
						this.addPiece(`${GameBoard.PARENT_DIR}/pipeConnectorTop.png`, i, j)
						break

					case '6':
						this.addPiece(`${GameBoard.PARENT_DIR}/pipeConnectorRight.png`, i, j)
						break
					case '7':
						this.addPiece(`${GameBoard.PARENT_DIR}/pipeConnectorBottom.png`, i, j)
						break
					case '8':
						this.addPiece(`${GameBoard.PARENT_DIR}/pipeConnectorLeft.png`, i, j)
						break
					case '.':
						this.addPellet(pellets, i, j)
						break
				}
			})
		})
	}

	addPellet(pellets, i, j) {
		pellets.push(
			new Pellet({
				position: {
					x: j * Boundary.width + GameBoard.BOARD_START_POS_X + Boundary.width / 2,
					y: i * Boundary.height + GameBoard.BOARD_START_POS_Y + Boundary.height / 2,
				},
			}),
		)
	}

	addPiece(src, i, j) {
		this.boundaries.push(
			new Boundary({
				image: this.createImage(src),
				position: {
					x: j * Boundary.width + GameBoard.BOARD_START_POS_X,
					y: i * Boundary.height + GameBoard.BOARD_START_POS_Y,
				},
			}),
		)
	}

	createImage(src) {
		this.image = new Image()
		this.image.src = src
		return this.image
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
