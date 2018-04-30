<template>
  <div id="headControls" :style="">
    <p><a @click="request('http://javantiger.club:3232/ww/0/0')">Request</a></p>
  </div>
</template>

<script>
//import MainRightWrapper from '@/components/layouts/MainRightWrapper'
///import MainContentWrapper from '@/components/layouts/MainContentWrapper'
import api from '@/vuex/api'

export default {
  name: 'headControls',
//  components: {
//    HeadBarWrapper,
//    MainContentWrapper
//  },
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
        .catch((error) => console.log('API_FAILURE'));
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
