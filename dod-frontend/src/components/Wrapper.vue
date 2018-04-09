<template>
  <div>
    <Manager
      v-on:input="gotData(arguments)"
    />
    <Viz
      :data="data" 
    />
    <Board/>
  </div>
</template>

<script>
import Manager from '@/components/Manager'
import Viz from '@/components/Viz'
import Board from '@/components/Board'


export default {
  name: 'Wrapper',
  components: {
    Manager,
    Viz,
    Board
  },
  data () {
    return {
      data: []
    }
  },
  methods: {
    gotData(args){
      this.data = args[0];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
