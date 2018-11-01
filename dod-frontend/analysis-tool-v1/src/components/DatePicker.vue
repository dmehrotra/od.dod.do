<template>
  <div id="datePicker" :style="{height: searchBarHeight +'px'}" :class="{searching: searching}">
    <v-date-picker mode='range' :popoverVisibility="'hover'" popoverAlign='right' :attributes.popover="{visibility: 'hidden'}"
       class="datePickerComponent"
       :style="{paddingTop: searchBarHeight/2 - 30 + 'px'}"
      show-popover="false"
      v-model='myDate'
      >
      <div
         class="datePickingBox"
         slot-scope='{inputValue, updateValue}' 
         :style="{}"
         @click="togglePicker"
         >
         <p class="datePickingText"
         
            :style="{color: myDate?'black':'#757575'}"
         >

          {{myDate==undefined?'search by date': inputValue}}
         </p>
      </div>
    </v-date-picker>
    <div class="searchByDateButton" v-show=myDate @click=searchByDate>
      <p :class="{textShadow: searching}">{{searching?'searching':'click to search'}}</p>
    </div>
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
      showPicker: true,
      myDate: undefined,
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
    togglePicker(){
      this.showPicker=!this.showPicker;
    },
    searchByDate(){
      this.searching = true;
    },
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


  .datePickerComponent{
    width: 80%;
    margin: auto;
  }
  .datePickingBox{
    text-align:center;
    font-family: sans-serif;
    width: 100%;
    height: 25px;
    font-size: 19px;
    padding-top:3px;
    
    outline: #cbcbcb 1px solid;
    white-space: nowrap;
    overflow: hidden;
    background-color:white;

  }
  .datePickingText{
    margin:0;
  }
  .searchByDateButton{
    text-align: center;
    width:80%;
    margin:auto;
    cursor: pointer;
  }
  .searchByDateButton p{
    margin:0;
    text-align:center;
    font-family: sans-serif;
    height: 24px;
    font-size: 17px;
    padding-top:4px;
    color: #f144ff;
  }
  .searchByDateButton:hover p{
    text-shadow: 0 0 2px #f144ff;
  }
  .textShadow{
    text-shadow: 0 0 2px #f144ff;
  }
</style>
