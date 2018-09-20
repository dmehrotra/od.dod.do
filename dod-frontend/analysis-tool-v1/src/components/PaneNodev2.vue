<template>
  <div class="paneNode" @mouseover="mouseOver" @mouseout="mouseOut" :style="{order: parseInt(index)}">
    <div :class="{ insidePaneNode: true, insidePaneNodeActive: isActive }">
      <div :class="{ nodeId: true, nodeIdActive: isActive }">
        <p>{{data.id}}</p>
      </div>
        <pane-node-options
          :data=data
          :isActive=isActive        
          :toggleSelect=toggleSelect
          :deleteProject=deleteProject
        >
        </pane-node-options>
    </div>
  </div>
</template>

<script>

//import FirstThrowRequester from '@/components/FirstThrowRequester'
//import FirstThrowDisplay from '@/components/FirstThrowDisplay'
import PaneNodeOptions from '@/components/PaneNodeOptions'

import {mapGetters, mapActions} from 'vuex';


export default {
  name: 'paneNode',
  components: {
    PaneNodeOptions,
  },
  data () {
    return {
      hovered: false,
    }
  },
  props:[
    'data',
    'toggleSelect',
    'deleteProject',
    'index',
  ],
  computed:{
    isActive: function(){
      return this.hovered || this.data.selected;

    }
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
    ...mapActions([
      'setReaderText', 
    ]),
    clicked(){
    },
    mouseOver(){
      this.hovered = true;
    },
    mouseOut(){
      this.hovered = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div{
    /*
    outline: 1px solid black;
    /**/
  }
  .paneNode{
    /*
    outline: red  1px solid;
    background-color:black;
    /**/

    width:150px;
    height:100px;
    padding-top: 5px;
    padding-left: 5px;

    /*
    min-width: 150px;
    max-width: 250px;
    flex-basis: auto; 
    flex-grow: 1;
    /**/
  }
  .insidePaneNode{
    background-color: #f4f4f4; /*
    border: 2px black solid;
    /**/
    border-radius: 4px;
    width: 145px;
    height:85px;
    padding-top: 10px;
  }
  .insidePaneNodeActive{
    /*
    background-color: #cbcbcb;
    background-color: #565656;
    /**/

    background-color: #9e9e9e;
  }

  .nodeId{
    width:100%;
    height:14px;
    background-color: white;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom:8px;
  }
  .nodeId p{
    margin:-2px;
    font-family: sans-serif;
    color: #f4f4f4; 
    /**/

  }
  .nodeIdActive p{
    /*
    color:black;
    /**/
    color: #565656;
  }
  .insidePaneNode:hover .nodeId p{ 
    animation: marquee 8s linear infinite;
  }

  /* Make it move */
  @keyframes marquee {
      0%   { transform: translate(0, 0); }
      40% { transform: translate(-120%, 0); }
      50% { transform: translate(-120%, 0); }
      60%   { transform: translate(0, 0); }
  }
</style>

