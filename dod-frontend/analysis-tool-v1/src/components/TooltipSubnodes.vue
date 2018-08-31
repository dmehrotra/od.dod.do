<template>
  <div class="tooltip-subnodes">
    <p class='caption'>
      subnodes:
    </p>
    <div class='subnode-box'>

      <tooltip-subnodes-list-element
        :id="33"
        :name="'all'"
        :visible=true
        :setSubnode=setSubnode
      >
      </tooltip-subnodes-list-element>

      <tooltip-subnodes-list-element
        v-for="subnode in currentNode.relationships"
        :id=subnode.id
        :name=subnode.title
        :visible=subnode.visible
        :setSubnode=setSubnode
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
