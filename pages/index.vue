<template>
  <section class="section">
    <div class="field">
      <b-switch
        v-model="color"
        true-value="white"
        false-value="black"
        @input="setPlayer"
      >
        {{ color }}
      </b-switch>
    </div>
    <Board />
  </section>
</template>

<script>
import Board from '~/components/Board'

export default {
  components: {
    Board
  },
  data() {
    return {
      color: ''
    }
  },
  created() {
    this.color = 'white'
    this.$store.commit('chess/color', 'w')
  },
  methods: {
    setPlayer() {
      this.$store.commit('chess/color', this.color[0])
    }
  }
}
</script>
