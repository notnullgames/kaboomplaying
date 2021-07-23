function terrainMap ({ loadSprite, sprite, solid }) {
  loadSprite('terrain', 'terrain.png', { sliceX: 6, sliceY: 59 })
  return {
    '░': [
      sprite('terrain', { frame: 22 })
    ],
    '█': [
      sprite('terrain', { frame: 20 }),
      solid()
    ],
    '▛': [
      sprite('terrain', { frame: 40 }),
      solid()
    ],
    '▜': [
      sprite('terrain', { frame: 41 }),
      solid()
    ],
    '▙': [
      sprite('terrain', { frame: 45 }),
      solid()
    ],
    '▟': [
      sprite('terrain', { frame: 45 }),
      solid()
    ],
    '▀': [
      sprite('terrain', { frame: 45 }),
      solid()
    ],
    '▄': [
      sprite('terrain', { frame: 64 }),
      solid()
    ],
    '▌': [
      sprite('terrain', { frame: 53 }),
      solid()
    ],
    '▐': [
      sprite('terrain', { frame: 51 }),
      solid()
    ]
  }
}

export default terrainMap
