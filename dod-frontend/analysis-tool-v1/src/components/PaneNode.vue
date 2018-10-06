<template>
  <div class="paneNode" @mouseover=mouseOver @mouseout=mouseOut>
    <div class='title'
        title='Filing date of this press release'
        :style="{height: paneItemHeight + 'px', width: leftTitleWidth +'px'}"
      ><p>{{getDate(data.filing_date)}}</p>
    </div>
    <div class='paneNodeMain' 
       :style="{width: minPaneItemWidth - leftTitleWidth + 'px', height: paneItemHeight +'px'}"
      >
        <a class='close' title='Delete this press reslease from the pane and graph' @click="deleteNode"></a>

        <div class='paneNodeTopSection'
         :style="{width: minPaneItemWidth - leftTitleWidth + 'px'}"
         >
         <p title='Number of subnodes currently on the graph that are connected to this filing.' class='visibleConnectionsCounter' v-show='visibleConnections.length>0'>
          {{visibleConnections.length}}
         </p>

        </div>

        <div 
          :class='{paneNodeOptions: true, focused: data.id==focusedNode}'
         :style="{width: paneNodeMainWidth + 'px', height: paneNodeOptionsHeight + 'px',
           }"
         >

           <!--
             READER!!!
           -->

           <div 
             :class="{paneNodeOptionItem: true, active: currentReaderContent.id == data.id, inactive: currentReaderContent.id != data.id}"
             :style="{
                  width: paneNodeMainWidth + 'px', 
                  height: paneNodeOptionHeight + 'px',
                  marginBottom: paneNodeOptionsMargin+'px',
                  }"
           >
              <div class='paneNodeOptionItemInner'
                   title='Show the full text of this project'
                   :style="{
                      margin: 'auto',
                      height: paneNodeOptionHeight + 'px',
                      width: paneNodeOptionHeight + 'px',
                    }"
                    @click=changeReader
        
              >

                  <svg xmlns="http://www.w3.org/2000/svg" data-name="Livello 1" viewBox="0 1 24 30" x="0px" y="0px"><g data-name="eye"><circle cx="12" cy="11.88" r="3"/><path d="M12,4A13,13,0,0,0,0,12a13,13,0,0,0,24,0A13,13,0,0,0,12,4Zm0,12.88a5,5,0,1,1,5-5A5,5,0,0,1,12,16.88Z"/></g></svg>

              </div>

           </div>

           <!--
             END READER!!!
           -->
           <!--
             GRAPH!!!
           -->

           <div
             :class="{paneNodeOptionItem: true, active: data.selected, inactive: !data.selected}"
             :style="{
                  width: paneNodeMainWidth + 'px', 
                  height: (paneNodeOptionsHeight-(paneNodeOptionsMargin*(numOptions-1)))/numOptions+'px',
                  marginBottom: paneNodeOptionsMargin+'px',
                  }"
             >
              <div class='paneNodeOptionItemInner'
                   title='Toggle the graph view for this project'
                   :style="{
                      margin: 'auto',
                      height: paneNodeOptionHeight + 'px',
                      width: paneNodeOptionHeight + 'px',
                      }"
                   @click=toggleGraphSelect
              >

                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="2 7 92 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M79.3,30.2c6.1,0,11-4.9,11-11c0-6.1-4.9-11-11-11c-6.1,0-11,4.9-11,11c0,2.7,1,5.1,2.5,7L57.4,40.5  c-1.9-1.6-4.4-2.6-7.1-2.6c-2.7,0-5.1,0.9-7,2.5L29.8,27.9c0.6-1.1,1-2.3,1-3.7c0-4-3.3-7.3-7.3-7.3c-4,0-7.3,3.3-7.3,7.3  c0,4,3.3,7.3,7.3,7.3c1.6,0,3.1-0.6,4.4-1.5l13.5,12.5c-1.3,1.8-2,4-2,6.3c0,2.6,0.9,5,2.4,6.9L26.9,71.5c-1.8-1.3-4-2.1-6.4-2.1  c-6.1,0-11,4.9-11,11c0,6.1,4.9,11,11,11c6.1,0,11-4.9,11-11c0-2.6-0.9-5-2.4-6.9l14.8-15.7c1.7,1.3,3.9,2,6.2,2.1L52,77.1  c-3.7,1.1-6.4,4.4-6.4,8.4c0,4.9,3.9,8.8,8.8,8.8s8.8-3.9,8.8-8.8c0-4.7-3.7-8.5-8.3-8.8L53,59.6c2-0.5,3.9-1.6,5.3-3.1l13.7,9.9  c-0.4,0.9-0.7,1.9-0.7,3c0,4,3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3c0-4-3.3-7.3-7.3-7.3c-1.9,0-3.6,0.7-4.9,1.9L60,54.1  c0.8-1.5,1.3-3.3,1.3-5.2c0-2.3-0.7-4.4-1.9-6.2L73,28.3C74.8,29.5,76.9,30.2,79.3,30.2z"/></svg>

              </div>
           </div>

           <!--
             END GRAPH!!!
           -->

           <div class='paneNodeOptionItem'
             :style="{
                  width: paneNodeMainWidth + 'px', 
                  height: (paneNodeOptionsHeight-(paneNodeOptionsMargin*(numOptions-1)))/numOptions+'px',
                  }"
             >
              <div class='paneNodeOptionItemInner'
                   title='Open the full text of this project in a new window'
                   :style="{
                      margin: 'auto',
                      height: paneNodeOptionHeight + 'px',
                      width: paneNodeOptionHeight + 'px',
                      }"
              >

                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 62.5" style="enable-background:new 0 0 50 50;" xml:space="preserve"><g><path d="M1,49h36.9V12.1H1V49z"/><polygon points="12.1,1 12.1,10.1 39.9,10.1 39.9,37.9 49,37.9 49,1  "/></g></svg>

              </div>
           </div>
        </div>

    </div>
  </div>
