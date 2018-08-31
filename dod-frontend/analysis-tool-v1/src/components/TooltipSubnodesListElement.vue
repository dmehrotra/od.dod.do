<template>
  <div class="tooltip-subnodes-list-element" @click="toggle">
    <div class='subnode-name'>
      <p :class="{shouldScroll: name.length>16}">{{name}}</p>
    </div>
    <div class='subnode-toggle'>
      <span :class="{dot: true, isVisible: visible, isInVisible: !visible}"></span>
    </div>
  </div>
</template>

<script>


export default {
  name: 'tooltipSubnodesListElement',
  components: {
  },
  data () {
    return {
    }
  },
  props:[
    'id',
    'name',
    'visible',
    'setSubnode',
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
    toggle: function(){
      this.setSubnode(this.id, !this.visible)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tooltip-subnodes-list-element{
    display:flex;
    flex-direction: row;
    cursor:pointer;
    height:16px;
  }
  .tooltip-subnodes-list-element:hover{
    background-color:#bfbfbf;

  }
  a{
    color: black;
    font-size: 0.7em;
    font-family: sans-serif;
    margin:0;
  }
  p{
    color: black;
    font-size: 0.7em;
    font-family: sans-serif;
    margin:0;
    line-height:17px;
  }
  
  .subnode-toggle{
    flex:0.3; 
    text-align: center;
  }

  .subnode-name{
    flex:0.7; 
    white-space: nowrap;
    overflow:hidden;
  }

  .shouldScroll{
    animation: marquee 5s linear infinite;
  }
  /* Make it move */
  @keyframes marquee {
      0%   { transform: translate(0, 0); }
      30%   { transform: translate(0, 0); }
      70% { transform: translate(-100%, 0); }
      80% { transform: translate(-100%, 0); }
  }

  .dot {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    display: inline-block;
  }
  .isVisible{
    border: none;
    background-color: blue;
  }
  .isInVisible{
    border: 1px solid #e5e5e5;
  }
</style>
