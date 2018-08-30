<template>
  <div class="projectTooltip">
    <a href="#" @click="unselectProject(id)">unselect</a>
    <a href="#" @click="crossOutNode()">delete</a>
    <p>{{id}}</p>


  </div>
</template>

<script>


export default {
  name: 'projectTooltip',
  components: {
  },
  data () {
    return {
    }
  },
  props:[
    'id',
    'crossOutNode',
    'unselectProject',
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
