<template>
  <div class="hello" :style="{position: 'absolute', top: y+'px', left: x+'px'}">
    <p>{{nodeId}}</p>
    <a v-for="type in types" href="#" @click="select(type)">
      {{type}}
    </a>
  </div>
</template>

<script>

export default {
  name: 'tooltip',
  data () {
    return {
    }
  },
  props:[
    'x',
    'y',
    'types',
    'nodeId',

  ],
  methods: {
    select(type){
      console.log("show", type);
      this.$emit('input', {type: "unfoldType", data: {type: type, id: this.nodeId}} );
    }
  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    /*
    width:50px;
    height:100px;
    /**/
    background-color: white;
  }
  .hello a{
    display: block;
  }
</style>

