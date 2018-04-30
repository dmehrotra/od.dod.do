<template>
  <div id="headControlsWrapper" :style="{ width: width+'px', height: height + 'px' }">
    <head-controls
      v-on:input="sendUp(arguments)"
    />
  </div>
</template>

<script>
import HeadControls from '@/components/content/HeadControls'
///import MainContentWrapper from '@/components/layouts/MainContentWrapper'


export default {
  name: 'Wrapper',
  components: {
    HeadControls,
   // MainContentWrapper
  },
  data () {
    return {
      data: [],
    }
  },
  props:[
    'width',
    'height'
  ],
  mounted(){
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize(){
    },
    sendUp(args){
      this.$emit('input', args[0] );
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #headControlsWrapper{
    outline: solid 3px red;
    outline-offset: -9px;
    flex-grow: 1;
  }
</style>
