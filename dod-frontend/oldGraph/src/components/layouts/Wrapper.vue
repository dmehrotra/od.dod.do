<template>
  <div id="wrapper" :style="{ width: width+'px', height: height + 'px' }">

    <head-bar-wrapper :headBarHeight="headBarHeight" :width="width">

      <head-bar-half-wrapper :width="width" :height="headBarHeight">
        <p>>>>> dod contracts</p>
      </head-bar-half-wrapper>

      <head-bar-half-wrapper :width="width" :height="headBarHeight">
        <head-controls
          v-on:input="gotData(arguments)"
        />
      </head-bar-half-wrapper>

    </head-bar-wrapper>

    <main-content-wrapper :width="width" :height="height-headBarHeight">

      <main-half-wrapper :height="height - headBarHeight" :width="windowSplit*width" id="leftWrapper">

        <main-left-half-wrapper :height="(height-headBarHeight)*0.5" :width="windowSplit*width">
          <selection :height="(height-headBarHeight)*0.5" :width="windowSplit*width">
          </selection> 
         
        </main-left-half-wrapper>

        <main-left-half-wrapper :height="(height-headBarHeight)*0.5" :width="windowSplit*width">

        </main-left-half-wrapper>

      </main-half-wrapper>

      <main-half-wrapper :height="height - headBarHeight" :width="(1.0-windowSplit)*width" id="rightWrapper">
        <viz id="viz"
          :width="(1.0-windowSplit)*width"
          :height="height - headBarHeight"
          :graphData="graphData"
        />
        <deep-selection id="deepSelection" v-show="deepSelection != undefined"
          :width="(1.0-windowSplit)*width"
          :height="height - headBarHeight"
        />
      </main-half-wrapper>

    </main-content-wrapper>

  </div>
</template>

<script>
import HeadBarWrapper from '@/components/layouts/HeadBarWrapper'
import HeadBarHalfWrapper from '@/components/layouts/HeadBarHalfWrapper'
import MainContentWrapper from '@/components/layouts/MainContentWrapper'
import MainHalfWrapper from '@/components/layouts/MainHalfWrapper'
import MainLeftHalfWrapper from '@/components/layouts/MainLeftHalfWrapper'
// contents:
import HeadControls from '@/components/content/HeadControls'
import Viz from '@/components/content/Viz'
import DeepSelection from '@/components/content/DeepSelection'
import Selection from '@/components/content/Selection'

import {mapGetters} from 'vuex';
import {TweenMax} from "gsap";

export default {
  name: 'Wrapper',
  components: {
    HeadBarWrapper,
    HeadBarHalfWrapper,
    MainContentWrapper,
    MainHalfWrapper,
    MainLeftHalfWrapper,

    HeadControls,
    Viz,
    DeepSelection,
    Selection,
  },
  data () {
    return {
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
      headBarHeight: 80,
      graphData: [],
      windowSplit: 0.0,
      unwatchStoreForSelection: undefined,
    }
  },
	computed: {
    ...mapGetters([
      'deepSelection'
    ]),
  },
  mounted(){
		this.unwatchStoreForSelection = this.$store.watch(this.$store.getters.currentSelectionWatcher, selection => {
      if(selection.length > 0){
        TweenLite.to(this.$data, 0.4, { windowSplit: 0.5 });
      }else{
         TweenLite.to(this.$data, 0.4, { windowSplit: 0.0 });
      }
    });
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    this.unwatchStoreForSelection();
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize(){
      this.width =  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    },
    gotData(args){
      console.log("gotgot", args);
      let data = args[0];

      console.log("WRAPPER got data!", data);
      if(data.type == "graphData"){
        this.graphData = data.data;
      
      }
      

    
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #wrapper{
    /*
    outline: solid 3px black;
    outline-offset: -3px;
    */
    display: flex;
    flex-direction: column;
  }
  #leftWrapper{
    display:flex;
    flex-direction: column;
  }
  #rightWrapper{
    position:relative;
  }
  #viz{
    position:absolute;
  }
  #deepSelection{
    position:absolute;
  }
</style>
