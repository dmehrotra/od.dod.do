<template>
  <div id="headBarWrapper" :style="{ width: width+'px', height: headBarHeight + 'px' }">
    <head-line-wrapper/>
    <head-line-wrapper/>
  </div>
</template>

<script>
import HeadLineWrapper from '@/components/layouts/HeadLineWrapper'
import HeadControlsWrapper from '@/components/layouts/HeadControlsWrapper'


export default {
  name: 'Wrapper',
  components: {
    HeadLineWrapper,
    HeadControlsWrapper
  },
  data () {
    return {
      data: [],
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    }
  },
  props:[
    'headBarHeight'
  ],
  mounted(){
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize(){
      this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #headBarWrapper{
    outline: solid 3px green;
    outline-offset: -6px;
    display: flex;
    flex-direction: row;
  }
</style>
