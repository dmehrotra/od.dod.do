<template>
  <div id="">
    <!-- this is how to remove from selection -->
    <!--<div id="innerWrapper" @click="removeFromSelection(data.selected.uindex)">-->
    <div id="innerWrapper" @click="deepSelect(data.selected.uindex)" :style="{backgroundColor: isDeepSelection?'blue':'black'}">
    <!--<div id="innerWrapper" >-->
      <p><b>{{data.selected.name}}</b></p>
      <a href="#" @click="close">close</a>
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
    ...mapActions([
      'removeFromSelection',
      'deepSelect',
      'clearDeepSelection'
    ]),
    close(){
      if(this.isDeepSelection){
        this.clearDeepSelection();

      }
      this.removeFromSelection(this.data.selected.uindex)

    }
  },
	computed: {
    ...mapGetters([
      'deepSelection'
    ]),
    isDeepSelection(){
      if(this.deepSelection == undefined){
        return false;
      }else if(this.deepSelection.selected.uindex == this.data.selected.uindex){
        return true;
      }else{
        return false;
      }
    }
  },
  mounted(){
    console.log(this.data);
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
  border-radius:5px;
  /*

  background-color:black;
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
