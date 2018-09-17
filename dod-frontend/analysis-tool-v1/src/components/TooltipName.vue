<template>
  <div class="tooltip-name">
    <p ref="name" :class="{shouldScroll: name.length>21}">{{name}}</p>
  </div>
</template>

<script>


export default {
  name: 'tooltipName',
  components: {
  },
  data () {
    return {
      flows:false,
    }
  },
  props:[
    'name',
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
  p{
    color: black;
    font-size:0.8em;
    font-family:sans-serif;
    margin:0;
  }
  .shouldScroll{
    animation: marquee 5s linear infinite;
  }
  .tooltip-name{
    overflow:hidden;
    white-space: nowrap;
    background-color:white;
  }
  /* Make it move */
  @keyframes marquee {
      0%   { transform: translate(0, 0); }
      30%   { transform: translate(0, 0); }
      70% { transform: translate(-100%, 0); }
      80% { transform: translate(-100%, 0); }
  }
</style>
