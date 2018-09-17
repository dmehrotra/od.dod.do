<template>
  <div id="reader" :style="{height: height +'px'}">
    <a href="#" @click=toggleReader>close</a>
    <p>{{readerText}}</p>
  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'reader',
  components: {
 //   FirstThrowRequester,
  },
  data () {
    return {
    }
  },
  props:[
    'height'
  ],
  computed:{
    ...mapGetters([
      'readerText'
    ]),
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
    ...mapActions([
      'toggleReader'
    ]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
