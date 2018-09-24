<template>
  <div id="reader">
    <div class='readerContentWrapper'
       :style="{height: readerMaxHeight -resizeElementWidth/2 + 'px'}"
      >

      <div class='readerTextWrapper'>

        <p class='readerTitle'>{{currentReaderContent.id}}</p>
        <p class='readerContent'>{{currentReaderContent.text}}</p>
      </div>
    </div>
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
  ],
  computed:{
    ...mapGetters([
      'currentReaderContent',
      'readerMaxHeight',
      'resizeElementWidth',
    ]),
  },
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
  .readerContentWrapper{
    width: 100%;
    overflow:scroll;
    box-sizing: border-box;

  }
  .readerTextWrapper{
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;

  }
  .readerTitle{
     font-family:sans-serif;
     font-weight:bold;
     font-size:1.1em;
  }
  .readerContent{
     font-family:sans-serif;
     font-size:1em;
    
  }
</style>
