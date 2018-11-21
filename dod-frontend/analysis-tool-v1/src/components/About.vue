<template>
  <div id="about" :style="">
        <div class="nav">
      <ul class="main-nav">
         <li><a href="/">Back</a></li>
          <li><a href="/app">Search</a></li>
          
      </ul>
    </div> 
    <div class="wrapper">
      <h1>About</h1>
      <p>Every day contracts valued $7 million or more are announced by the Department of Defense. These press releases detail the banal logistics of supporting the hundreds of thousand DOD buildings and structures located on more than 5,000 different locations across 30 million acres of land globally. Each release catalogues a contract and a corporate entity to whom that contract was awarded. The release indicates how much money the contract was worth and, generally, what the contract is for - from trousers to radar modules.</p>
      <p>A single release will never reveal conspiracy. Nor will it do too much work to clarify the trajectory of America's Global War on Terror ™. However, our hope is that if taken in aggregate, the relationship between these contract announcements will help us to better understand the phenomena of modern warfare in the United States.</p>
      <h1>Concept</h1>
      <p>The constellation of press releases paints a picture of an industry that’s knotted, tangled, and ultimately unknowable. To engage with this corpus is to chase leads, test conspiracies, and pull on threads until the whole system unravels. This is called fever research - searching urgently for what you know is there but that you can't name. defense.fish is meant to allow researchers to invent, find, and test conspiracies in press releases.</p>
      <h1>Credits</h1>
      <p><a href="dhruvmehrotra.info">Dhruv Mehrotra</a>, <a href="http://leoneckert.com/">Leon Eckert</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
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


#about{
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
.wrapper{
  width:75%;
  height:80%;
  padding:5px;
  margin:20px auto;
  overflow:scroll;
}
#header {
 width:50%;
 margin:auto;
}

h1, p, ul li a, a {
  color: #fff;
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  line-height: 1.4em;
  font-weight: 300;

}
h1{font-weight: 600;}



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
/* width */
::-webkit-scrollbar {
    width: 0px;
}


</style>
