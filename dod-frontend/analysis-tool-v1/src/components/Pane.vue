<template>
  <div ref="pane" id="paneWrapper">
     <!--<div id="pane">-->
    <resize-observer @notify="paneResized" key="'observer'" />
    <transition-group name="nodeList" tag="div" id='pane'>
      <div v-for='(node, i) in (nodesWithExtrasReversed)'
        :style="{minWidth: minPaneItemWidth + 'px', height: paneItemHeight+'px'}"
        :class="{item: true, extra: node.type=='extra'}"
        :key="node.id"
      >
        <div class='insideItem'
          :style="{width: minPaneItemWidth + 'px', height: paneItemHeight+'px'}"
          >
        {{node.id}}
        </div>
      </div>
      <div v-for='(node, i) in (extras)'
        :style="{minWidth: minPaneItemWidth + 'px', height: paneItemHeight+'px'}"
        :class="{item: true, extra: node.type=='extra'}"
        :key="node.id"
      >
        <div class='insideItem'
          :style="{width: minPaneItemWidth + 'px', height: paneItemHeight+'px'}"
          >
        {{node.id}}
        </div>
      </div>
    </transition-group>
    <a @click="addNode">add</a>
    <a @click="removeNode">remove</a>
      <!--</div>-->
<!--
      <div class='item extra' v-for='(node, i) in extras'
          :style="{minWidth: minPaneItemWidth + 'px', height: paneItemHeight+'px'}"
          :key=nodes.length+i
      >
        {{i}}
      </div>
-->

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
      extras: [{'id': Math.random(), 'type': 'extra'}],
      //nodes: [{'id': Math.random(), 'type': 'node'}]
      unwatchActiveTab: undefined,
    }
  },
  props:[
    'nodes',
    
  ],
  computed:{
    ...mapGetters([
      'minPaneItemWidth', 
      'paneItemHeight', 
      'activeTab',
    ]),
    nodesOfActiveTab: function(){
      if(this.activeTab.type == 'all'){
        return this.nodes;
      }else{
        return this.nodes.filter(node=>node.requestSource.find(rs=>(rs.type==this.activeTab.type&&rs.value==this.activeTab.value)));
      }
    },
    nodesWithExtrasReversed:function(){
      //return this.;
      //return this.nodes;
      //return this.extras.concat(this.nodes).reverse();
      // never seen before, but from here: https://stackoverflow.com/a/9650855
      
      return this.nodesOfActiveTab

    }
  },
  mounted(){
    this.calculateExtras();
    this.unwatchActiveTab = this.$store.watch(this.$store.getters.activeTabWatcher, _ => {
      console.log('atcive tab changed', _);
      this.calculateExtras();
    });
  },
  beforeDestroy: function () {
    this.unwatchActiveTab();
  },
  methods: {
    paneResized: function(e){
      this.calculateExtras();
    },
    calculateExtras: function(){
      this.extras.push({'id': Math.random(), 'type':'extra' });
      return;
      let debug = true;
      let w = this.$el.offsetWidth;
      if(debug) console.log('w', w);
      let perRow = Math.floor(w/this.minPaneItemWidth);
      if(debug) console.log('perRow', perRow);
      let e = this.nodesOfActiveTab.length % perRow;
      if(debug) console.log('e', e);
      this.extras = [];
      let extrasNeeded = e==0?0:perRow-e;
      if(debug) console.log('extarsNeeded', extrasNeeded);
      for(let i = 0; i < extrasNeeded; i++){
        this.extras.push({'id': Math.random(), 'type':'extra' });
      }
      //this.extras = e==0?0:perRow-e;
      if(debug) console.log('extras', this.extras);
    },
    randomIndex: function () {
      return Math.floor(Math.random() * this.nodes.length)
    },
    add: function () {
      this.nodes.splice(this.randomIndex(), 0, {'id': Math.random(), 'type': 'node'})
    },
    remove: function () {
      this.nodes.splice(this.randomIndex(), 1)
    },
    removeNode: function(){
      this.remove();
      this.calculateExtras();
    },
    addNode: function(){
      //this.nodes.push({'id': Math.random(), 'type': 'node'});
      this.add();
      this.calculateExtras();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #paneWrapper{
    position:relative;
  }
  #pane{
    width:100%;
    height:1000px;
    overflow: scroll;
    display: flex;
    flex-flow: row wrap;
    justify-content:center;
    align-content: flex-start;
    position:relative;
  }
  .item{
    flex-grow:1;
    outline: black dotted 1px;
    outline-offset: -1px;
    transition: transform 1s;
    background-color:white;
  }
  .insideItem{
    margin:auto;
    outline: red dotted 1px;
    overflow: hidden;
  }
  .extra{
    background-color:red;
    opacity:1;
    visibility:hidden;
  }
  .nodeList-leave-active {
    transition: all 1s;
    position: absolute;
  }
  .nodeList-enter-active {
    transition: all 1s;
    z-index:-1;
  }
  .nodeList-enter /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-200px);
  }
  .nodeList-leave-to {
    opacity: 0;
    transform: translateY(+200px);
  }
  .nodeList-move {
    transition: transform 1s;
  }

</style>
