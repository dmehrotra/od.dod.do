<template>
  <div id="pane" :style="{height:height+'px'}">
    <pane-node v-for="node in nodes" 
      :data=node
      :toggleSelect=toggleSelect
      :setAllSubnodes=setAllSubnodes
      :setActiveNode=setActiveNode
    >
    </pane-node>
  </div>
</template>

<script>

//import FirstThrowRequester from '@/components/FirstThrowRequester'
//import FirstThrowDisplay from '@/components/FirstThrowDisplay'
import PaneNode from '@/components/PaneNode'

//import {mapGetters, mapActions} from 'vuex';


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
    'setAllSubnodes',
    'setActiveNode'
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
  outline: 1px solid black;
}
#pane{
  overflow: scroll;
}

</style>
