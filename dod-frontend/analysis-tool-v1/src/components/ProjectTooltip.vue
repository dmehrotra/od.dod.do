<template>
  <div class="projectTooltip">

    <!--title-->
    
      <div class='header'>
        <TooltipScrollingLine
          :width=width
          :text=getDate(node.filing_date)
          :fontSize=12
          :alwaysScroll=false
          :style='{fontWeight:"bold"}'
         />
        <p class='moneyValue'>{{'$'+formatThousands(node.amount)}}</p>
        <!--<TooltipScrollingLine-->
          <!--:width=width-->
          <!--:text="'$'+formatThousands(node.amount)"-->
          <!--:fontSize=12-->
         <!--/>-->
      </div>
      <div class='mainButtons'
       :width="{width: width + 'px'}"
       :title="currentReaderContent.id==node.id?
          'Hide the full text of this project': 
          'Show the full text of this project' 
        "
       >
        <div class='mainButton' @click="changeReader" >
          <div :class="{iconHolder: true, active: currentReaderContent.id==node.id}">
              <svg xmlns="http://www.w3.org/2000/svg" data-name="Livello 1" viewBox="0 -6 24 30" x="0px" y="0px"><g data-name="eye"><circle cx="12" cy="11.88" r="3"/><path d="M12,4A13,13,0,0,0,0,12a13,13,0,0,0,24,0A13,13,0,0,0,12,4Zm0,12.88a5,5,0,1,1,5-5A5,5,0,0,1,12,16.88Z"/></g></svg>
          </div>
        </div>
        <div class='mainButton' @click="unselectFromGraph">
          <div class="iconHolder active">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="2 -14 92 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M79.3,30.2c6.1,0,11-4.9,11-11c0-6.1-4.9-11-11-11c-6.1,0-11,4.9-11,11c0,2.7,1,5.1,2.5,7L57.4,40.5  c-1.9-1.6-4.4-2.6-7.1-2.6c-2.7,0-5.1,0.9-7,2.5L29.8,27.9c0.6-1.1,1-2.3,1-3.7c0-4-3.3-7.3-7.3-7.3c-4,0-7.3,3.3-7.3,7.3  c0,4,3.3,7.3,7.3,7.3c1.6,0,3.1-0.6,4.4-1.5l13.5,12.5c-1.3,1.8-2,4-2,6.3c0,2.6,0.9,5,2.4,6.9L26.9,71.5c-1.8-1.3-4-2.1-6.4-2.1  c-6.1,0-11,4.9-11,11c0,6.1,4.9,11,11,11c6.1,0,11-4.9,11-11c0-2.6-0.9-5-2.4-6.9l14.8-15.7c1.7,1.3,3.9,2,6.2,2.1L52,77.1  c-3.7,1.1-6.4,4.4-6.4,8.4c0,4.9,3.9,8.8,8.8,8.8s8.8-3.9,8.8-8.8c0-4.7-3.7-8.5-8.3-8.8L53,59.6c2-0.5,3.9-1.6,5.3-3.1l13.7,9.9  c-0.4,0.9-0.7,1.9-0.7,3c0,4,3.3,7.3,7.3,7.3s7.3-3.3,7.3-7.3c0-4-3.3-7.3-7.3-7.3c-1.9,0-3.6,0.7-4.9,1.9L60,54.1  c0.8-1.5,1.3-3.3,1.3-5.2c0-2.3-0.7-4.4-1.9-6.2L73,28.3C74.8,29.5,76.9,30.2,79.3,30.2z"/></svg>
          </div>
        </div>
        <!--<div class='mainButton'>-->
          <!--<a href="#" @click="">fix</a>-->
        <!--</div>-->
      </div>

      <p class='subnodeHeadline'>relations</p>
      <div class='subnodesDisplayWrapper'
           :style="{height: 125 + 'px'}"
        >
        <ul class='subnodeList'
           :style="{width: width + 'px', borderBottom: '1px grey solid'}"
          >
          <tooltip-subnodes-list-element 
            :idArray="node.relationships.map(r=>r.id)"
            :name="'all'" 
            :width=width
            :height=19
            :isVisible=isVisible
            :setSubnode=setSubnode
            :backgroundColor="'#e4e4e4'"
            :style='{fontWeight:"bold"}'
            />
        </ul>
        <ul class='subnodeList'
           :style="{width: width + 'px', height: (125 - 19) + 'px'}"
           
          >
          <tooltip-subnodes-list-element 
            v-for="subnode in node.relationships"
            :idArray="[subnode.id]"
            :name="subnode.title" 
            :width=width
            :height=19
            :isVisible=isVisible
            :setSubnode=setSubnode
            :backgroundColor="'white'"
            />
        </ul>

          
          

      </div>

  </div>
