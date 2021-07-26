/* global kaboom, fetch */

// not importing kaboom here (using global in index) due to bug in packaging
import pluginTiled from 'https://raw.githack.com/notnullgames/tiled-kaboom/main/kaboom-tiled.js'

const k = kaboom({
  width: 320,
  height: 240,
  debug: true,
  clearColor: [0, 0, 0, 1],
  crisp: true,
  plugins: [pluginTiled]
})

k.loadRoot('/')

const main = async () => {
  const { levels, key } = await k.loadTiledMap(await fetch('map.json').then(r => r.json()))
  for (const level of levels) {
    k.addLevel(level, { width: 32, height: 32, ...key })
  }

  // build complete people that can be easily placed on screen
  const people = {}
  for (const name of ['emily', 'david', 'thedude', 'tom', 'cyborg']) {
    await k.loadSprite(name, `people/${name}/walk.png`, {
      sliceX: 9,
      sliceY: 4,
      anims: {
        N: { from: 0, to: 7 },
        W: { from: 9, to: 16 },
        S: { from: 18, to: 25 },
        E: { from: 27, to: 34 }
      }
    })
    await k.loadSprite(`${name}-portrait`, `people/${name}/portrait.png`)
    people[name] = [
      k.sprite(`${name}-portrait`),
      k.pos(0, 150)
    ]
  }

  k.add([
    k.sprite('emily'),
    k.pos(32, 32)
  ])
    .play('S')

  k.add([
    k.sprite('david'),
    k.pos(64, 32)
  ])
    .play('W')

  k.add([
    k.sprite('thedude'),
    k.pos(96, 32)
  ])
    .play('E')

  k.add([
    k.sprite('tom'),
    k.pos(128, 32)
  ])
    .play('N')

  k.add([
    k.rect(225, 80),
    k.pos(85, 150),
    k.color(0, 0, 0, 0.4)
  ])

  k.add([
    k.text('Emily\n\nHi. How\'s it going? This is a basic test of kaboom! game-engine.', 10, { width: 220 }),
    k.pos(90, 160),
    k.color(1, 1, 1, 0.6)
  ])

  k.add(people.emily)
}

main()
