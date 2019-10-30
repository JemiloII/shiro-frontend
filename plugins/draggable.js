/* eslint-disable */
import Vue from 'vue'

// eslint-disable-next-line no-unused-vars
const characters = {
  kww: '\uE040',
  qww: '\uE041',
  rww: '\uE042',
  bww: '\uE043',
  nww: '\uE044',
  pww: '\uE045',
  kbw: '\uE046',
  qbw: '\uE047',
  rbw: '\uE048',
  bbw: '\uE049',
  nbw: '\uE04A',
  pbw: '\uE04B',
  w: '\uE04C',
  kwb: '\uE050',
  qwb: '\uE051',
  rwb: '\uE052',
  bwb: '\uE053',
  nwb: '\uE054',
  pwb: '\uE055',
  kbb: '\uE056',
  qbb: '\uE057',
  rbb: '\uE058',
  bbb: '\uE059',
  nbb: '\uE05A',
  pbb: '\uE05B',
  b: '\uE05C'
}

let Store
let Draggable
if (process.client) {
  Draggable = require('@shopify/draggable').Draggable
  window.onNuxtReady(({ $store }) => {
    Store = $store
  })
}

const getDataset = (event, target = 'originalSource') => {
  const el = event.data[target]
  const { color, position, tile, type } = el.dataset
  return { color, el, position, tile, type }
}

const draggableDirective = {
  inserted(el, node) {
    console.log({el, node})
    const draggable = new Draggable(el, node.value)

    draggable.on('drag:start', (event) => {
      console.log('drag start')
      const chess = Store.getters['chess/game']
      const player = Store.getters['chess/player']

      console.log(event)
      const { color, position } = getDataset(event)
      const moves = chess.moves({square: position})

      if (chess.turn() !== player.color || chess.turn() !== color || moves.length === 0) {
        if (chess.turn() === player.color && chess.turn() === color ) {
          event.data.originalSource.style.backgroundColor = 'red'
          event.data.originalSource.style.transition = 'background 250ms'
          event.data.originalSource.style.transitionTimingFunction = 'ease-in-out'

          setTimeout(() => {
            event.data.originalSource.style.backgroundColor = 'transparent'
          }, 750)
        }

        console.log('event canceled')
        event.cancel()
      }
    })

    let dragOver;
    draggable.on('drag:over', (event) => {
      console.log(getDataset(event, 'over'))
      const chess = Store.getters['chess/game']
      const over = getDataset(event, 'over');
      const source = getDataset(event, 'source');
      const moves = chess.moves({square: source.position, verbose: true})
      const isMoveValid = moves.some(i => i.to === over.position)
      const bgColor = source.position === over.position || isMoveValid ? 'lightgreen' : 'red'

      console.log(moves)
      dragOver = over
      event.data.originalSource.style.transition = ''
      document.querySelector('.draggable-mirror').style.backgroundColor = bgColor;
    })

    draggable.on('drag:stop', (event) => {
      console.log('I STOPPED', dragOver, event)

      const chess = Store.getters['chess/game']
      const source = getDataset(event)
      const moves = chess.moves({square: source.position, verbose: true})
      const isMoveValid = moves.some(i => i.to === dragOver.position)

      if (isMoveValid) {
        Store.dispatch('chess/move', {from: source.position, to: dragOver.position})
        dragOver = undefined
      }
    })

    return draggable
  }
}

Vue.directive('draggable', draggableDirective)

export default draggableDirective
