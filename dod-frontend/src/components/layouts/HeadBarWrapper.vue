<template>
  <div id="headBarWrapper" :style="{ width: width+'px', height: headBarHeight + 'px' }">
    <head-line-wrapper
      :width="width"
      :height="headBarHeight"
    />
    <head-controls-wrapper
      :width="width"
      :height="headBarHeight"
      v-on:input="sendUp(arguments)"
    />
  </div>
</template>

<script>
import HeadLineWrapper from '@/components/layouts/HeadLineWrapper'
import HeadControlsWrapper from '@/components/layouts/HeadControlsWrapper'


export default {
  name: 'HeadBarWrapper',
  components: {
    HeadLineWrapper,
    HeadControlsWrapper
  },
  data () {
    return {
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
    },
    sendUp(args){
      this.$emit('input', args[0] );
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
