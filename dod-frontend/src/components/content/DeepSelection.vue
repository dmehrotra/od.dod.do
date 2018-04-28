<template>
  <div id="deepSelection" :style="{ width: width+'px', height: height + 'px' }">
    <p>The deep selection is here</p>
  </div>
</template>

<script>
//import MainRightWrapper from '@/components/layouts/MainRightWrapper'
///import MainContentWrapper from '@/components/layouts/MainContentWrapper'


export default {
  name: 'deepSelection',
//  components: {
//    HeadBarWrapper,
//    MainContentWrapper
//  },
  data () {
    return {
    }
  },
  props:[
    'height',
    'width',
  ],
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
  #deepSelection{
    background-color:red;
    opacity:0.5;
  }
</style>
