<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

// helper function:
// learned here: https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


export default {
  name: 'App'
}
</script>

<style>
body{
  overflow: hidden;
  margin:0;
  width:100%;
  height:100%;
}
#app {

  width:100%;
  height:100%;
  /*
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  /**/
}

</style>
