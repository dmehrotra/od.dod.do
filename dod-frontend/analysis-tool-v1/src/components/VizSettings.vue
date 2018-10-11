<template>
  <div id="vizSettings" :style="{width: vizWidth + 'px', height: windowDims.height + 'px'}"> 
    <div class="background" :style="{width: vizWidth + 'px', height: windowDims.height + 'px'}"> 
    </div>
    <div class="settingsWrapper" :style="{width: vizWidth + 'px', height: windowDims.height + 'px'}"> 
      <a class='settings-button' @click=toggleVizSettings>close</a>
      <h2>Settings</h2>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'vizSettings',
  components: {
  },
  data () {
    return {
    }
  },
  props:[
    'vizWidth'
  ],
  computed:{
    ...mapGetters([
      'windowDims',
    ]),
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
    ...mapActions([
      'toggleVizSettings',
    ]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #vizSettings{
    position: absolute;
    left:0;
    top:0;
  }
  .settingsWrapper{
    position: absolute;
    left:0;
    top:0;
  }
  .background{
    background-color:black;
    opacity:0.8;
    position: absolute;
    left:0;
    top:0;
  }
  h2{
    color:white;
    font-family: sans-serif;
  }
  p{
    color:white;
    font-family: sans-serif;
  }
  .settings-button{
    margin:0;
    position:absolute;
    font-family: sans-serif;
    font-size:14px;
    text-align: right;
    right:10px;
    top: 5px;
    color: grey;
    text-decoration: underline;
    cursor: pointer;
  }
  .settings-button:hover{
    opacity: 0.8;
  }
</style>
