<template>
  <div class="container chess">
    <div class="files">
      <div class="cells">&nbsp;</div>
      <div v-for="(file, index) in files" :key="index" class="cells">
        {{ file }}
      </div>
    </div>
    <div class="ranks">
      <div
        v-for="(rank, index) in ranks"
        :key="index"
        :class="{ cells: true, one: index === 7, three: index === 5 }"
      >
        {{ rank }}
      </div>
    </div>
    <div v-draggable="defaultOptions" class="board">
      <Square
        v-for="({ color, tile, type, position }, key) in board"
        :key="key"
        v-bind="{ color, position, tile, type }"
        class="cells"
      />
    </div>
  </div>
</template>

<script>
import Square from '~/components/Square'
import { files, ranks } from '~/common/board'

export default {
  components: {
    Square
  },
  data() {
    return {
      defaultOptions: {
        draggable: 'div'
      },
      files,
      ranks
    }
  },
  computed: {
    board() {
      return this.$store.getters['chess/board']
    }
  },
  mounted() {
    // noinspection JSUnresolvedVariable
    this.$store.commit('chess/create')
    // noinspection JSUnresolvedVariable
    this.chess = this.$store.getters['chess/game']
  },
  updated() {
    this.chess = this.$store.getters['chess/game']
  }
}
</script>

<style lang="scss" scoped>
.board {
  display: grid;
  grid-area: board;
  grid-template-columns: repeat(8, 62.5px);
  grid-template-rows: repeat(8, 62.5px);
  margin: -1px 0 0;
  padding: 0;
  outline: none;
}

.cells {
  display: table-cell;
  height: 62.5px;
  width: 62.5px;
  line-height: 62.5px;
  margin: 0;
  padding: 0;
  text-align: center;
  vertical-align: text-bottom;
  user-select: none;
  outline: none;
}

.cells.one {
  margin-left: 6px;
}

.cells.three {
  margin-left: -4px;
}

.chess {
  font-family: 'Shiro', monospace;
  display: grid;
  font-size: 62.5px;
  grid-template-columns: 1fr repeat(8, 62.5px);
  grid-template-rows: 1fr repeat(8, 62.5px);
  grid-template-areas:
    'files files'
    'ranks board';
  padding: 0;
  margin: 0;
  width: calc(62.5px * 9 + 1px);
  height: calc(62.5px * 9);
}

.files {
  display: grid;
  grid-area: files;
  grid-template-columns: repeat(9, 62.5px);
  margin: 5px 3px 0;
  padding: 0;
  height: 62.5px;
  width: calc(62.5px * 9);
  line-height: 62.5px;
}

.ranks {
  display: grid;
  grid-area: ranks;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  margin: 5px -5px 0;
  padding: 0;
  width: 62.5px;
  height: calc(62.5px * 8);
  line-height: 62.5px;
}

.draggable-mirror {
  opacity: 1;
  background: #41b883;
}

.draggable--over {
  background: orange;
}
</style>
