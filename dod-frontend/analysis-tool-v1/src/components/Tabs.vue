<template>
  <div id="tabs" :style="{height: tabHeight +'px'}">
    <div class='tab' v-if='tabs.length>0'
       @click="changeActiveTab({type:'all', value:'all'})"
       :class="{tab: true, active: isActive({type:'all', value:'all'})}">
      <a class='title'>all</a>
    </div>

    <div class='tab' v-for="tab in tabs"
      @click="changeActiveTab(tab)"
      :class="{tab: true, active: isActive(tab)}"
      >
      <a class='title'>{{tab.value}}</a>
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
    border-style: none dotted dotted dotted;
    border-color: green;
    border-width: 1px;
    cursor: pointer;
  }
  .tab:hover .title{
    opacity: 0.6;
  }
  .active{
    border-style: none dotted none dotted;
  }
  .title{
    font-family: sans-serif;
    font-size: 12px;
  }
  .active .title{
    font-weight: bold;
  }
</style>
