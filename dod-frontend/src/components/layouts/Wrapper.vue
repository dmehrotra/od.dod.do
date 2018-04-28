<template>
  <div id="wrapper" :style="{ width: width+'px', height: height + 'px' }">
    <head-bar-wrapper
      :headBarHeight="headBarHeight"
      />
    <main-content-wrapper
      :headBarHeight="headBarHeight"
      />
  </div>
</template>

<script>
import HeadBarWrapper from '@/components/layouts/HeadBarWrapper'
import MainContentWrapper from '@/components/layouts/MainContentWrapper'


export default {
  name: 'Wrapper',
  components: {
    HeadBarWrapper,
    MainContentWrapper
  },
  data () {
    return {
      data: [],
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
      headBarHeight: 80,
    }
  },
  mounted(){
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize(){
      this.width =  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #wrapper{
    outline: solid 3px black;
    outline-offset: -3px;
    display: flex;
    flex-direction: column;
  }
</style>
