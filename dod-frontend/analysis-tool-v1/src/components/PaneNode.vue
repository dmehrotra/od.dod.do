<template>
  <div class="paneNode" @mouseover="mouseOver" @mouseout="mouseOut">
    <div class='title'
        :style="{height: paneItemHeight + 'px', width: leftTitleWidth +'px'}"
      ><p>{{data.id}}</p>
    </div>
    <div class='paneNodeMain' 
       :style="{width: minPaneItemWidth - leftTitleWidth + 'px', height: paneItemHeight +'px'}"
      >
        <a class='close' @click="deleteNode"></a>

    </div>
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
      leftTitleWidth: 12
    }
  },
  props:[
    'data',
    'deleteNode',
  ],
  computed:{
    ...mapGetters([
      'paneItemHeight',
      'minPaneItemWidth',
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
    display: flex;
    flex-flow: row wrap;
  }
  .title{
    outline: 1px solid black;
    white-space: nowrap;
    overflow: hidden;
    padding-top:8px;
    padding-left:2px;
    text-align:center;
    box-sizing: border-box;
  }
  .title p{
    margin: 0;
    font-family: sans-serif;
    transform: rotate(90deg);
    font-size: 5.9px;
    
  }

  .paneNodeMain{
    position:relative;
  }
  .close {
    right: 5px;
    top: 4px;
    width: 12px;
    height: 12px;
    opacity: 0.3;
    position: absolute;
  }
  .close:hover{
    opacity: 1;
    cursor: pointer;
  }
  .close:before, .close:after {
    position: absolute;
    left: 7px;
    content: ' ';
    height: 12px;
    width: 2px;
    background-color: black;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
</style>

