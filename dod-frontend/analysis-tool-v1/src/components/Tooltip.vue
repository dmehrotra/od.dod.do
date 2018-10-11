<template>
  <div id="tooltip" 
       :style="{left: xPosition +'px', top: yPosition + 'px', opacity:opacity, width: tooltipDims.width+'px', height: tooltipDims.height+'px'}"
       v-on:mouseover="mouseOver"
       v-on:mouseout="mouseOut"
    >
    <div class="bg"></div>
      <!--:style="{width: width-2*padding+'px', height: height-2*padding+'px'}"-->
    <div class="tooltip-content"
      >
      <a @click=crossOutTooltip>close</a>
      <p>Hello</p>
      </div>
    </div>


  </div>
</template>

<script>


//import ProjectTooltip from '@/components/ProjectTooltip'
//import ConnectionTooltip from '@/components/ConnectionTooltip'
import {TweenMax} from "gsap";

import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'tooltip',
  components: {
    //ProjectTooltip,
    //ConnectionTooltip,
  },
  data () {
    return {
      width:140,
      height:230,
      padding:5,
      opacity:0,
      //xPosition: 0,
      //yPosition: 0,
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
    'currentNode',
  ],
  computed:{
    ...mapGetters([
      'tooltipDims',
    ]),
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
    ...mapActions([
      'setFocusedNode'
    ]),
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
    hideTooltipFast: function(){
      this.hideAnimation = TweenLite.to(this.$data, 0.1, { opacity: 0.0,
        onComplete:()=>{
          this.xPosition = -500; 
          this.yPosition = -500; 
        }
      });
    },
    mouseOver: function(){
    //  console.log("HH:");
      this.hideAnimation.kill();
      this.opacity = this.maxOpacity;

      this.setFocusedNode({id:this.currentNode.id, flag:true});
    //  this.setActiveNode(this.currentNode.id, true);
    },
    mouseOut: function(){
      this.hideTooltipFast();
      this.setFocusedNode({id:this.currentNode.id, flag:false});
    //  this.setActiveNode(this.currentNode.id, false);
    },
    //crossOutNode: function(){
    //  
    //  this.setAnimateViz(false);
    //    //<a v-if="currentNode.type=='project'" href="#" @click="deleteProject(currentNode.id)">delete node</a>
    //  if(this.currentNode.type == 'project'){
    //    this.deleteProject(this.currentNode.id)
    //  }else{
    //    this.setSubnode(this.currentNode.id, false)
    //  }
    //    //<a v-else href="#" @click="setSubnode(currentNode.id, false)">fold in subnode</a>
    //  this.xPosition = -500; 
    //  this.yPosition = -500; 
    //  this.opacity = 0.0;
    //},
    //unselectProjectAndCloseTooltip(){
    //  this.unselectProject(this.currentNode.id);
    //  this.xPosition = -500; 
    //  this.yPosition = -500; 
    //  this.opacity = 0.0;
    //},

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #tooltip{
    position: absolute;
    border: 1px red solid;
    border-radius: 4px;
    /*
    padding: 5px;
    /**/
  }
  .bg{
    background-color:white;
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
</style>
