<template>
  <div id="gridTest">
      <grid-layout
            :layout="layout"
            :col-num="48"
            :is-draggable="false"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :horizontal-compact="true"
            :margin="[0,0]"
            :use-css-transforms="true"
            :max-rows=1
            :row-height=height
    >

        <grid-item class=item
                   @resize="resizeEvent"
                   :x="0"
                   :y="0"
                   :w="w"
                   :h="1"
                   :i="0"
                   :maxH="1"
                   :maxW="24"
                   :minW="12"
                   :ref="'item0'"
                   >
        </grid-item>
        <grid-item class=item
                   @resize="resizeEvent"
                   :x="w"
                   :y="0"
                   :w="48-w"
                   :h="1"
                   :i="0"
                   :maxH="1"
                   :ref="'item1'"
                   :is-resizable="false"
                   >

        </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'reader',
  components: {
  },
  data () {
    return {
      layout: [
          {"x":0,"y":0,"w":24,"h":1,"i":"0" },
          {"x":24,"y":0,"w":24,"h":1,"i":"1" },
      ],
      w:24,
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    }
  },
  props:[
  ],
  computed:{
  },
  mounted(){
    console.log(this.$children);
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    resizeEvent: function(i, newH, newW, newHPx, newWPx){
      this.w = newW;
    },
    handleResize(){
      this.width =  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .vue-grid-item>.vue-resizable-handle{
    background-color: black;
    width: 10px;
    cursor: ew-resize;
    height: 100%;
  }
  .vue-grid-item.vue-grid-placeholder{
    opacity:0;
  }
</style>
