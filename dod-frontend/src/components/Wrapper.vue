<template>
  <div id="wrapper">
    <Manager
      v-on:input="gotData(arguments)"
    />
    <div id="mainContentWrapper" :style="{ width: width+'px', height: height + 'px' }">
      <transition name="slide">
        <Board v-if="selection.length > -1"/>
      </transition>
      <Viz v-show="deepSelection == undefined"
        :data="data" 
      />
      <deep-selection v-if="deepSelection"
      />
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Manager from '@/components/Manager'
import Viz from '@/components/Viz'
import Board from '@/components/Board'
import DeepSelection from '@/components/DeepSelection'


export default {
  name: 'Wrapper',
  components: {
    Manager,
    Viz,
    Board,
    DeepSelection
  },
  data () {
    return {
      data: [],
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-80,
    }
  },
	computed: {
    ...mapGetters([
      'selection',
      'deepSelection'
    ]),
  },
  mounted(){
    // responsive width and height from here: https://github.com/vuejs/vue/issues/1915
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    gotData(args){
      this.data = args[0];
    },
    handleResize(){
      this.width =  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-80;
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #wrapper{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
  }
  #mainContentWrapper{
    display:flex;
    /*
    background-color:red;
    */
  }

  .slide-leave-active{

    transition: 1s;
  }
  /*
  .slide-enter {
    transform: translate(-100%, 0);
  }
  
  */
  .slide-leave-to {
    transform: translate(-100%, 0);
  }

</style>
