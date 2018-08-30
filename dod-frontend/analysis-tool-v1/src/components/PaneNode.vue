<template>
  <div class="paneNode" @mouseover="mouseOver" @mouseout="mouseOut">
    <p :style="{backgroundColor: 'black', color:'white', marginTop:'8px'}"><b>{{data.id}}</b></p>
    <p :style="{backgroundColor: data.selected?'green':'white'}">selected: <a href="#" @click="toggleSelect(data.id)">{{data.selected}}</a></p>
    <p>source: <span v-for="source in data.requestSource">{{source}}</span></p>
    <p><a href="#" @click="setAllSubnodes(data.id, true)">unfold</a></p>
    <p><a href="#" @click="setAllSubnodes(data.id, false)">fold in</a></p>
    <p>{{data.full_text}}</p>
    <p>mark 
      <a href="#" @click="markProject(data.id, 'green')">green</a>
      <a href="#" @click="markProject(data.id, 'yellow')">yellow</a>
      <a href="#" @click="markProject(data.id, 'red')">red</a>
      <a href="#" @click="markProject(data.id, 'none')">none</a>
    
    </p>
    <p>
      <a href="#" @click="deleteProject(data.id)">delete node</a>
    </p>
    <p v-if="data.selected" :style="{backgroundColor: 'blue', color:'white'}">currently {{data.relationships.filter(d=>d.visible).length}}/{{data.relationships.length}} subnodes are unfolded</p>

  </div>
</template>

<script>

//import FirstThrowRequester from '@/components/FirstThrowRequester'
//import FirstThrowDisplay from '@/components/FirstThrowDisplay'

//import {mapGetters, mapActions} from 'vuex';


export default {
  name: 'paneNode',
  components: {
 //   FirstThrowRequester,
 //   FirstThrowDisplay,
 //   Viz
  },
  data () {
    return {
    }
  },
  props:[
    'data',
    'toggleSelect',
    'setAllSubnodes',
    'setActiveNode',
    'markProject',
    'deleteProject',
  ],
  computed:{
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
    clicked(){
      this.toggleSelect(this.data.id)
    },
    mouseOver(){
      if(this.data.selected){
        this.setActiveNode(this.data.id, true);
      }
    },
    mouseOut(){
      if(this.data.selected){
        this.setActiveNode(this.data.id, false);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  outline: 1px solid black;
}
</style>
