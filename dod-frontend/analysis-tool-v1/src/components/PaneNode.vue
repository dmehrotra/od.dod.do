<template>
  <div class="paneNode" @mouseover="mouseOver" @mouseout="mouseOut" :style="{order: parseInt(index)}">
    <div class='id'
        :style="{height: paneItemHeight + 'px'}"
      ><p>{{data.id}}</p></div>
  </div>
</template>

<script>


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
    ...mapGetters([
      'paneItemHeight',
    ]),
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
    ...mapActions([
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
  .paneNode{
  }
  .id{
    width: 12px;
    outline: 1px solid black;
    white-space: nowrap;
    overflow: hidden;
    padding-top:8px;
    padding-left:2px;
    text-align:center;
  }
  .id p{
    margin: 0;
    font-family: sans-serif;
    transform: rotate(90deg);
    font-size: 5.9px;
    
  }
</style>

