<template>
  <div id="search" :style="{height: height +'px'}">
    <input ref="searchBar"></input>
    <button @click="searchRequest">Search</button>
  </div>
</template>

<script>

export default {
  name: 'search',
  components: {
 //   FirstThrowRequester,
  },
  data () {
    return {
    }
  },
  props:[
    'letMotherSearch',
    'height'
  ],
  computed:{
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
    searchRequest(){
      this.letMotherSearch(this.$refs.searchBar.value);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
