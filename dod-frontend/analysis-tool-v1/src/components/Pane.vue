<template>
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
</template>

<script>

//import FirstThrowRequester from '@/components/FirstThrowRequester'
//import FirstThrowDisplay from '@/components/FirstThrowDisplay'
import PaneNode from '@/components/PaneNode'



export default {
  name: 'pane',
  components: {
 //   FirstThrowRequester,
 //   FirstThrowDisplay,
 //   Viz
    PaneNode
  },
  data () {
    return {
    }
  },
  props:[
    'nodes',
    'height',
    'toggleSelect',
    'deleteProject',
  ],
  computed:{
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div{
  }
  #pane{
    outline: 2px solid black;
    /**/

    background-color:white;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    justify-content:center;
    /*
    /**/
    overflow: scroll;
  }
  .no-node{
    visibility: hidden;
  }

</style>
