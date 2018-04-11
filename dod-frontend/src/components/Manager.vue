<template>
  <div id="header-wrapper">
    <div id="name-wrapper" class="menu-box">
      <p><b>dod.sexy</b></p>
    </div>
    <div id="query-menu-wrapper" class="menu-box">
      <a @click="request('http://javantiger.club:3232/ww/0/0')">Request, Baby</a>
      <br>
      <a @click="request('http://javantiger.club:3232/ww/9165dc36-38e7-11e8-9bd7-ca63c3c41426/0')">Request, Army</a>
      <br>
      <a @click="clearSelection">clear selection</a>
    </div>
  </div>
</template>

<script>
import api from '@/vuex/api'
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'Manager',
  methods:{
    ...mapActions([
      'clearSelection'
    ]),
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
  #header-wrapper{
    /*
    flex-grow:1;
    */
    height: 80px;
    border: black solid 1px;
    display:flex;
  }
  .menu-box{
    width:50%;
    padding-left:20px;
  }
</style>
