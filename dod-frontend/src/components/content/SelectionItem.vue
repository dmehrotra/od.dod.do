<template>
  <div class="selectionItem" :style="{width: width + 'px'}">
    {{data.selected.name}}
      <a href="#" @click="close">close</a>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'SelectionItem',
//  components: {
//    HeadBarWrapper,
//    MainContentWrapper
//  },
  data () {
    return {
    }
  },
  props: [
    'data',
    'width',
    'height',
  ],
  mounted(){
  },
  beforeDestroy: function () {
  },
  beforeDestroy: function () {
  },
  methods: {
    ...mapActions([
      'removeFromSelection',
      'deepSelect',
      'clearDeepSelection'
    ]),
    close(){
      //if(this.isDeepSelection){
      //  this.clearDeepSelection();
      //}
      this.removeFromSelection(this.data.selected.uindex)

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .selectionItem{
    outline-offset: -2px;
    outline: 2px solid black;
  }
</style>
