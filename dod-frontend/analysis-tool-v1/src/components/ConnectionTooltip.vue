<template>
  <div class="connectionTooltip">
    <a href="#" @click="crossOutNode()">fold in</a>
    <p>{{title}}</p>
  </div>
</template>

<script>


export default {
  name: 'connectionTooltip',
  components: {
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
