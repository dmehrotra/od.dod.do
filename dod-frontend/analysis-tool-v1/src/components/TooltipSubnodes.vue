<template>
  <div class="tooltip-subnodes">
    <p class='caption'>
      subnodes:
    </p>
    <div class='subnode-box'>

      <tooltip-subnodes-list-element
         :idArray="currentNode.relationships.map(r=>r.id)"
        :name="'all'"
        :setSubnode=setSubnode
        :isVisible=isVisible
      >
      </tooltip-subnodes-list-element>

      <tooltip-subnodes-list-element
        v-for="subnode in currentNode.relationships"
        :idArray=[subnode.id]
        :name=subnode.title
        :setSubnode=setSubnode
        :isVisible=isVisible
      >
      </tooltip-subnodes-list-element>

      <!--<p v-for="subnode in currentNode.relationships">-->
      <!--{{subnode.title}}-->
      <!--</p>-->
    </div>
  </div>
</template>

<script>

import TooltipSubnodesListElement from '@/components/TooltipSubnodesListElement'

export default {
  name: 'tooltipSubnodes',
  components: {
    TooltipSubnodesListElement,
  },
  data () {
    return {
    }
  },
  props:[
    'currentNode',
    'setSubnode',
  ],
  computed:{
  },
	watch: {
  },
  mounted(){
    
  },
  beforeDestroy: function () {
  },
  methods: {
    isVisible: function(id){
      let relationship = this.currentNode.relationships.find(r=>r.id ==id);

      if(relationship){
        return relationship.visible;
      }else{
        return false;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tooltip-subnodes{
    margin-top:8px;
  }
  p{
    color: white;
    font-size: 0.7em;
    font-family: sans-serif;
    margin:0;
  }
  .subnode-box{
    background-color:white;
    height:130px;
    overflow:scroll;

  }
</style>
