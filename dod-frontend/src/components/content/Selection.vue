<template>
  <div id="" :style="{height: height + 'px'}">
    <div id='headline' v-if="selection.length>0" :style="{height: titleHeight + 'px'}">
      <p><b>Selected Nodes:</b></p>
    </div>
    <transition-group name="slide" tag="div" id="selectionContainer" :style="{height: (height-titleHeight) + 'px'}">
        <p  class="slide-item" v-for="(node, i) in selection"
          :data=node
          :key=node.selected.name
                               >{{node.selected.name}}</p>
      </transition-group>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'Selection',
//  components: {
//    HeadBarWrapper,
//    MainContentWrapper
//  },
  data () {
    return {
      titleHeight: 40
    }
  },
	computed: {
    ...mapGetters([
      'selection'
    ]),
  },
  props: [
    'height'
  ],
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
  div{
    outline: none;
  }
  #headline p{
    margin:0;
    line-height: 2;
  }
  #selectionContainer{
    overflow: scroll;
  }
  .slide-item{
    transition: 0.2s;
  }
  .slide-enter-active{
    transition-delay: 0.2s;
  }
  .slide-enter {
    transform: translate(-100%, 0);
  }
  .slide-leave-to {
    transform: translate(-100%, 0);
  }
</style>
