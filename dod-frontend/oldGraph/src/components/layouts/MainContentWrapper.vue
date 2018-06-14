<template>
  <div id="mainContentWrapper" :style="{ width: width+'px', height: height + 'px' }" @click="">
    <slot/>
  </div>
</template>

<script>

export default {
  name: 'MainContentWrapper',
  props:[
    'width',
    'height',
  ],
  mounted(){
  },
  beforeDestroy: function () {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #mainContentWrapper{
    /*
    outline: solid 3px green;
    outline-offset: -6px;
    /*
    */
    display: flex;
    flex-direction: row;
  }
</style>
