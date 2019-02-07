<template>
  <div id="topsubnodes">

    <p class='topsubnodeHeadline'
       :style="{height: headlineHeight+'px'}"
       >

       tallied subnodes <a title="list of relation nodes connected to below projects (tallied by number or project nodes they are connected to)">(?)</a>
    </p>
    <div class='topSubnodesBoxWrapper'
       :style="{height: topSubnodeBarHeight- headlineHeight-17 +'px'}"
      >

      <div v-for='(node, i) in topSubnodes.nodes' :class="['el-' + i]"
        >
        <p class='left'

        @mouseover=mouseOver(node[0]) @mouseout=mouseOut(node[0])
        >
          {{node[2]}}
        </p>
        <p class='right'
        >
          {{node[1]}}
        </p>
      </div>

    </div>
  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex';


var VueScrollTo = require('vue-scrollto');
export default {
  name: 'topsubnodes',
  components: {
 //   FirstThrowRequester,
  },
  data () {
    return {
      headlineHeight:14,
      unwatchActiveTab: undefined,
    }
  },
  props:[
    'topSubnodes',
    'focusNodeBySubnode'
  ],
  computed:{
    ...mapGetters([
    //  'currentReaderContent',
    //  'readerMaxHeight',
    //  'resizeElementWidth',
      'topSubnodeBarHeight',
    ]),
  },
  mounted(){
    this.unwatchActiveTab = this.$store.watch(this.$store.getters.activeTabWatcher, _ => {
      var cancelScroll = VueScrollTo.scrollTo('.el-0', 500, {container: '.topSubnodesBoxWrapper'});

    });
  },
  beforeDestroy: function () {
    this.unwatchActiveTab();
  },
  methods: {
    ...mapActions([
      //'setFocusedNode',
    ]),
    mouseOver(id){
      this.focusNodeBySubnode(id, true);
    },
    mouseOut(id){
      this.focusNodeBySubnode(id, false);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #topsubnodes{
    padding: 5px 30px 5px 30px;
  }
  .topSubnodesBoxWrapper{
    /*
    outline: 1px solid black;  
    /**/
    overflow-y:scroll;
    overflow-x:hidden;
    max-width:300px;
    margin-left:auto;
    margin-right:auto;
  }
  .topSubnodesBoxWrapper div{
    padding: 1px 0px 1px 0px;
    position: relative;
    height:17px;
    white-space: nowrap;
  }
  .topSubnodesBoxWrapper p{
    cursor:default;
    margin:0;
    font-size: 12px;
    font-family: sans-serif;
    display:inline;
  }
  .left{
    position:absolute;
    left:0;
    width:100%;
  }
  .right{
    position:absolute;
    right:0;
    background-color: white;
    padding-left:4px;
    padding-right:12px;
    font-weight:bold;
  }
  .topsubnodeHeadline{
    text-align:center;
    margin:0;
    font-size: 12px;
    font-weight: bold;
    font-family: sans-serif;
  }

</style>

