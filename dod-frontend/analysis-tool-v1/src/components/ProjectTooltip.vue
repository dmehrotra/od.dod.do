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
      <a href="#" @click="changeReader">{{node.id==currentReaderContent.id?'Hide':'Show'}}</a>
      <a href="#" @click="unselectFromGraph">Graph</a>

  </div>
</template>

<script>


import TooltipScrollingLine from '@/components/TooltipScrollingLine'
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'projectTooltip',
  components: {
    TooltipScrollingLine
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
  ],
  computed:{
    ...mapGetters([
      'currentReaderContent',
      'readerMaxHeight',
      'readerHeightGoal',
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
      num = String(num);
      let rem = num.length%3;
      let idx = 0;
      let out = "";
      while(idx < num.length){
        if(idx>0){
          out += ","+num.slice(idx, rem);
        }else{
          out += num.slice(idx, rem);
        }

        idx = rem;
        rem += 3;
      }
      return out;
    },
    changeReader: function(){
      // here should be a function to navigate autimatically to the node in the pane when this is clicked
      //
      //
      //
      //
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p{
  }
  .projectTooltip{
  }
</style>
