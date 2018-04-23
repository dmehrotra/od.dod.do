<template>
  <div id="boardWrapper" :style="{flexGrow: flex, width: width+'px'}">
      <selection
        :parentHeight="height"
      />    
      <contracts/>    
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Selection from '@/components/Selection'
import Contracts from '@/components/Contracts'
import {TweenMax} from "gsap";
export default {
  name: 'Board',
  components: {
    Selection,
    Contracts
  },
  data () {
    return {
      unwatchStoreForSelection: undefined,
      flex: 0.0,
      width: 0.0,
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 80,

    }
  },
	computed: {
    ...mapGetters([
      'selection'
    ]),
  },
  mounted(){
		this.unwatchStoreForSelection = this.$store.watch(this.$store.getters.currentSelectionWatcher, selection => {
      if(selection.length > 0){
        let newWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) *0.5;
        TweenLite.to(this.$data, 1.0, { flex: 0.5, width: newWidth });
      }else{
         TweenLite.to(this.$data, 1.0, { flex: 0.0, width: 0.0 });
      }
    })
    window.addEventListener('resize', this.handleResize)
    //this.handleResize();
  },
  
  beforeDestroy: function () {
    console.log("OUT");
    this.unwatchStoreForSelection();
    window.removeEventListener('resize', this.handleResize)
    //window.removeEventListener('resize', this.handleResize)
    //TweenLite.to(this.$data, 3.0, { flex: 0.0, width: 0.0 });
  },
  methods:{
    handleResize(){
      if(this.selection.length > 0){
        this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * 0.5;
      }else{
        this.width = 0;
      }
      this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 80;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#boardWrapper{
  /*
  width: 39%;
  height:900px;
  border: solid black;
  display: inline-block;
  overflow:scroll;

  width:50%;
  */
  height:100%;
  /*
  border: 4px solid blue;
  padding-left: 10px;
  padding-right: 10px;
  */
  display:flex;
  flex-direction: column;
}
/*
.selectionWrapper{
  width: 90%;
  border: solid black;
}
.connectedToWrapper{
  width: 80%;
  border: solid blue;
}
.connectedToIndividualWrapper{
  width: 100%;
  border: solid red;
}
*/
</style>
