<template>
  <div id="mainContentWrapper">
    <first-throw-requester v-if="firstThrow==undefined" 
       :width="width"
       :height="height"
    ></first-throw-requester>
     
    <first-throw-display v-if="firstThrow" 
       :width="width/2"
       :height="height"
    ></first-throw-display>
  </div>
</template>

<script>
import FirstThrowRequester from '@/components/FirstThrowRequester'
import FirstThrowDisplay from '@/components/FirstThrowDisplay'
//import Viz from '@/components/Viz'

import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'mainContent',
  components: {
    FirstThrowRequester,
    FirstThrowDisplay
  },
  data () {
    return {
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    }
  },
  computed:{
    ...mapGetters([
      'firstThrow'
    ]),
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
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mainContentWrapper{
  width:100%;
  height:100%;
}
</style>
