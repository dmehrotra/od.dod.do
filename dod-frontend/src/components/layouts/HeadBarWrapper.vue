<template>
  <div id="headBarWrapper" :style="{ width: width+'px', height: headBarHeight + 'px' }">
    <slot/>
  </div>
</template>

<script>

export default {
  name: 'HeadBarWrapper',
  components: {
  },
  props:[
    'headBarHeight',
    'width'
  ],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #headBarWrapper{
    /*
    outline: solid 3px green;
    outline-offset: -6px;
    /**/
    display: flex;
    flex-direction: row;
  }
</style>
