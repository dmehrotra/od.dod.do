<template>
  <div class="pane-node-options">
    <div :class="{ showButton: true, button: true, buttonActive: isActive }" @click="setReaderText({id: data.id, text: data.full_text})">

      <svg :class="{svgwhite: true}" xmlns="http://www.w3.org/2000/svg" data-name="Livello 1" viewBox="0 -3 24 30" x="0px" y="0px"><title>prime</title><g data-name="eye"><circle cx="12" cy="11.88" r="3"/><path d="M12,4A13,13,0,0,0,0,12a13,13,0,0,0,24,0A13,13,0,0,0,12,4Zm0,12.88a5,5,0,1,1,5-5A5,5,0,0,1,12,16.88Z"/></g><text x="0" y="39" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Xicons.co</text><text x="0" y="44" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>
    </div>
    <div :class="{ graphButton: true, button: true, buttonActive: isActive }" @click="toggleSelect(data.id)">

<svg :class="{svgwhite: !data.selected, svgblue: data.selected}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 -10 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M79.3,30.2c6.1,0,11-4.9,11-11c0-6.1-4.9-11-11-11c-6.1,0-11,4.9-11,11c0,2.7,1,5.1,2.5,7L57.4,40.5  c-1.9-1.6-4.4-2.6-7.1-2.6c-2.7,0-5.1,0.9-7,2.5L29.8,27.9c0.6-1.1,1-2.3,1-3.7c0-4-3.3-7.3-7.3-7.3c-4,0-7.3,3.3-7.3,7.3  c0,4,3.3,7.3,7.3,7.3c1.6,0,3.1-0.6,4.4-1.5l13.5,12.5c-1.3,1.8-2,4-2,6.3c0,2.6,0.9,5,2.4,6.9L26.9,71.5c-1.8-1.3-4-2.1-6.4-2.1  c-6.1,0-11,4.9-11,11c0,6.1,4.9,11,11,11c6.1,0,11-4.9,11-11c0-2.6-0.9-5-2.4-6.9l14.8-15.7c1.7,1.3,3.9,2,6.2,2.1L52,77.1  c-3.7,1.1-6.4,4.4-6.4,8.4c0,4.9,3.9,8.8,8.8,8.8s8.8-3.9,8.8-8.8c0-4.7-3.7-8.5-8.3-8.8L53,59.6c2-0.5,3.9-1.6,5.3-3.1l13.7,9.9  c-0.4,0.9-0.7,1.9-0.7,3c0,4,3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3c0-4-3.3-7.3-7.3-7.3c-1.9,0-3.6,0.7-4.9,1.9L60,54.1  c0.8-1.5,1.3-3.3,1.3-5.2c0-2.3-0.7-4.4-1.9-6.2L73,28.3C74.8,29.5,76.9,30.2,79.3,30.2z"/></svg>

    </div>
    <div :class="{ trashButton: true, button: true, buttonActive: isActive }" @click="deleteProject(data.id)">

      <svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 -3 24 30" version="1.1" x="0px" y="0px"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g><rect x="0" y="0" width="24" height="24"/><path :class="{svgwhite: true}" d="M5,6 L5.73274082,20.8571429 C5.73274082,20.8571429 5.99625939,22 6.98958614,22 L11.598019,22 L12.4359159,22 L17.0443487,22 C18.0380944,22 18.301613,20.8571429 18.301613,20.8571429 L19,6 L5,6 Z M15.5,8 L15.5,8 L15.5,8 C15.2205531,8 14.9908183,8.22036187 14.9791847,8.49956654 L14.5208153,19.5004335 L14.5208153,19.5004335 C14.5097883,19.7650799 14.7153876,19.9885573 14.980034,19.9995842 C14.9866857,19.9998614 14.9933425,20 15,20 L15,20 L15,20 C15.2794469,20 15.5091817,19.7796381 15.5208153,19.5004335 L15.9791847,8.49956654 L15.9791847,8.49956654 C15.9902117,8.23492012 15.7846124,8.01144271 15.519966,8.00041578 C15.5133143,8.00013862 15.5066575,8 15.5,8 Z M9.47918818,19.5003499 L9.02097843,8.49965006 L9.02097843,8.49965006 C9.00934688,8.22039979 8.77957571,8 8.50008331,8 L8.50008331,8 L8.50008331,8 C8.23515945,8 8.02039624,8.21476322 8.02039624,8.47968707 C8.02039624,8.48634356 8.02053479,8.49299933 8.02081182,8.49965006 L8.47902157,19.5003499 L8.47902157,19.5003499 C8.49065312,19.7796002 8.72042429,20 8.99991669,20 L8.99991669,20 L8.99991669,20 C9.26484055,20 9.47960376,19.7852368 9.47960376,19.5203129 C9.47960376,19.5136564 9.47946521,19.5070007 9.47918818,19.5003499 Z M8.00719509,3 L5.11111111,3 L5.11111111,3 C4.49746139,3 4,3.49746139 4,4.11111111 L4,4.11111111 L4,5 L20,5 L20,4.11111111 C20,3.49746139 19.5025386,3 18.8888889,3 L15.9926121,3 C15.9368649,2.4385197 15.4631369,2 14.8869871,2 L9.11301289,2 C8.99358834,2 8.87494478,2.0192532 8.76164871,2.05701856 C8.33332638,2.19979267 8.04982846,2.57814658 8.00719509,3 Z M12,8 C12.2761424,8 12.5,8.22385763 12.5,8.5 L12.5,19.5 C12.5,19.7761424 12.2761424,20 12,20 C11.7238576,20 11.5,19.7761424 11.5,19.5 L11.5,8.5 C11.5,8.22385763 11.7238576,8 12,8 Z"/></g></g></svg>
    </div>

    <div :class="{ pageButton: true, button: true, buttonActive: isActive }">
      
<svg :class="{svgwhite: true}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 -6 50 62.5" style="enable-background:new 0 0 50 50;" xml:space="preserve"><g><path d="M1,49h36.9V12.1H1V49z"/><polygon points="12.1,1 12.1,10.1 39.9,10.1 39.9,37.9 49,37.9 49,1  "/></g><text x="0" y="65" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Dinosoft Labs</text><text x="0" y="70" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>

    </div>
  </div>
</template>

<script>

//import FirstThrowRequester from '@/components/FirstThrowRequester'
//import FirstThrowDisplay from '@/components/FirstThrowDisplay'

import {mapGetters, mapActions} from 'vuex';


export default {
  name: 'paneNodeOptions',
  components: {
  },
  data () {
    return {
    }
  },
  props:[
    'data',
    'isActive',
    'toggleSelect',
    'deleteProject',
  ],
  computed:{
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
    ...mapActions([
      'setReaderText', 
    ]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pane-node-options{
  display:flex;
}
.button{
  /*
  outline:black solid 1px;
  /**/
  width:25%;
  height: 30px;
  text-align:center;
  position:relative;
}
.button svg{
  height:100%;
  width:100%;
}
.button a{
  font-family: sans-serif;
  font-size:0.5em;
  position:absolute;
}
.blue{
  color: blue;
}
.white{
  color: white;
}
.button:hover{
  cursor: pointer;
  color: #7575ff;
}

.svgblue{
  fill: blue;
}
.svgwhite{
  fill: white;
}
.button:hover svg.svgblue{
  cursor: pointer;
  fill: #7575ff;
}
.button:hover .svgwhite{
  cursor: pointer;
  fill: #cbcbcb;
}
.button:hover a.blue{
  color: #7575ff;
}
.button:hover a.white{
  color: #cbcbcb;
}
</style>

