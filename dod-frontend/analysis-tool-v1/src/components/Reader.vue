<template>
  <div id="reader" @mouseover=mouseOver @mouseout=mouseOut>
    <div class='readerContentWrapper'
       :style="{height: readerMaxHeight -resizeElementWidth/2 + 'px'}"
      >

      <div class='readerTextWrapper'>

        <p class='readerTitle'>{{getDate(currentReaderContent.date)}}</p>
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
    ...mapActions([
      'setFocusedNode',
    ]),
    mouseOver(){
      this.setFocusedNode({id: this.currentReaderContent.id, flag:true});
    },
    mouseOut(){
      this.setFocusedNode({id: this.currentReaderContent.id, flag:false});
    },
    getDate(d){
      d = new Date(d);
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 

      return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()
    }
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
