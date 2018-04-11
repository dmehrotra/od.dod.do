<template>
  <div id="">
    <div id="innerWrapper">
      <p><b>{{data.selected.name}}</b></p>
    </div>
      
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import SelectedItem from '@/components/SelectedItem'
export default {
  name: 'SelectedItem',
  props: [
    'data'
  ],
  methods:{
  },
	computed: {
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
div{
  /*
  margin-left:0.5%;
  width:100%;
  height:60px;
  */
  min-height:70px;
  margin-bottom:5px;
  background-color:black;
  border-radius:5px;
  /*
  padding-left:10px;
  padding-top:2px;
  */
}
#innerWrapper{
  padding-left:10px;
}
p{
  color:white;
  display: inline-block;
}
</style>
