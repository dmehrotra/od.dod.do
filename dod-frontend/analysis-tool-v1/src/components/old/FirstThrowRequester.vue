<template>
  <div id="firstThrowRequester" :style="{width: width + 'px', height: height + 'px'}">
      <p><a @click="request('https://quagga.club/api/connected/f2417820-c489-4636-8a8e-30502919da04', 'projects')" href="#">Get projects connected to <b>NAVY</b></a></p>
      <p><a @click="request('https://quagga.club/api/connected/a49f1502-df09-48b7-adb6-e61ea3098523', 'projects')" href="#">Get projects connected to <b>Saudi Arabia</b></a></p>
      <p><a @click="request('https://quagga.club/api/connected/02e2d78e-9a56-46c3-8a8a-33b791d59e4f', 'projects')" href="#">Get projects connected to <b>Boeing</b></a></p>
  </div>
</template>

<script>
import api from '@/vuex/api'
import {mapGetters, mapActions} from 'vuex';


export default {
  name: 'firstThrowRequester',
  data () {
    return {
    }
  },
  props:[
    'width',
    'height',
  ],
  mounted(){
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions([
      'setFirstThrow'
    ]),
    request(domain, note){
      api.get(domain)
        .then((response) => {
          console.log("got data", response.body); 
          this.setFirstThrow(response.body);
        })
        .catch((error) => {
          console.log("ERROR with API"); 
        });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#firstThrowRequester{
  background-color: white;
  text-align: center;
}
#firstThrowRequester a{
  margin: 0; 
  font-family: Helvetica;
  font-size:2em;
  color:blue;
}
</style>

