<template>
  <div id="tooltip" 
       :style="{left: xPosition +'px', top: yPosition + 'px', opacity:opacity, width: width+'px', height: height+'px'}"
       v-on:mouseover="mouseOver"
       v-on:mouseout="mouseOut"
    >
    <div class="bg"></div>
    <div class="tooltip-content"
      :style="{width: width-2*padding+'px', height: height-2*padding+'px'}"
      >
      <a href="#" class="close" @click="crossOutTooltip"></a>
      <div class="tooltip-inner-content" v-if="currentNode != undefined">
        <project-tooltip v-if="currentNode.type=='project'"
          :currentNode=currentNode
          :crossOutNode=crossOutNode
          :unselectProject=unselectProjectAndCloseTooltip
          :setSubnode=setSubnode
        >
        </project-tooltip>
        <connection-tooltip v-else
          :title=currentNode.title
          :crossOutNode=crossOutNode
        >
        </connection-tooltip>
      </div>
    </div>


  </div>
</template>

<script>


import ProjectTooltip from '@/components/ProjectTooltip'
import ConnectionTooltip from '@/components/ConnectionTooltip'
import {TweenMax} from "gsap";

export default {
  name: 'tooltip',
  components: {
    ProjectTooltip,
    ConnectionTooltip,
  },
  data () {
    return {
      width:140,
      height:230,
      padding:5,
      opacity:0,
      xPosition: -500,
      yPosition: -500,

      hideAnimation: undefined,
      showAnimation: undefined,
      maxOpacity:1,
    }
  },
  props:[
    'xPos',
    'yPos',
    'fullactive',
    'setActiveNode',
    'currentNode',

    'deleteProject',
    'setSubnode',

    'setAnimateViz',
    'unselectProject',
  ],
  computed:{
  },
	watch: {
    '$props.xPos':{
      handler: function (val, oldVal) { 
        console.log("[Tooltip] xPos changed");
        console.log(val);
        if(this.opacity>0 && this.xPosition != -500){
          TweenLite.to(this.$data, 0.5, { xPosition: val });
        }else if(val != null){
          this.xPosition = val;
        }
      },
      deep: true
    },
    '$props.yPos':{
      handler: function (val, oldVal) { 
        console.log("[Tooltip] yPos changed");
        console.log(val);
        if(this.opacity>0 && this.yPosition != -500){
          TweenLite.to(this.$data, 0.5, { yPosition: val });
        }else if(val != null){
          this.yPosition = val;
        }
      },
      deep: true
    },
    '$props.fullactive':{
      handler: function (val, oldVal) { 
        console.log("[Tooltip] fullactive changed");
        console.log(val);
        if(val){
          this.showAnimation = TweenLite.to(this.$data, 0.2, { opacity: this.maxOpacity });
        }else{
          this.hideTooltip();
        }
      },
      deep: true
    },
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
    crossOutTooltip(){
      this.opacity = 0;
      this.xPosition = -500; 
      this.yPosition = -500; 
    },
    hideTooltip: function(){
      this.hideAnimation = TweenLite.to(this.$data, 0.5, { opacity: 0.0,
        onComplete:()=>{
          this.xPosition = -500; 
          this.yPosition = -500; 
        }
      });
    },
    mouseOver: function(){
      console.log("HH:");
      this.hideAnimation.kill();
      this.opacity = this.maxOpacity;
      this.setActiveNode(this.currentNode.id, true);
    },
    mouseOut: function(){
      this.hideTooltip();
      this.setActiveNode(this.currentNode.id, false);
    },
    crossOutNode: function(){
      
      this.setAnimateViz(false);
        //<a v-if="currentNode.type=='project'" href="#" @click="deleteProject(currentNode.id)">delete node</a>
      if(this.currentNode.type == 'project'){
        this.deleteProject(this.currentNode.id)
      }else{
        this.setSubnode(this.currentNode.id, false)
      }
        //<a v-else href="#" @click="setSubnode(currentNode.id, false)">fold in subnode</a>
      this.xPosition = -500; 
      this.yPosition = -500; 
      this.opacity = 0.0;
    },
    unselectProjectAndCloseTooltip(){
      this.unselectProject(this.currentNode.id);
      this.xPosition = -500; 
      this.yPosition = -500; 
      this.opacity = 0.0;
    },

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #tooltip{
    position: absolute;
    border: 1px white solid;
    border-radius: 4px;
    /*
    padding: 5px;
    /**/
  }
  .bg{
    background-color:black;
    width:100%;
    height:100%;
    position:absolute;
    border-radius: 3px;
    opacity:0.8;
    /*
    margin:-5px;
    border: 1px white solid;
    opacity:0.4;
    /**/
  }
  .tooltip-content{
    position:absolute;
    padding:5px;
  }
  .tooltip-inner-content{
    margin-top:20px;
  }
  .close-wrapper{
    position:relative;
    height:15px;
  }
  .close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 15px;
  height: 15px;
  opacity: 0.3;
  }
  .close:hover {
    opacity: 1;
  }
  .close:before, .close:after {
    position: absolute;
    left: 7px;
    content: ' ';
    height: 15px;
    width: 2px;
    background-color: white;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
</style>
