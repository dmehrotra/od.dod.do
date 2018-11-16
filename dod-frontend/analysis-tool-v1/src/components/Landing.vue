<template>
  <div id="landing" :style="">
    <div class="nav">
      <ul class="main-nav">
          <li><a href="/about">About</a></li>
          <li><a href="/app">Search</a></li>
          
      </ul>
    </div> 
    <div id="header">
    <p>[ OD.DOD.DO is ]
    <p>[ an investigative ] [ an analytic ] [ a meddlesome ]</p>
    <p>[ tool ] [ website ] [ means ] </p>
    <p>[ to ] [ that ]</p>
    <p>[ explore(s) ][ reveal(s) ] [ observe(s) ]  [ interrogate(s) ] [ generate(s) ] [ dissect(s) ] </p>
    <p>[ connections ] [ relationships ] [ conspiracies ] [ networks ] [ hidden structures ]</p>
    <p>[ using ] [ in ]</p>
    <p>[ contract announcements ] [ Pentagon Press Filings ]</p>

      <router-link tag="div" to="/app" id='button'>Search</router-link>
    </div>
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
.nav{
  width:100%;
}
.main-nav{
  float:right;
  width:300px;
}
ul li{
  text-decoration: none;
  text-indent: none;
  float:right;
  margin-right:10px;
}


#landing{
 background: rgb(0,0,0);
  background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(31,38,87,1) 77%, rgba(65,59,91,1) 100%);  
  height: 100vh;
  width: 100vw;
  background-size: cover;
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  margin: 0 auto;
  font-family: sans-serif;
}
#header {
 width:50%;
 margin:auto;
}

h1, p, ul li a {
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1.4em;

}



#button {
  padding: 12px 19px;
  background:transparent;
  color:#fff;
  text-align: center;
  border: 2px solid white;
  font-size: 15px;
  border-radius: 0px;
  transition: all .3s ease;
}

#button:hover {
  background: white;
  color: black;  
}
@media (max-width: 600px) {
  h1 {
      font-size: 40pt;
    }
  p {
    font-size: 10pt;
    font-weight: 300;
  }
}

@media (max-width: 364px) {
  h1 {
      font-size: 30pt;
    }
  p {
    font-size: 10pt;
    font-weight: 300;
  }
}

</style>
