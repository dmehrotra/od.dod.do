<template>
  <div id="contractSelectorWrapper" :style="{ width: width+'px', flexGrow: flex, height: height+'px'}">
    <a href="#" @click="clearDeepSelection">close</a>
    <b><p>{{deepSelection.selected.name}}</p></b>
    <p>connected to:</p>
    <p v-for="connection in deepSelection.connections">
      {{connection.name}}

    </p>

  </div>
</template>

<script>
import * as d3 from 'd3';
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'ContractSelector',
  data () {
    return {
      flex: 0.5,
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * 0.5,
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-80,
    }
  },
  props:[
  ],
	computed: {
    ...mapGetters([
      'selection',
      'deepSelection'
    ]),
  },
	watch: {
  },
  mounted(){
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods:{
    ...mapActions([
      'clearDeepSelection',
    ]),
    handleResize(){
      if(this.selection.length > 0){
        this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * 0.5;
      }else{
        this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 80;
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
