<template>
  <div class="tooltip-scrolling-line boundingBox"
       @mouseover="isHovering = true"
      @mouseout="isHovering = false"
   :style="{width: width+'px', outline: ''}"
   >
    <div 
       :class="{shouldScroll: isHovering, scrollingWrapper: true}"
       :style="{width: wrapperWidth +'px',
          animation: (isHovering||alwaysScroll)?'tooltipScrollingLineMarquee '+ (0.5+wrapperWidth*0.03) +'s linear infinite':'none'
       }"
       >
       <p ref='text' :style="{fontSize: fontSize +'px', display: 'inline-block'}">{{text}}</p>

    </div>
  </div>
</template>

<script>
export default {
  name: 'tooltipScrollingLine',
  components: {
  },
  data () {
    return {
      textWidth: 0,
      isHovering: false,
    }
  },
  props:[
    'width',
    'text',
    'fontSize',
    'alwaysScroll'
  ],
  computed:{
    wrapperWidth(){
      return Math.max(0, this.textWidth-this.width+5);
    }
  },
	watch: {
    '$props.text':{
      handler: function (val, oldVal) { 
        setTimeout(()=>{
          this.textWidth = this.$refs.text.clientWidth;
        }, 50);
      },
      deep: true
    },
  },
  mounted(){
    this.textWidth = this.$refs.text.clientWidth;
  },
  beforeDestroy: function () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p{
    margin:0;
    font-family:sans-serif;
  }
  .boundingBox{
    overflow:hidden;
    white-space: nowrap;
    /*
    outline: 1px solid black;
    /**/
  }

  .shouldScroll{
    /*
    animation: marquee 2s linear infinite;
    */
  }
</style>
<style>

  /* Make it move */
  @keyframes tooltipScrollingLineMarquee {
      0%   { transform: translate(0, 0); }
      40% { transform: translate(-100%, 0); }
      60% { transform: translate(-100%, 0); }
      80%   { transform: translate(0, 0); }
  }

</style>
