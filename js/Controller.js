import Player from './Player.js'

class Controller {
	constructor() {
		this.keys = {
			w: {
				pressed: false,
			},
			a: {
				pressed: false,
			},
			s: {
				pressed: false,
			},
			d: {
				pressed: false,
			},
		}

		this.lastKey = ''

		addEventListener('keydown', ({ key }) => {
			switch (key) {
				case 'w':
					this.keys.w.pressed = true
					this.lastKey = 'w'
					break
				case 'a':
					this.keys.a.pressed = true
					this.lastKey = 'a'
					break
				case 's':
					this.keys.s.pressed = true
					this.lastKey = 's'
					break
				case 'd':
					this.keys.d.pressed = true
					this.lastKey = 'd'
					break
			}
		})

		addEventListener('keyup', ({ key }) => {
			switch (key) {
				case 'w':
					this.keys.w.pressed = false
					break
				case 'a':
					this.keys.a.pressed = false
					break
				case 's':
					this.keys.s.pressed = false
					break
				case 'd':
					this.keys.d.pressed = false
					break
			}
		})
	}
}

export default Controller
