/* global kaboom, loadSprite, sprite, pos, add, rect, text, color */

// not importing kaboom here (using global in index) due to bug in packaging

import level1 from './maps/level1'

const k = kaboom({
  width: 320,
  height: 240,
  debug: true,
  clearColor: [0, 0, 0, 1],
  crisp: true,
  global: true,
  plugins: []
})

k.loadRoot('/')

// build complete people that can be easily placed on screen
const people = {}
for (const name of ['emily', 'david', 'thedude', 'tom', 'cyborg']) {
  loadSprite(name, `people/${name}/walk.png`, {
    sliceX: 9,
    sliceY: 4,
    anims: {
      N: { from: 0, to: 7 },
      W: { from: 9, to: 16 },
      S: { from: 18, to: 25 },
      E: { from: 27, to: 34 }
    }
  })
  loadSprite(`${name}-portrait`, `people/${name}/portrait.png`)
  people[name] = [
    sprite(`${name}-portrait`),
    pos(0, 150)
  ]
}

// load map
level1(k)

add([
  sprite('emily')
])
  .play('S')

add([
  sprite('david'),
  pos(32, 0)
])
  .play('W')

add([
  sprite('thedude'),
  pos(64, 0)
])
  .play('E')

add([
  sprite('tom'),
  pos(96, 0)
])
  .play('N')

add([
  rect(225, 80),
  pos(85, 150),
  color(0, 0, 0, 0.4)
])

add([
  text('Emily\n\nHi. How\'s it going? This is a basic test of kaboom! game-engine.', 10, { width: 220 }),
  pos(90, 160),
  color(1, 1, 1, 0.6)
])

add(people.emily)
