<template>
  <div id="headControlsWrapper" :style="{ width: width+'px', height: height + 'px' }">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
  props:[
    'width',
    'height'
  ],

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #headControlsWrapper{
    outline: solid 3px red;
    outline-offset: -9px;
    flex-grow: 1;
  }
</style>
