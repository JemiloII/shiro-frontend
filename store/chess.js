import * as Chess from 'chess.js'
import board from '../common/board'

export const state = () => ({
  game: {},
  player: {},
  board: []
})

export const mutations = {
  color(state, color) {
    state.player.color = color
  },
  create(state) {
    state.game = new Chess()
    state.board = board(state.game)
  },
  move(state, move) {
    state.game.move(move)
    state.board = board(state.game)
  }
}

export const actions = {
  color({ commit }, color) {
    commit('color', color)
  },
  create({ commit }, pgn) {
    commit('create', pgn)
  },
  move({ commit, state }, move) {
    commit('move', move)
  }
}

export const getters = {
  board(state) {
    return state.board
  },
  game(state) {
    return state.game
  },
  player(state) {
    return state.player
  }
}
