<template>
  <li class="tooltip-subnodes-list-element" @click="toggle" 
      :title="visible?
      'click to hide this node from the graph':
      'click to show this node on the graph'"
      :style="{height: height + 'px', width: width-2 + 'px'}" 
    >

    <!--<p>{{name}}</p>-->
    <TooltipScrollingLine
      :width=width-2-height-3
      :text=name
      :fontSize=12
      :style="{height: height + 'px', display: 'inline-block', float:'left', paddingLeft: '3px'}"
     />
    <div class='toggleBox'
      :style="{width: height + 'px', height: height+'px'}" 
      >
      <span :class="{dot: true, isVisible: visible, isInVisible: !visible}"></span>
     </div>
    <!--<div class='subnode-name'>-->
      <!--<p :class="{shouldScroll: name.length>16}">{{name}}</p>-->
    <!--</div>-->
    <!--<div class='subnode-toggle'>-->
      <!--<span :class="{dot: true, isVisible: visible, isInVisible: !visible}"></span>-->
    <!--</div>-->
  </li>
</template>

<script>

import TooltipScrollingLine from '@/components/TooltipScrollingLine'

export default {
  name: 'tooltipSubnodesListElement',
  components: {
    TooltipScrollingLine
  },
  data () {
    return {
    }
  },
  props:[
    'idArray',
    'name',
    'width',
    'height',
    'isVisible',
    'setSubnode',
    'backgroundColor',
  ],
  computed:{
    visible: function(){
      // if a minimum of 1 subnode is hodden, 'all' will be unchecked'
      let invisibleIndex = this.idArray.findIndex(id=>this.isVisible(id)==false)
      if(invisibleIndex == -1){
        return true;
      }else{
        return false;
      }
    }
  },
	watch: {

  },
  mounted(){
    
  },
  beforeDestroy: function () {
  },
  methods: {
    toggle: function(){
      let flag = !this.visible;
      this.idArray.forEach(id => this.setSubnode(id, flag));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  p{
    color: black;
    font-size: 0.7em;
    font-family: sans-serif;
    margin:0;
    line-height:17px;
  }
  .tooltip-subnodes-list-element{
    cursor:pointer;
  }
  .tooltip-subnodes-list-element:hover{
    background-color:#bfbfbf;
  }
  .toggleBox{
    display: inline-block;
    /*
    outline: black 1px solid; 
    /**/
  }

  .dot {
    margin-top:3px;
    margin-left:3px;
    height: 13px;
    width: 13px;
    border-radius: 50%;
    display: inline-block;
  }
  .isVisible{
    border: none;
    background-color: black;
  }
  .isInVisible{
  }

/*
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
  /*
  @keyframes marquee {
      0%   { transform: translate(0, 0); }
      30%   { transform: translate(0, 0); }
      70% { transform: translate(-100%, 0); }
      80% { transform: translate(-100%, 0); }
  }

*/
</style>
