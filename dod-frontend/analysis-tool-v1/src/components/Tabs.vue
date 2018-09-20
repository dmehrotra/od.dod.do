<template>
  <div id="tabs" :style="{height: tabBarHeight +'px'}">
    <div class='tab' v-if='tabs.length>0'
       @click="changeActiveTab({type:'all', value:'all'})"
       :class="{tab: true, active: isActive({type:'all', value:'all'}), inActive: !isActive({type:'all', value:'all'})}"
       :style="{height: tabHeight +'px'}">
      <a class='title'>all</a>
      <a class='close'></a>
    </div>

    <div class='tab' v-for="tab in tabs"
      @click="changeActiveTab(tab)"
      :class="{tab: true, active: isActive(tab), inActive: !isActive(tab)}"
      :style="{height: tabHeight +'px'}"
      >
      <a class='title'>{{tab.value}}</a>
      <a class='close'></a>
    </div>
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
  ],
  computed:{
    ...mapGetters([
      'tabHeight',
      'tabBarHeight',
      'activeTab',
    ]),
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
    ...mapActions([
      'changeActiveTab',
    ]),
    isActive: function(tab){
      if(tab.type==this.activeTab.type && tab.value == this.activeTab.value) return true;
      else return false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
