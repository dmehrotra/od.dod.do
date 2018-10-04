<template>
  <div ref="pane" id="paneWrapper">
     <!--<div id="pane">-->
    <resize-observer @notify="paneResized" key="'observer'" />
    <transition-group name="nodeList" tag="div" id='pane'
        :style="{
            minHeight: windowDims.height-heightAllButPane-105 +'px',
            gridTemplateColumns: 'repeat(auto-fill, minmax('+minPaneItemWidth+'px, 1fr))',
            gridTemplateRows: 'repeat(auto-fill, minmax('+paneItemHeight+'px, 1fr))',
            gridGap: 10+'px',
            gridRowGap: 8+'px',
           }" 
      >
      <div v-for='(node, i) in (nodesBytTabAndDate)'
        :style="{minWidth: minPaneItemWidth + 'px', height: paneItemHeight+'px'}"
        :class="{item: true, extra: node.type=='extra'}"
        :key="node.id"
      >
        <div 
          :class='{insideItem: true, focused: focusedNode.includes(node.id)}'
          :style="{width: minPaneItemWidth + 'px', height: paneItemHeight+'px'}"
          >
          <pane-node
            :data=node
            :deleteNode='()=>deleteNode(node.id)'
            :toggleGraphSelect='()=>setNodeSelect(node.id, !node.selected)'
            >
          </pane-node>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex';
import PaneNode from '@/components/PaneNode'
import { ResizeObserver } from 'vue-resize'
export default {
  name: 'pane',
  components: {
    PaneNode,
    ResizeObserver,
  },
  data () {
    return {
      minWidth: 100, 
      extraWidth: 30,
      //nodes: [{'id': Math.random(), 'type': 'node'}]
      unwatchActiveTab: undefined,
    }
  },
  props:[
    'nodes',
    'deleteNode',
    'setNodeSelect',
  ],
  computed:{
    ...mapGetters([
      'minPaneItemWidth', 
      'paneItemHeight', 
      'activeTab',
      'heightAllButPane',
      'windowDims',
      'focusedNode',
    ]),
    nodesOfActiveTab: function(){
      if(this.activeTab.type == 'all'){
        return this.nodes;
      }else{
        return this.nodes.filter(node=>node.requestSource.find(rs=>(rs.type==this.activeTab.type&&rs.value==this.activeTab.value)));
      }
    },
    nodesBytTabAndDate:function(){
      return this.nodesOfActiveTab.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.filing_date) - new Date(a.filing_date);
      });
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
      this.extraWidth = Math.random();
      return;
      //this.extras.push({'id': Math.random(), 'type':'extra' });
      let debug = true;
      let w = this.$el.offsetWidth;
      if(debug) console.log('w', w);
      let perRow = Math.floor(w/this.minPaneItemWidth);
      if(debug) console.log('perRow', perRow);
      let e = this.nodesOfActiveTab.length % perRow;
      if(debug) console.log('e', e);
      this.extras = [];
      let extrasNeeded = e==0?0:perRow-e;
      this.extraWidth = (w/perRow)*extrasNeeded;
      return;
      //let debug = true;
      //let w = this.$el.offsetWidth;
      //if(debug) console.log('w', w);
      //let perRow = Math.floor(w/this.minPaneItemWidth);
      //if(debug) console.log('perRow', perRow);
      //let e = this.nodesOfActiveTab.length % perRow;
      //if(debug) console.log('e', e);
      //this.extras = [];
      //let extrasNeeded = e==0?0:perRow-e;
      //if(debug) console.log('extarsNeeded', extrasNeeded);
      //for(let i = 0; i < extrasNeeded; i++){
      //  this.extras.push({'id': Math.random(), 'type':'extra' });
      //}
      ////this.extras = e==0?0:perRow-e;
      //if(debug) console.log('extras', this.extras);
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
    overflow: scroll;
    position:relative;
    /*
    display: flex;
    flex-flow: row wrap;
    justify-content:center;
    align-content: flex-start;
    background-color:green;
    /**/
    display: grid;
    /*
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(90px, 1fr));
    grid-gap: 5px;
    grid-row-gap: 5px;
    /**/
    background-color: #e6e6e6;
    background-color: white;
    padding-left:10px;
    padding-right:10px;
    box-sizing: border-box;

    /*
    z-index:-2;
    /**/
  }
  .item{
    /*
    flex-grow:1;
    outline: black dotted 1px;
    outline-offset: -1px;
    /**/
  }
  .insideItem{
    margin:auto;
    box-shadow: 3px 3px 3px;
    outline: black 1px solid;
    outline-offset: -1px;
    /*
    outline: black dotted 1px;
    outline-offset: -1px;
    /**/
    overflow: hidden;
    background-color:white;
  }
  .focused{
    transition: all 0.1s;
    box-shadow: #e10000 5px 5px 3px;
  }
  .extra{
    background-color:red;
    opacity:1;
    /*
    visibility:hidden;
    /**/
    transition: width 20s;
  }
  .nodeList-leave-active {
    transition: 0s;
    position: absolute;
  }
  .nodeList-enter-active {
    transition: all 0.5s;
  }
  .nodeList-enter /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-200px);
  }
  .nodeList-leave-to {
    opacity: 0;
  }
  .nodeList-move {
    transition: transform 0.5s;
    z-index:1;
  }

</style>
