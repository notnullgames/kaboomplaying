// TODO: generate all this from a tiled map (as a tiled plugin)

const floor = `
░░░░░░░░░░
░░░░░░░░░░
░░░░░░░░░░
░░░░░░░░░░
░░░░░░░░░░
░░░░░░░░░░
░░░░░░░░░░
░░░░░░░░░░
`

const walls = `
▛▀▀▀▀▀▀▀▀▜
▌        ▐
▌        ▐
▌        ▐
▌        ▐
▌        ▐
▌        ▐
▙▄▄▄▄▄▄▄▄▟
`

export default function level1 ({ loadSprite, sprite, solid, addLevel }) {
  loadSprite('terrain', 'terrain.png', { sliceX: 6, sliceY: 59 })

  const terrain = {
    '░': [sprite('terrain', { frame: 22 })],
    '█': [sprite('terrain', { frame: 20 }), solid()],
    '▛': [sprite('terrain', { frame: 40 }), solid()],
    '▜': [sprite('terrain', { frame: 41 }), solid()],
    '▙': [sprite('terrain', { frame: 45 }), solid()],
    '▟': [sprite('terrain', { frame: 45 }), solid()],
    '▀': [sprite('terrain', { frame: 45 }), solid()],
    '▄': [sprite('terrain', { frame: 64 }), solid()],
    '▌': [sprite('terrain', { frame: 53 }), solid()],
    '▐': [sprite('terrain', { frame: 51 }), solid()]
  }

  addLevel(floor.trim().split('\n'), { width: 32, height: 32, ...terrain })
  addLevel(walls.trim().split('\n'), { width: 32, height: 32, ...terrain })
}
