<template>
  <div ref="pane" id="pane">
        <resize-observer @notify="paneResized" />

    <div class='item' v-for='(node, i) in nodes'
                  :style="{minWidth: minPaneItemWidth + 'px', height: paneItemHeight+'px'}">
      {{i}}
    </div>
    <div class='item extra' v-for='(node, i) in extras'
                  :style="{minWidth: minPaneItemWidth + 'px', height: paneItemHeight+'px'}">
      {{i}}
    </div>
  </div>
  <!--
  <transition-group name='list' tag="div" id="pane" :style="{height:height+'px'}">

    <pane-node v-for="(node, i) in nodes" 
      :data=node
      :toggleSelect=toggleSelect
      :deleteProject=deleteProject
      :index="i"
      :key=i
      :id="'pane-node-'+node.id"
    >
    </pane-node>
  
  </transition-group>
  -->
</template>

<script>

import {mapGetters, mapActions} from 'vuex';
//import PaneNode from '@/components/PaneNode'
import { ResizeObserver } from 'vue-resize'
export default {
  name: 'pane',
  components: {
    //PaneNode
    ResizeObserver,
  },
  data () {
    return {
      minWidth: 100, 
      extras: 0,
    }
  },
  props:[
    'nodes',
  ],
  computed:{
    ...mapGetters([
      'minPaneItemWidth', 
      'paneItemHeight', 
    ]),
  },
  mounted(){
    this.calculateExtras(this.$el.offsetWidth);

  },
  beforeDestroy: function () {
  },
  methods: {
    paneResized: function(e){
      this.calculateExtras();
    },
    calculateExtras: function(){
      let w = this.$el.offsetWidth;
      let perRow = Math.floor(w/this.minPaneItemWidth);
      let e = this.nodes.length % perRow;
      this.extras = e==0?0:perRow-e;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #pane{
    width:100%;
    overflow: scroll;
    display: flex;
    flex-flow: row wrap;
    justify-content:center;
    position:relative;
  }
  .item{
    flex-grow:1;
    outline: black dotted 1px;
    outline-offset: -1px;
  }
  .extra{
    background-color:red;
    opacity:0.1;
  }

</style>
