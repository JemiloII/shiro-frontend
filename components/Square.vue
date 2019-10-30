<!--suppress CssUnknownTarget -->
<template>
  <div
    :data-tile="tile"
    :data-color="color"
    :data-type="type"
    :data-position="position"
    @click="info"
  >
    {{ square }}
  </div>
</template>

<script>
export default {
  props: {
    color: {
      default: '',
      type: String
    },
    position: {
      default: '',
      type: String
    },
    tile: {
      default: '',
      type: String
    },
    type: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      characters: {
        kw: '\u2654',
        qw: '\u2655',
        rw: '\u2656',
        bw: '\u2657',
        nw: '\u2658',
        pw: '\u2659',
        kb: '\u265A',
        qb: '\u265B',
        rb: '\u265C',
        bb: '\u265D',
        nb: '\u265E',
        pb: '\u265F',
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
    }
  },
  computed: {
    square() {
      return this.type && this.color
        ? this.characters[`${this.type}${this.color}${this.tile}`]
        : this.characters[this.tile]
    }
  },
  methods: {
    info() {
      // alert(`${this.type}${this.color}${this.tile}`.replace(/undefined/g, ''))
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'Shiro';
  font-weight: normal;
  src: url('~static/shiro.otf') format('opentype'),
    url('~static/shiro.woff') format('woff'),
    url('~static/shiro.svg') format('svg');
}
div {
  font-family: Shiro;
  font-weight: normal;
}
</style>
