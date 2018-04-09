<template>
  <div>
    <p><b>Manager</b></p>
    <a @click="request('http://javantiger.club:3232/ww/0/0')">Request, Baby</a>
    <br>
    <a @click="request('http://javantiger.club:3232/ww/9165dc36-38e7-11e8-9bd7-ca63c3c41426/0')">Request, Army</a>
  </div>
</template>

<script>
import api from '@/vuex/api'
export default {
  name: 'Manager',
  methods:{
    request(domain){
      api.get(domain)
        .then((response) => {
          this.$emit('input', response.body.data );
          //console.log(response);
        })
        .catch((error) => console.log('API_FAILURE'));
    }
  }
  //data () {
  //  return {
  //    msg: ''
  //  }
  //}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
