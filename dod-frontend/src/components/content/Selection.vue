<template>
  <div id="selection" :style="{height: height + 'px'}">
    <div id='headline' v-if="selection.length>0" :style="{height: titleHeight + 'px'}">
      <p><b>Selected Nodes:</b></p>
    </div>
    <transition-group name="slide" tag="div" id="selectionContainer" :style="{height: (height-titleHeight) + 'px'}">
        <selection-item  class="slide-item" ref="selections" v-for="(node, i) in selection"
          :data=node
          :width=width
          :height=70 
          :key=node.selected.name
        />

      </transition-group>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import SelectionItem from '@/components/content/SelectionItem'
let VueScrollTo = require('vue-scrollto');

export default {
  name: 'Selection',
  components: {
    SelectionItem,
  },
  data () {
    return {
      titleHeight: 40,
      unwatchStoreForSelection: undefined,
      len: 0,
    }
  },
	computed: {
    ...mapGetters([
      'selection'
    ]),
  },
  props: [
    'height',
    'width',
  ],
  mounted(){
		this.unwatchStoreForSelection = this.$store.watch(this.$store.getters.currentSelectionWatcher, selection => {
      console.log(selection.length > this.len);
      var options = {
        container: '#selectionContainer',
        easing: 'ease-in',
        //offset: -10,
        cancelable: true,
        x: false,
        y: true
    }
      console.log(this.$refs.selections);
      if(selection.length > this.len){
        var cancelScroll = VueScrollTo.scrollTo(this.$refs.selections[this.$refs.selections.length-1], 200, options)
      }


      this.len = selection.length;
    })
  },
  beforeDestroy: function () {
    this.unwatchStoreForSelection();
  },
  beforeDestroy: function () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #selection{
    
    outline: 2px solid black;
    outline-offset: -2px;
    /**/
  }
  #headline p{
    margin:0;
    margin-left:20px;
    line-height: 3;
  }
  #selectionContainer{
    overflow: scroll;
  }
  .slide-item{
    transition: all 0.2s;
    position: inline-block;
    height: 70px;
  }
  .slide-enter-active{
    transition-delay: 0.3s;
  }
  .slide-enter {
    transform: translate(-100%, 0);
  }
  .slide-leave-active {
    animation: leave 0.5s;
  }
  @keyframes leave {
    0% {
      transform: translateX(0%);
    }
    30% {
      transform: translateX(-100%);
      height: 70px;
    }
    60% {
      transform: translateX(-100%);
      height: 70px;
    }
    100% {
      transform: translateX(-100%);
      height: 0px;
    }
  }


</style>
