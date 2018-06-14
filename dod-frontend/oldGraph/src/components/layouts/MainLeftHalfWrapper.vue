<template>
  <div :style="{ width: width+'px', height: height + 'px' }">
    <slot/>
  </div>
</template>

<script>


export default {
  name: 'MainLeftHalfWrapper',
  props:[
    'height',
    'width',
  ],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div{
    /*
    outline: solid 3px blue;
    outline-offset: -12px;
    /**/
    
  }
</style>
