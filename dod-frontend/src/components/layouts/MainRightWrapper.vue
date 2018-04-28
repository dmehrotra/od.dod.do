<template>
  <div id="mainRightWrapper" :style="{ width: width+'px', height: height + 'px' }">
    <viz id="viz"
      :height="height"
      :width="width"
      />
    <deep-selection id="deepSelection" v-show="false"
      :height="height"
      :width="width"
      />
  </div>
</template>

<script>
import Viz from '@/components/content/Viz'
import DeepSelection from '@/components/content/DeepSelection'
///import MainContentWrapper from '@/components/layouts/MainContentWrapper'


export default {
  name: 'MainRightWrapper',
  components: {
    Viz,
    DeepSelection
  },
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
  #mainRightWrapper{
    outline: solid 3px red;
    outline-offset: -9px;
    position:relative;
  }
  #viz{
    position:absolute;
  }
  #deepSelection{
    position:absolute;
  }
</style>
