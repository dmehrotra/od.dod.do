<template>
  <div id="landing" :style="">
    <div class="nav">
      <ul class="main-nav">
          <li><a href="/about">About</a></li>
          <li><a href="/app">Search</a></li>
          
      </ul>
    </div> 
    <div id="header">
    <p><span class="selected">[ OD.DOD.DO is ]</span>
    <p><span>[ an investigative ]</span> <span class="selected">[ an analytic ]</span> <span>[ a meddlesome ]</span></p>
    <p><span class="selected">[ tool ]</span> <span>[ website ]</span> <span>[ means ]</span> </p>
    <p><span >[ to ]</span> <span class="selected">[ that ]</span></p>
    <p><span>[ explore(s) ]</span><span class="selected">[ reveal(s) ]</span> <span>[ observe(s) ]</span>  <span>[ interrogate(s) ]</span> <span>[ generate(s) ]</span> <span>[ dissect(s) ]</span> </p>
    <p><span>[ connections ]</span> <span>[ relationships ]</span> <span class="selected">[ conspiracies ]</span> <span>[ networks ]</span> <span>[ hidden structures ]</span></p>
    <p><span>[ using ]</span> <span class="selected">[ in ]</span></p>
    <p><span class="selected">[ Department of Defense Contract Announcements ]</span> <span>[ Pentagon Press Filings ]</span></p>

      <router-link tag="div" to="/app" id='button'>Search the Database</router-link>
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
setInterval(function() {

  var rows = document.querySelectorAll("#header p");
  [].forEach.call(rows, function(row) {
    var spans = row.querySelectorAll("span");
    [].forEach.call(spans,function(span){
      if (span.classList[0] == "selected"){
        span.classList.remove("selected");
      }
    })
    var select = spans[Math.floor(Math.random()*spans.length)];
    select.classList.add("selected")
  }); 
},5000)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav{
  width: 100%;
  position: absolute;
  top: 0px;
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
.selected{
  color:white;
  opacity:1;
}
p span{

  color:#767F91;
  opacity:.5;
    -webkit-transition: all 1s ease-out;
    -moz-transition: all 1s ease-out;
    -o-transition: all 1s ease-out;
    transition: all 1s ease-out;
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
 width:75%;
 margin:auto;
}

h1, p, ul li a {
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
    font-size: 20px;
  line-height: 1.5em;

}



#button {
  padding: 12px 19px;
  background:transparent;
  color:#fff;
  text-align: center;
  border: 2px solid white;
  font-size: 15px;
  max-width:300px;
  margin:60px 0px;
  border-radius: 0px;
  transition: all .3s ease;
}

#button:hover {
  background: white;
  color: black;  
}
@media (max-width: 1100px) {
  h1 {
      font-size: 40pt;
    }
  p {
    font-size: 15pt;
    font-weight: 300;
    line-height: 1em;
  }
}

@media (max-width: 364px) {
  h1 {
      font-size: 30pt;
    }
  p {
    font-size: 15pt;
    font-weight: 300;
    line-height: 1em;
  }
}

</style>
