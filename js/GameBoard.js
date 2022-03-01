import Boundary from './Boundary.js'

class GameBoard {
	constructor(c) {
		this.map = [
			['-', '-', '-', '-', '-', '-'],
			['-', ' ', ' ', ' ', ' ', '-'],
			['-', ' ', '-', '-', ' ', '-'],
			['-', ' ', ' ', ' ', ' ', '-'],
			['-', '-', '-', '-', '-', '-'],
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
		this.boundaries.forEach((boundary) => {
			boundary.draw(c)
		})
	}
}

export default GameBoard
