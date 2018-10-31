<template>
  <div id="datePicker" :style="{height: searchBarHeight +'px'}" :class="{searching: searching}">
    <v-date-picker mode='range'>
      <input 
        slot-scope='{inputValue, updateValue}' 
        readonly 
        type='text' 
        :value='inputValue' 
        @change.native='updateValue($event.target.value)'
        ></input>
    </v-date-picker>
  </div>
</template>

<script>
//import VueRangedatePicker from 'vue-rangedate-picker'
//import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'

import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'search',
  components: {
 //   VueRangedatePicker,
  //    AirbnbStyleDatepicker,
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
  #datePicker{
    background: linear-gradient(0deg,#ffffff,#ffffff, #ffffff, #4c53ff, #ffffff);
    background-size: 100% 200%;
    background-position: 50% 100%;

    /*
    text-align:center;
    /**/
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
