<template>
  <div id="viz" :style="{ width: width+'px', height: height + 'px' }">
    <svg xmlns="http://www.w3.org/2000/svg" v-if="true">
    </svg>
  </div>
</template>

<script>
//import MainRightWrapper from '@/components/layouts/MainRightWrapper'
///import MainContentWrapper from '@/components/layouts/MainContentWrapper'


export default {
  name: 'Viz',
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
  #viz{
    background-color:green;
  }
  svg{
    background-color: black;
    width:100%;
    height:100%;
  }
</style>
