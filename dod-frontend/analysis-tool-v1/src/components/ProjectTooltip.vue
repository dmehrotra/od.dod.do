<template>
  <div class="projectTooltip">

    <tooltip-name
      :name=currentNode.id
    >
    </tooltip-name>
    <tooltip-top-buttons
      :id=currentNode.id
      :crossOutNode=crossOutNode
      :unselectProject=unselectProject
    >
    </tooltip-top-buttons>
    <tooltip-subnodes
      :currentNode=currentNode
      :setSubnode=setSubnode
    >
    </tooltip-subnodes>



  </div>
</template>

<script>


import TooltipTopButtons from '@/components/TooltipTopButtons'
import TooltipName from '@/components/TooltipName'
import TooltipSubnodes from '@/components/TooltipSubnodes'
export default {
  name: 'projectTooltip',
  components: {
    TooltipTopButtons,
    TooltipName,
    TooltipSubnodes,
  },
  data () {
    return {
    }
  },
  props:[
    'currentNode',
    'crossOutNode',
    'unselectProject',
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
  p{
    color: white;
  }
  .projectTooltip{
  }
</style>
