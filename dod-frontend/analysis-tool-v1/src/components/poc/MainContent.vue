<template>
  <div class="hello">
    <div id="stepOne" :style="{height: '50px'}">
      <p><b>1. Place Projects</b></p>
      <p><a @click="request('https://quagga.club/api/connected/f2417820-c489-4636-8a8e-30502919da04', 'projects')" href="#">Projects connected to <b>NAVY</b></a></p>
      <p><a @click="request('https://quagga.club/api/connected/a49f1502-df09-48b7-adb6-e61ea3098523', 'projects')" href="#">Projects connected to <b>Saudi Arabia</b></a></p>
      <p><a @click="request('https://quagga.club/api/connected/02e2d78e-9a56-46c3-8a8a-33b791d59e4f', 'projects')" href="#">Projects connected to <b>Boeing</b></a></p>
      
    </div>
    <div id="stepTwo" :style="{height: '50px'}">
      <p><b>2. Apply to all visible projects</b></p>
      <p><a @click="actionForAllNodes('ProvinceOrState')" href="#">Unfold <b>PrivinceOrState</b></a></p>
      <p><a @click="actionForAllNodes('socialTag')" href="#">Unfold <b>socialTag</b></a></p>
      <p><a @click="actionForAllNodes('Position')" href="#">Unfold <b>Position</b></a></p>
    </div>
    <div id="Viz" >
      <viz
         :width="(width)"
         :height="(height - 100)"
         :graphData="projects"
          ref="vizComponent"
      />
    </div>

  </div>
</template>

<script>
import api from '@/vuex/api'
import Viz from '@/components/Viz'

export default {
  name: 'mainContent',
  components: {
    Viz
  },
  data () {
    return {
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
      projects: undefined,
    }
  },
  mounted(){
    window.addEventListener('resize', this.handleResize)
    setTimeout(()=>{
      this.request('https://quagga.club/api/connected/f2417820-c489-4636-8a8e-30502919da04', 'projects');
    }, 1000);
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    request(domain, note){
      api.get(domain)
        .then((response) => {
          //this.$emit('input', {type: "graphData", data: response.body.data} );
          if(note == 'projects'){
            console.log(response);
            this.projects = response.body;
          }

        })
        .catch((error) => {
          console.log("ERROR with API"); 
          //this.$emit('input', {type: "error", data: "apifailure"} );
        });
    },
    handleResize(){
      this.width =  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    },
    actionForAllNodes(type){
      this.$refs.vizComponent.unfoldAll(type);
    },


  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-family: Helvetica;
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#stepOne{
  border: dotted black 2px;
}
#stepOne p{
  display: inline;
  margin-right: 10px;
}
#stepTwo{
  border: dotted black 2px;
}
#stepTwo p{
  display: inline;
  margin-right: 10px;
}
</style>