</template>

<script>


import {mapGetters, mapActions} from 'vuex';


export default {
  name: 'paneNode',
  components: {
  },
  data () {
    return {
      leftTitleWidth: 20,
      paneNodeOptionsMargin: 5,
      numOptions: 3,
      unwatchFocus: undefined,
    }
  },
  props:[
    'data',
    'deleteNode',
    'toggleGraphSelect',
    'visibleConnections',
  ],
  computed:{
    ...mapGetters([
      'paneItemHeight',
      'minPaneItemWidth',
      'readerMaxHeight',
      'readerHeightGoal',
      'currentReaderContent',
      'focusedNode',
    ]),
    paneNodeMainWidth: function(){
      return this.minPaneItemWidth - this.leftTitleWidth;
    },
    paneNodeOptionsHeight: function(){
      return this.paneNodeMainWidth*0.8;
    },
    paneNodeOptionHeight: function(){
      return (this.paneNodeOptionsHeight-(this.paneNodeOptionsMargin*(this.numOptions-1)))/this.numOptions;
    }
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
    ...mapActions([
      'changeReaderContent',
      'changeReaderHeight',
      'setFocusedNode',
    ]),
    mouseOver(){
      this.setFocusedNode({id: this.data.id, flag:true});
    },
    mouseOut(){
      this.setFocusedNode({id: this.data.id, flag:false});
    },
    changeReader: function(){
      if(this.currentReaderContent.id == this.data.id && this.readerHeightGoal == this.readerMaxHeight){
        this.changeReaderHeight(0);
        this.changeReaderContent({id: undefined, text: undefined, date: undefined});
      }else{
        this.changeReaderHeight(this.readerMaxHeight);
        this.changeReaderContent({id: this.data.id, text: this.data.full_text, date: this.data.filing_date});
      }
    },
    getDate(d){
      d = new Date(d);
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 

      return d.getFullYear() + " " + months[d.getMonth()]

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .paneNode{
    display: flex;
    flex-flow: row wrap;
  }
  .title{
    outline: 1px solid black;
    white-space: nowrap;
    overflow: hidden;
    padding-top:8px;
    padding-left:2px;
    text-align:center;
    box-sizing: border-box;
  }
  .title p{
    margin: 0;
    font-family: sans-serif;
    transform: rotate(90deg);
    font-size: 12px;
    font-weight: bold; 
  }

  .paneNodeMain{
    position:relative;
  }
  .close {
    right: 5px;
    top: 4px;
    width: 12px;
    height: 12px;
    opacity: 0.05;
    position: absolute;
    z-index:1;
  }
  .close:before, .close:after {
    position: absolute;
    left: 7px;
    content: ' ';
    height: 12px;
    width: 2px;
    background-color: black;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
  
  .paneNodeTopSection{
    /*
    outline: black 1px solid;
    /**/
    height:  24px;
    padding-left:4px;
    box-sizing: border-box;
    opacity:0.15;
  }
  .visibleConnectionsCounter{
    margin-top: 0;
    font-family: sans-serif;
    font-size: 12px;
    font-weight: bold; 
    cursor: default;
    display:inline;
  }

  .paneNodeOptions{
    /*
    display: grid;
    padding-left:6px;
    box-sizing: border-box;
    outline: black 1px solid;
    /**/

  }
  .paneNodeOptionItem{
    /*
    outline: black 1px solid;
    /**/
    text-align: center;
  }
  .paneNodeOptionItem a{
    font-family: sans-serif;
    font-size:12px;
  }
  .paneNodeOptionItemInner{
    /*
    background-color:red;
    /**/
  }
  svg{
    opacity: 0.05;
  }
  .paneNodeOptionItem:hover svg{
    opacity: 1;
  }
  .paneNodeOptionItemInner{
    cursor: pointer;
  }
  .focused .close{
    opacity:0.4;
  }
  .focused svg{
    opacity:0.4;
  }
  .active svg{
    opacity: 1;
    /*
    fill: #18ca18;
    /**/
    fill: red;
  }
  .focused .paneNodeTopSection{
    opacity: 0.4;
  }
  .close:hover{
    opacity: 1;
    cursor: pointer;
  }
</style>