</template>

<script>


import TooltipScrollingLine from '@/components/TooltipScrollingLine'
import TooltipSubnodesListElement from '@/components/TooltipSubnodesListElement'
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'projectTooltip',
  components: {
    TooltipScrollingLine,
    TooltipSubnodesListElement,
  },
  data () {
    return {
    }
  },
  props:[
    'node',
    'width',
    'closeTooltip',
    'toggleGraphSelect',
    'setSubnode',
  ],
  computed:{
    ...mapGetters([
      'currentReaderContent',
      'readerMaxHeight',
      'readerHeightGoal',
      'tooltipDims',
    ]),
  },
	watch: {
  },
  mounted(){
  },
  beforeDestroy: function () {
  },
  methods: {
    ...mapActions([
      'changeReaderContent',
      'changeReaderHeight',
      'changeActiveTab',
    ]),
    unselectFromGraph(){
      this.closeTooltip();
      this.toggleGraphSelect();
    },
    getDate(d){
      d = new Date(d);
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 

      //return d.getFullYear() + " " + months[d.getMonth()] + " " + d.getDate()
      return  months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();

    },
    formatThousands(num){
      // from: https://stackoverflow.com/a/6786040
      let str = num.toString().split('.');
      if (str[0].length >= 5) {
          str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
      }
      if (str[1] && str[1].length >= 5) {
          str[1] = str[1].replace(/(\d{3})/g, '$1 ');
      }
      return str.join('.');
    },
    changeReader: function(){
      // here should be a function to navigate autimatically to the node in the pane when this is clicked
      //
      //
      //
      this.changeActiveTab({type:'graph', value:'graph', timestamp:0})
      //
      //
      if(this.currentReaderContent.id == this.node.id && this.readerHeightGoal == this.readerMaxHeight){
        this.changeReaderHeight(0);
        this.changeReaderContent({id: undefined, text: undefined, date: undefined});
      }else{
        this.changeReaderHeight(this.readerMaxHeight);
        this.changeReaderContent({id: this.node.id, text: this.node.full_text, date: this.node.filing_date});
      }
    },
    isVisible: function(id){
      let relationship = this.node.relationships.find(r=>r.id ==id);
      console.log("checking isVisible");
      if(relationship){
        console.log(relationship);
        return relationship.visible;
      }else{
        return false;
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mainButtons{
    height: 30px;
    display: flex;
    border: black 1px solid;
    border-radius: 4px;
    margin-top: 5px;
    margin-bottom: 5px;
    overflow:hidden;
  }
  .mainButton{
    width: 50%;
    border-right: 1px black solid;
    cursor: pointer;
    text-align:center;
  }
  .iconHolder{
    width:29%;
    margin: auto;
  }
  .mainButton:hover{
    background-color:#f0f0f0;
  }
  .mainButton:last-child{
    border-right: none;
  }

  p{
  }
  .projectTooltip{
  }
  .subnodeHeadline{
    margin:0;
    font-family: sans-serif;
    font-size:9px;
    font-weight:bold;
    text-align:center;
  }
  .subnodesDisplayWrapper{
    border: 1px black solid;
    border-radius: 4px;
    overflow: hidden;
  }
  .subnodeList{
    padding: 0;
    margin: 0;
    list-style:none;
    overflow:scroll;
  }
  .active svg{
    fill: red
  }
  .moneyValue{
    margin:0;
    font-family:sans-serif;
    font-size:12px;
  }
</style>
