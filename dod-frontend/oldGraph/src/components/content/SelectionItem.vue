<template>
  <div class="selectionItem" :style="{width: (width-16) + 'px', height: height + 'px'}">
    <div id="left" :style="{width: (width-16-height) + 'px'}">
      <div id="titleWrapper" :style="{height: height/2 + 'px'}">
        <p id="title">{{data.selected.name}}</p>
      </div>
      <div :style="{height: height/2 + 'px'}">
      </div>
    </div>
    <div id="burgerMenuWrapper" :style="{width: height*0.5 +'px'}" >
      <a :class="{'burger': true, 'noOpacity': currentlyDeepSelection} " href="#" @click="toogleDeepselection">
        <div :class="{'burgerBar': true, 'red': currentlyDeepSelection} "></div>
        <div :class="{'burgerBar': true, 'red': currentlyDeepSelection} "></div>
        <div :class="{'burgerBar': true, 'red': currentlyDeepSelection} "></div>
      </a>
      <!--<a class="close" href="#" @click="close">close</a>-->
    </div>
    <div id="closeWrapper" :style="{width: height*0.5 +'px'}" >
      <a class="close" href="#" @click="close"></a>
      <!--<a class="close" href="#" @click="close">close</a>-->
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'SelectionItem',
//  components: {
//    HeadBarWrapper,
//    MainContentWrapper
//  },
  data () {
    return {
    }
  },
  props: [
    'data',
    'width',
    'height',
  ],
	computed: {
    ...mapGetters([
      'deepSelection'
    ]),
    currentlyDeepSelection(){
      return this.deepSelection&&this.deepSelection.selected.uindex == this.data.selected.uindex;
    }
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  beforeDestroy: function () {
  },
  methods: {
    ...mapActions([
      'removeFromSelection',
      'deepSelect',
      'clearDeepSelection'
    ]),
    close(){
      if(this.currentlyDeepSelection){
        this.clearDeepSelection();
      }
      this.removeFromSelection(this.data.selected.uindex)

    },
    toogleDeepselection(){
      console.log(this.data.selected.uindex);
      console.log(this.deepSelection);
      if(this.deepSelection == undefined || this.data.selected.uindex != this.deepSelection.selected.uindex){
        this.deepSelect(this.data.selected.uindex);
      }else{
        this.clearDeepSelection();
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .selectionItem{
    /*
    outline-offset: -2px;
    outline: 2px solid black;
    /**/
    border-radius: 10px;
    margin:4px 8px;
    display: flex;
    flex-direction: row;
    background-color:black;
  }
  .selectionItem div{
    /*
    outline-offset: -2px;
    outline: 2px solid white;
    /**/
  }
  #left{
    display: flex;
    flex-direction: column;
  }
  #titleWrapper{
    overflow-y: hidden;
    overflow-x: scroll;
  }
  #title{
    margin-left: 15px;
    line-height: 5px;
    white-space: nowrap;
    color:white
  }
  #closeWrapper{
    position:relative;
  }
  .close {
    position: absolute;
    /*
    right: 35px;
    top: 35px;
    /**/
    width: 20px;
    height: 20px;
    opacity: 0.3;
  }
  .close:hover {
    opacity: 1;
  }
  .close:before, .close:after {
    position: absolute;
    left: 11px;
    top: 22px;
    content: ' ';
    height: 25px;
    width: 4px;
    background-color: white;
    border-radius: 4px;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
  #burgerMenuWrapper{
    position:relative;
  }
  .burger{
    position: absolute;
    left: 6px;
    top: 22px;
    opacity: 0.3;
  }
  .burgerBar{
    width:20px;
    height:4px;
    background-color:white;
    margin: 3px 0;
    border-radius: 4px;
  }
  .burger:hover {
    opacity: 1;
  }
  .noOpacity{

    opacity: 1;
  }
  .red{
    background-color:red;
  }



</style>
