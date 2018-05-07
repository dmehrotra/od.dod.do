<template>
  <div id="headControls" :style="">
    <p><a @click="request('http://javantiger.club:3232/ww/0/0')">Request</a></p>
  </div>
</template>

<script>
import api from '@/vuex/api'

export default {
  name: 'headControls',
  data () {
    return {
    }
  },
  props:[
    //'height',
    //'width',
  ],
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
    request(domain){
      api.get(domain)
        .then((response) => {
          this.$emit('input', {type: "graphData", data: response.body.data} );
        })
        .catch((error) => {
          this.$emit('input', {type: "error", data: "apifailure"} );
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #headControls{
  }
  #headControls a{
    text-decoration: underline;
  }
  #headControls a:hover{
    cursor: pointer;
    text-decoration: underline;
    color:red;
  }
</style>
