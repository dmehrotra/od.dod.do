<template>
  <div id="contractBoardWrapper">
    <p>Contracts</p>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'Contracts',
  methods:{
  },
	computed: {
    ...mapGetters([
      'selection'
    ]),
  }
  //data () {
  //  return {
  //    msg: ''
  //  }
  //}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#contractBoardWrapper{
  /*
  width: 39%;
  height:900px;
  border: solid black;
  display: inline-block;
  */
  width:100%;
  height:50%;
  border: 2px solid blue;
  overflow:scroll;
  flex-grow:1;
  /*padding: 10px;*/
}
</style>
