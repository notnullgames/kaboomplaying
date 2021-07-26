/* global kaboom, fetch */

// not importing kaboom here (using global in index) due to bug in packaging
import pluginTiled from 'tiled-kaboom'

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
  // load a JSON Tiled map
  const { levels, key } = await k.loadTiledMap(await fetch('map.json').then(r => r.json()))
  for (const level of levels) {
    k.addLevel(level, { width: 32, height: 32, ...key })
  }

  // build complete people that can be easily placed on screen
  const people = {}
  for (const name of ['emily', 'david', 'the_dude', 'tom', 'cyborg']) {
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

  function say (who, what) {
    const personName = who.toLowerCase().replace(/ /g, '_')
    k.add([
      k.rect(225, 80),
      k.pos(85, 155),
      k.color(0, 0, 0, 0.4)
    ])

    k.add([
      k.text(`${who}\n\n${what}`, 10, { width: 220 }),
      k.pos(90, 160),
      k.color(1, 1, 1, 0.6)
    ])

    k.add(people[personName])
  }

  k.add([
    k.sprite('david'),
    k.pos(32, 32)
  ])
    .play('S')

  k.add([
    k.sprite('emily'),
    k.pos(64, 32)
  ])
    .play('W')

  k.add([
    k.sprite('the_dude'),
    k.pos(96, 32)
  ])
    .play('E')

  k.add([
    k.sprite('tom'),
    k.pos(128, 32)
  ])
    .play('N')

  const cyborg = k.add([
    k.sprite('cyborg'),
    k.pos(164, 32)
  ])

  // turn south & stop
  await cyborg.play('S')
  cyborg.stop()

  say('David', 'Hi! This is a simple demo of Kaboom! Seems to be working.')
}

main()
