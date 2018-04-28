<template>
  <div id="mainLeftWrapper" :style="{ width: width+'px', height: height + 'px' }">
  </div>
</template>

<script>
//import MainRightWrapper from '@/components/layouts/MainRightWrapper'
///import MainContentWrapper from '@/components/layouts/MainContentWrapper'


export default {
  name: 'MainLeftWrapper',
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
  #mainLeftWrapper{
    outline: solid 3px red;
    outline-offset: -9px;
  }
</style>
