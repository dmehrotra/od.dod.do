<template>
  <div id="pane" :style="{height:height+'px'}">
    <pane-node v-for="node in nodes" 
      :data=node
      :id="'pane-node-'+node.id"
    >
    </pane-node>
  </div>
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

</style>
