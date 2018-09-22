<template>
  <div id="search" :style="{height: searchBarHeight +'px'}" :class="{searching: searching}">
    <input class='searchBar' v-on:keyup.13="submit" @keyup="keyup" placeholder='search' autofocus 
       :style="{marginTop: searchBarHeight/2 - 16 + 'px'}">
    <div class='message'>
      <p>{{message}}</p>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'search',
  components: {
  },
  data () {
    return {
      searching: false,
      message: '',
    }
  },
  props:[
    'search',
  ],
  computed:{
    ...mapGetters([
      'searchBarHeight',
    ]),
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
    ...mapActions([
      'changeActiveTab',
    ]),
    keyup(e){
      if(e.keyCode != 13){
        this.message = '';
        this.searching = false;
      }
    },
    submit(e){
      let query = e.target.value;
      this.searching = true;
      this.message = '';
      e.target.blur();
      this.search(query, (res)=>{
        if(res.res == null){
          this.message = "error when searching for '"+res.query+"'"
        }else{
          this.changeActiveTab({'type':'search', 'value':res.query, 'timestamp': res.timestamp});
          this.message = String(res.res) + " results found for '"+res.query+"'"
        }
        this.searching = false;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@keyframes searching { 
    0%{background-position:51% 100%}
    100%{background-position:50% -100%}
}
  #search{
    background: linear-gradient(0deg,#ffffff,#ffffff, #ffffff, #4c53ff, #ffffff);
    background-size: 100% 200%;
    background-position: 50% 100%;

    text-align:center;
  }
  .searching{

    animation: searching 3s linear infinite;
  }
  .searchBar{
    width: 80%;
    font-size:20px;
  }
  .message{
    width: 80%;
    height: 12px;
    margin: auto;
  }
  .message p{
    margin-top: 5px;
    font-family: sans-serif;
    font-size: 12px;
  }
</style>
