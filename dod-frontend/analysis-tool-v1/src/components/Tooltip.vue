<template>
  <div id="tooltip" 
       :style="{left: xPosition +'px', top: yPosition + 'px', opacity: opacity}"
       v-on:mouseover="mouseOver"
       v-on:mouseout="mouseOut"
    
    >
      <p v-if="currentNode.type=='project'">{{currentNode.id}}</p>
      <p v-else>{{currentNode.title}}</p>
  </div>
</template>

<script>

import {TweenMax} from "gsap";

export default {
  name: 'tooltip',
  components: {
 //   FirstThrowRequester,
  },
  data () {
    return {
      opacity:0,
      xPosition: -500,
      yPosition: -500,

      hideAnimation: undefined,
      showAnimation: undefined,
    }
  },
  props:[
    'xPos',
    'yPos',
    'fullactive',
    'setActiveNode',
    'currentNode',
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
          this.showAnimation = TweenLite.to(this.$data, 0.2, { opacity: 1.0 });
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
      this.opacity = 1;
      this.setActiveNode(this.currentNode.id, true);
    },
    mouseOut: function(){
      this.hideTooltip();
      this.setActiveNode(this.currentNode.id, false);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #tooltip{
    position: absolute;
    width: 120px;
    height: 100px;
    background-color:grey;
  }
</style>
