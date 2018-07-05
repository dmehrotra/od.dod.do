<template>
  <div id="pane" :style="{height:height+'px'}">
    this is the landing page with explanation and stuff
     <p>
      <router-link to="/app">Go to Foo</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  components: {
  },
  data () {
    return {
    }
  },
  props:[
  ],
  computed:{
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
div{
  outline: 1px solid black;
}
#pane{
  overflow: scroll;
}

</style>
