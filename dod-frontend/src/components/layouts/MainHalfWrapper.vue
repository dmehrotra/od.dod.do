<template>
  <div :style="{ width: width+'px', height: height + 'px' }">
    <slot/>
  </div>
</template>

<script>


export default {
  name: 'MainHalfWrapper',
  props:[
    'height',
    'width',
  ],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div{
    outline: solid 3px red;
    outline-offset: -9px;
  }
</style>
