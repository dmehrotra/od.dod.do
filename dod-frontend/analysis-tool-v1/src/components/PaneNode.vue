<template>
  <div class="paneNode" @mouseover="mouseOver" @mouseout="mouseOut">
    <div class="insidePaneNode">
    </div>
  </div>
</template>

<script>

//import FirstThrowRequester from '@/components/FirstThrowRequester'
//import FirstThrowDisplay from '@/components/FirstThrowDisplay'

import {mapGetters, mapActions} from 'vuex';


export default {
  name: 'paneNode',
  components: {
  },
  data () {
    return {
    }
  },
  props:[
    'data',
  ],
  computed:{
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
    ...mapActions([
      'toggleReader'
    ]),
    clicked(){
    },
    mouseOver(){
    },
    mouseOut(){
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
  background-color:black;
  outline: white 1px solid;
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
  /*
  background-color:red;
  /**/
  border: 2px black solid;
  border-radius: 4px;

  width: 145px;
  height:95px;
}
</style>
