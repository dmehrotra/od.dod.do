<template>
  <div class="tooltip-top-buttons">
    <a href="#" v-scroll-to="{el: '#pane-node-'+id, container: '#pane'}">show</a>
    <a href="#" @click="unselectProject(id)">unselect</a>
    <a href="#" @click="crossOutNode()">delete</a>
  </div>
</template>

<script>


export default {
  name: 'tooltipTopButtons',
  components: {
  },
  data () {
    return {
    }
  },
  props:[
    'id',
    'crossOutNode',
    'unselectProject',
  ],
  computed:{
  },
	watch: {
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
  a{
    color: white;
    font-size:0.6em;
    line-height:17px;
    height:16px;
    border:0.5px white solid;
    flex:1;
    text-align:center;
    text-decoration: none;
    background-color:none;
    font-family:sans-serif;
  }
  a:hover{
    color: black;
    background-color:white;

  }
  .tooltip-top-buttons{
    background-color:none;
    display: flex;

  }
</style>
