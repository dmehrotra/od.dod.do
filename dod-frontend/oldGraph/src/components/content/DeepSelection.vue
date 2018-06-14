<template>
  <div id="deepSelection" :style="{width: width + 'px', height: height + 'px'}">
    <div id="bg" :style="{width: width + 'px', height: height + 'px'}">

    </div>
    <div id="contentWrapper" :style="{width: width + 'px', height: height + 'px'}">
      <div id="closeWrapper" :style="{height: closeHeight+'px', width: width + 'px'}">
        <a href="#" @click="clearDeepSelection" class="close"></a>
      </div>
      <div id="titleWrapper" :style="{height: titleHeight+'px'}">
        <p>{{deepSelection.selected.name}}</p>
      </div>
      <div id="connectedToWrapper" :style="{height: (height-(closeHeight+titleHeight))+'px'}">
        <div id="connectedToHeader" :style="{height: (connectedHeaderHeight) + 'px'}">
          <p v-if="deepSelection.selected.type=='Contractor'">...was issued contracts by:</p>
          <p v-else>...issued contracts to:</p>
        </div>
        <div id="connectedToList" :style="{height: (height-(closeHeight+titleHeight+connectedHeaderHeight+footerHeight) )+'px'}">
          <div id="connectedListDescription" :style="{height: 20+'px', width: (width-40)+ 'px' }">
            <p :style="{width: 40+'px', textAlign: 'right'}">COUNT</p>
            <p :style="{width: (width-20-20-40-50-5)+'px', textAlign: 'left', overflowX: 'scroll', overflowY: 'hidden',  whiteSpace: 'nowrap', marginRight: 5 +'px'}">NAME</p>
            <a :style="{width: 50+'px'}" href="#" @click="fetchContracts(deepSelection.selected, node)">fetch</a>

          </div>
          <div id="connectedToItem" v-for="(node, i) in deepSelection.connections" :style="{height: 20+'px', width: (width-40)+ 'px' }">
            <p :style="{width: 40+'px', textAlign: 'right'}">{{node.strength}}</p>
            <p :style="{width: (width-20-20-40-50-5)+'px', textAlign: 'left', overflowX: 'scroll', overflowY: 'hidden',  whiteSpace: 'nowrap', marginRight: 5 +'px'}">{{node.name}}</p>
            <a :style="{width: 50+'px'}" href="#" @click="fetchContracts(deepSelection.selected, node)">fetch</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import MainRightWrapper from '@/components/layouts/MainRightWrapper'
///import MainContentWrapper from '@/components/layouts/MainContentWrapper'

import {mapGetters, mapActions} from 'vuex';
import api from '@/vuex/api'

export default {
  name: 'deepSelection',
//  components: {
//    HeadBarWrapper,
//    MainContentWrapper
//  },
  data () {
    return {
      closeHeight: 40,
      titleHeight: 60,
      connectedHeaderHeight: 28,
      footerHeight:20
    }
  },
  props:[
    'width',
    'height'
  ],
	computed: {
    ...mapGetters([
      'deepSelection'
    ])
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
    ...mapActions([
      'clearDeepSelection'
    ]),
    fetchContracts(node1, node2){
      let dept = node1.type == "Department"?node1.uindex:node2.uindex;
      let cont = node1.type == "Department"?node2.uindex:node1.uindex;
      
      let req = "http://javantiger.club:3232/c/"+dept+"/"+cont;

      api.get(req)
        .then((response) => {
          console.log("CONTRACTS!", response);
        })
        .catch((error) => {
          console.log("couldnt get contracts");
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #bg{
    background-color:black;
    opacity:0.8;
  }
  #deepSelection{
  }
  #deepSelection div{
    /*
    outline: 1px solid white;
    outline-offset: -1px;
    /**/
  }
  #contentWrapper{
    top:0;
    left:0;
    position:absolute;
    display:flex;
    flex-direction: column;
    color: white;
  }
  p{
    margin:0
  }
  #titleWrapper p{
    margin-left: 20px;
    font-size:1.4em;
  }
  #connectedToHeader p{
    margin-left: 20px;
  }
  #connectedToList p{
    margin-left: 20px;
  }
  #connectedToList{
    overflow: scroll;
  }
  #connectedToItem{
    display: flex;
  }
  #connectedListDescription{
    display: flex;
  }
  #closeWrapper{
    /*   
    outline: 1px solid white;
    outline-offset: -1px;
    /**/
    position:relative;
  }
  .close {
    position: absolute;
    
    right: 10px;
    top: 10px;
    /**/
    width: 20px;
    height: 20px;
    opacity: 1;
  }
  .close:hover {
    opacity: 0.7;
  }
  .close:before, .close:after {
    position: absolute;
    /*
    right: 11px;
    top: 22px;
    /**/
    content: ' ';
    height: 25px;
    width: 4px;
    background-color: red;
    border-radius: 4px;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
  /**/
  
</style>
