<template>
  <div class="connectionTooltip">

    <!--title-->
    
      <div class='header'>
        <TooltipScrollingLine
          :width=width
          :text=node.title
          :fontSize=12
          :alwaysScroll=true
          :style='{fontWeight:"bold"}'

         />
        <!--<p class='moneyValue'>{{'$'+formatThousands(node.amount)}}</p>-->
        <!--<TooltipScrollingLine-->
          <!--:width=width-->
          <!--:text="'$'+formatThousands(node.amount)"-->
          <!--:fontSize=12-->
         <!--/>-->
      </div>
      <div class='mainButtons'
       :width="{width: width + 'px'}"
      >
      <div>
        <a href="#" @click="foldNodeIn">unfold this subnode</a>
        <br></br>
        <a href="#" @click="createTabBySubnode(node.id, node.title)">create new Tab with nodes (from pane) connected to this one</a>
        <br></br>
        <a href="#" @click="selectNodesBySubnode(node.id)">show connected projects from pane on graph</a>
        <br></br>
        <a href="#">query all nodes connected to this (put into tab, graph those with min connections)</a>
        <br></br>
        <a href="#">toggle name display</a>
        <br></br>
        <a href="#">color mark</a>
      </div>

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
    'setSubnode',
    'createTabBySubnode',
    'selectNodesBySubnode',
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
    foldNodeIn(){
      this.closeTooltip();
      this.setSubnode(this.node.id, false)
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
    /*
    overflow:hidden;
    /**/
  }

</style>
