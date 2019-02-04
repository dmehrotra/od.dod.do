<template>
  <div id="tabsWrapper" :style="{height: tabBarHeight +'px'}">
    <transition-group name='individual-tab-transition' tag='div' id='tabs'
      :style="{height: tabBarHeight +'px'}"
      >
      <div class='tab' v-if='tabs.length>0' 
          title='All press releases'
         :class="{tab: true, active: isActive({type:'all', value:'all'}), inActive: !isActive({type:'all', value:'all'})}"
         :style="{height: tabHeight +'px'}"
         :key="'all'"
         >

         <div class='titleWrapper'
           @click="changeActiveTab({type:'all', value:'all', timestamp:0})"
           >
           <a class='title'><i>all</i></a>
         </div>
         
        <a 
          @click="deleteByTab({type:'all', value:'all', timestamp:0})"
          class='close'
          >
        </a>
      </div>

      <div class='tab' v-if='nodesOnGraph'
          title='All press releases currently on the graph'
         :class="{tab: true, active: isActive({type:'graph', value:'graph'}), inActive: !isActive({type:'graph', value:'graph'})}"
         :style="{height: tabHeight +'px'}"
         :key="'graph'"
         >

         <div class='titleWrapper'
           @click="changeActiveTab({type:'graph', value:'graph', timestamp:0})"
           >
           <a class='title'><i>graph</i></a>
         </div>
         
        <a 
          @click="deleteByTab({type:'graph', value:'graph', timestamp:0})"
          class='close'
          >
        </a>
      </div>

      <div class='tab' v-for="tab in tabs"
        @click="changeActiveTab(tab)"
        @mouseover=mouseOver(tab.value) @mouseout=mouseOut(tab.value)
        :class="{tab: true, active: isActive(tab), inActive: !isActive(tab)}"
        :style="{height: tabHeight +'px'}"
        :key="tab.timestamp"
        >

         <div 
         :class='{titleWrapper: true, tabNodeFocused: !isActive(tab) &&idsByTab[tab.value].find(id=>focusedNode.includes(id)) }'
          @click="changeActiveTab(tab)"
           >
           <a 
             
             class='title'>{{tab.value}}</a>
         </div>
         
        <a 
          @click="deleteByTab(tab)"
          class='close'
          >
        </a>
      </div>
    </transition-group>
  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'tabs',
  components: {
  },
  data () {
    return {
    }
  },
  props:[
    'tabs',
    'deleteByTab',
    'idsByTab',
    'nodesOnGraph',
  ],
  computed:{
    ...mapGetters([
      'tabHeight',
      'tabBarHeight',
      'activeTab',
      'focusedNode',
    ]),
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
    ...mapActions([
      'changeActiveTab',
      'setFocusedNode',
    ]),
    isActive: function(tab){
      if(tab.type==this.activeTab.type && tab.value == this.activeTab.value) return true;
      else return false;
    },
    mouseOver(t){
      this.idsByTab[t].forEach(id=>{
        this.setFocusedNode({id:id, flag:true});
      });
    },
    mouseOut(t){
      this.idsByTab[t].forEach(id=>{
        this.setFocusedNode({id:id, flag:false});
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #tabsWrapper{
    width:100%;
    overflow-y: scroll;
  }
  #tabs{
    width:100%;
    display: flex;
    flex-flow: row wrap;
  }
  .tab{
    flex-grow: 1;
    text-align:center;
    border-style: solid solid solid solid;
    border-color: black;
    border-width: 1px;
    cursor: pointer;
    position:relative;
    background-color:white;
  }

  .active{
    border-style: solid solid none solid;
  }
  .inActive .title{
    opacity: 0.6;
  }
  .inActive:hover .title{
    opacity: 1;
  }
  .title{
    font-family: sans-serif;
    font-size: 12px;
    margin: 0px 23px 0px 23px;
    font-weight: bold;
  }
  .active .title{
    font-weight: bold;
  }

  .close {
    position: absolute;
    right: 5px;
    top: 4px;
    width: 12px;
    height: 12px;
    opacity: 1;
    visibility:hidden;
  }
  .close:hover {
    opacity: 0.5;
  }
  .close:before, .close:after {
    position: absolute;
    left: 7px;
    content: ' ';
    height: 12px;
    width: 2px;
    background-color: black;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
  .tab:hover .close{
    visibility: visible;
  }

  .tabNodeFocused a{
    color: red;
  }



.individual-tab-transition-enter-active, .individual-tab-transition-leave-active {
  transition: all 0.6s ease;
}
.individual-tab-transition-enter, .individual-tab-transition-leave-to/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(100px);
}
.individual-tab-transition-move {
  transition: transform 0.6s;
}
</style>
