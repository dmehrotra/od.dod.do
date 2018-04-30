<template>
  <div id="mainContentWrapper" :style="{ width: width+'px', height: height + 'px' }" @click="toggleSelection">
    <main-left-wrapper
      :height="height"
      :width="widthLeft"
    />
    <main-right-wrapper
      :height="height"
      :width="widthRight"
      :graphData="graphData"
    />
  </div>
</template>

<script>
import MainRightWrapper from '@/components/layouts/MainRightWrapper'
import MainLeftWrapper from '@/components/layouts/MainLeftWrapper'
///import MainContentWrapper from '@/components/layouts/MainContentWrapper'
import {mapActions} from 'vuex';
import {TweenMax} from "gsap";

export default {
  name: 'MainContentWrapper',
  components: {
    MainRightWrapper,
    MainLeftWrapper
    //MainContentWrapper
  },
  data () {
    return {
      data: [],
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      windowHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
      windowSplit: 0.0,
      unwatchStoreForSelection: undefined,
    }
  },
  props:[
    'headBarHeight',
    'graphData'

  ],
  computed: {
    height: function(){
      return this.windowHeight - this.headBarHeight;
    },
    widthRight: function(){
      return (1.0-this.windowSplit)*this.width;
    },
    widthLeft: function(){
      return this.windowSplit*this.width;
    }
  },
  mounted(){
		this.unwatchStoreForSelection = this.$store.watch(this.$store.getters.currentSelectionWatcher, selection => {
      if(selection.length > 0){
        TweenLite.to(this.$data, 1.0, { windowSplit: 0.5 });
      }else{
         TweenLite.to(this.$data, 1.0, { windowSplit: 0.0 });
      }
    });
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions([
      'toggleSelection'
    ]),
    handleResize(){
      this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      this.windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #mainContentWrapper{
    outline: solid 3px green;
    outline-offset: -6px;
    display: flex;
    flex-direction: row;
  }
</style>
