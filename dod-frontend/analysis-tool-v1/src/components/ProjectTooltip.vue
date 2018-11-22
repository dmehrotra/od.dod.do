<template>
  <div class="projectTooltip">

    <!--title-->
    
      <div class='header'>
        <TooltipScrollingLine
          :width=width
          :text=getDate(node.filing_date)
          :fontSize=12
          :style='{fontWeight:"bold"}'
         />
        <TooltipScrollingLine
          :width=width
          :text="'$'+formatThousands(node.amount)"
          :fontSize=12
         />
      </div>
      <div class='mainButtons'
       :width="{width: width + 'px'}"
       >
        <div class='mainButton'>
          <a href="#" @click="changeReader">{{node.id==currentReaderContent.id?'Hide':'Show'}}</a>

                <!--<svg xmlns="http://www.w3.org/2000/svg" data-name="Livello 1" viewBox="0 1 24 30" x="0px" y="0px"><g data-name="eye"><circle cx="12" cy="11.88" r="3"/><path d="M12,4A13,13,0,0,0,0,12a13,13,0,0,0,24,0A13,13,0,0,0,12,4Zm0,12.88a5,5,0,1,1,5-5A5,5,0,0,1,12,16.88Z"/></g></svg>-->
        </div>
        <div class='mainButton'>
          <a href="#" @click="unselectFromGraph">Graph</a>
        </div>
        <div class='mainButton'>
          <a href="#" @click="">fix</a>
        </div>
      </div>
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
  }
  .mainButton{
    width: 33%;
    border-right: 1px black solid;
    cursor: pointer;
  }
  .mainButton:hover{
    background-color:#bfbfbf;
  }
  .mainButton:last-child{
    border-right: none;
  }

  p{
  }
  .projectTooltip{
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
</style>
