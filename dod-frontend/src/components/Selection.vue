<template>
  <div id="selectioBoardWrapper" :style="{height: (parentHeight/2)+'px'}" @click="scrollToTop">
    <div id='headline' v-if="selection.length>0">
      <p><b>Selected Nodes:</b></p>
    </div>

    <transition-group :ref="'containerScroll'" name="slide" id="selectionWrapper" tag="div" :style="{height: (parentHeight/2-57)+'px'}">
      <selectedItem  class="slide-item" v-for="(node, i) in selection"

        :data=node
        :key=node.selected.name
      />
    </transition-group>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import SelectedItem from '@/components/SelectedItem'

export default {
  name: 'Selection',
  components: {
    SelectedItem
  },
  data () {
    return {
      unwatchStoreForSelection: undefined,
      len: 0
    }
  },
  props: [
    'parentHeight'
  ],
  mounted(){
		this.unwatchStoreForSelection = this.$store.watch(this.$store.getters.currentSelectionWatcher, (selection,i) => {
      if(selection.length> this.len){
        this.len = selection.length;
        this.scrollToTop();
      }
    })
  },
  beforeDestroy: function () {
    this.unwatchStoreForSelection();
  },
  methods:{
    scrollToTop(){
      this.$refs.containerScroll.$el.scrollTop = 0;
    }
  },
	computed: {
    ...mapGetters([
      'selection'
    ]),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#selectioBoardWrapper{
  /*
  width: 39%;
  height:900px;
  border: solid black;
  display: inline-block;
  overflow:scroll;
  
  border: 2px solid blue;
  */
  height:50%;
  flex-grow:1;
  padding: 0px 5px 0px 5px;;
  position:relative;
}
#headline{
  height:57px;
  padding-left:5px;
}
#headline p{
  display:inline-block;
}
#selectionWrapper{
  overflow:scroll;
  /*
  background-color:grey;
  */
}
  .slide-item{
    transition: 0.2s;
  }
  .slide-enter-active,
  .slide-leave-active{
    transition-delay: 0.2s;
  }
  .slide-enter {
    transform: translate(-100%, 0);
  }
  .slide-leave-to {
    transform: translate(-100%, 0);
  }
</style>
