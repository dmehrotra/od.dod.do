<template>
  <div id="headLineWrapper">
  </div>
</template>

<script>
///import HeadBarWrapper from '@/components/layouts/HeadBarWrapper'
///import MainContentWrapper from '@/components/layouts/MainContentWrapper'


export default {
  name: 'HeadLineWrapper',
//  components: {
//    HeadBarWrapper,
//    MainContentWrapper
//  },
  data () {
    return {
     // data: [],
     // width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
     // windowHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    }
  },
  props:[
    //'headBarHeight'
  ],
  mounted(){
    //window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    //window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize(){
     // this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
     // this.windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #headLineWrapper{
    flex-grow:1;
    outline: solid 3px red;
    outline-offset: -9px;
  }
</style>
