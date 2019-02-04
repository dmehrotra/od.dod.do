<template>
  <div class="connectionTooltip">
    <a href="#" @click="crossOutNode()">fold in</a>
    <tooltip-name
      :name=title
    >
    </tooltip-name>
  </div>
</template>

<script>

import TooltipName from '@/components/TooltipName'

export default {
  name: 'connectionTooltip',
  components: {
    TooltipName,
  },
  data () {
    return {
    }
  },
  props:[
    'title',
    'crossOutNode',
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
.connectionTooltip{
  width:100%;
}
  p{
    color: white;

  }
</style>
