<template>
  <div id="datePicker" :style="{height: searchBarHeight +'px'}" :class="{searching: searching}">
    <v-date-picker mode='range' :popoverVisibility="popoverVisibility" popoverAlign='right' 
       class="datePickerComponent"
       :style="{paddingTop: searchBarHeight/2 - 25 + 'px'}"
      v-model='myDate'
      @input='newDate'
      @popover-did-disappear="hidePicker"
      >
      <div
      :class="{datePickingBox: true, pickingDate: showPicker}"
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
    <div class="searchByDateButton" v-show=myDate @click=submit>
      <p :class="{textShadow: searching}">{{searching?'searching':'click to search'}}</p>
    </div>

    <div class='message'>
      <p>{{message}}</p>
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
      showPicker: false,
      myDate: undefined,
    }
  },
  props:[
    'dateSearch',
  ],
  computed:{
    ...mapGetters([
      'searchBarHeight',
    ]),
    popoverVisibility: function(){
      if(this.showPicker){
        return 'hover';
      }else{ 
        return 'hidden';
      }
    }
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
    ...mapActions([
      'changeActiveTab',
    ]),
    hidePicker(){
      this.showPicker = false;
      console.log("hide!");
    },
    togglePicker(){
      this.showPicker = true;
      this.message = '';
      console.log("click truerue");
      //this.showPicker=!this.showPicker;
    },
    newDate(){
      //this.showPicker = false;
      console.log("hide!");
    },
    submit(){
      this.searching = true;
      console.log(this.myDate);
      let start = this.myDate.start.getFullYear() + "-" + (this.myDate.start.getMonth()+1) + "-" + this.myDate.start.getDate();
      let end = this.myDate.end.getFullYear() + "-" + (this.myDate.end.getMonth()+1) + "-" + this.myDate.end.getDate();
      console.log(start);
      let query = {'start': start, 'end': end};
      //this.message = '';
      //
      this.dateSearch(query, (res)=>{
        if(res.res == null){
          this.message = "error when searching for '"+res.query+"'"
        }else{
          if(res.res > 0){
            this.changeActiveTab({'type':'dateSearch', 'value':res.query, 'timestamp': res.timestamp});
          }
          this.message = String(res.res) + " results found for '"+res.query+"'"
          this.myDate = undefined;
        }
        this.searching = false;
      });
    },
    //keyup(e){
    //  if(e.keyCode != 13){
    //    this.message = '';
    //    this.searching = false;
    //  }
    //},
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
    text-align: center;
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
    border-radius:1px;

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
  .pickingDate{
    box-shadow: 0 0 5px #f144ff;
  }
</style>
