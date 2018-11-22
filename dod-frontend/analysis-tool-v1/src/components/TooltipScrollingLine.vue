<template>
  <div class="tooltip-scrolling-line boundingBox"
   :style="{width: width+'px', outline: ''}"
   >
    <div class='scrolling-wrapper shouldScroll'
       :style="{width: wrapperWidth +'px'}"
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
    }
  },
  props:[
    'width',
    'text',
    'fontSize'
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
    animation: marquee 5s linear infinite;
  }
  /* Make it move */
  @keyframes marquee {
      0%   { transform: translate(0, 0); }
      20%   { transform: translate(0, 0); }
      60% { transform: translate(-100%, 0); }
      80% { transform: translate(-100%, 0); }
  }
</style>
