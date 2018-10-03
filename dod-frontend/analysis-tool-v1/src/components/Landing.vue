<template>
  <div id="landing" :style="">
    <h1>defense.fishing</h1>
    <p><i>"The most defective method possible would be to approach warfare and the phenomena of armed violence in terms of the ends pursued and not by the nature of the means employed."</i></p>
    <p>Grégoire Chamayo</p>
    <router-link tag="div" to="/app" id='button'>
       <p>go fishing</p>
    </router-link>
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
#landing{
  width:500px;
  margin: 0 auto;
  margin-top: 30px;
  text-align: center;
  font-family: sans-serif;
}
h1{
  margin-bottom: 50px;
}
#pane{
  overflow: scroll;
}
#button{
  width: 400px;
  margin: 0 auto;
  margin-top: 60px;
  border: solid 1px black;
  border-radius: 10px;
  background-color: black;
  cursor: pointer;
}
#button p{
  color: white;
  text-weight: bold; 
}

</style>
