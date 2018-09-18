<template>
  <div id="layout" 
    :style="{height: height+'px', width: width+'px'}">

    <div class='main-col-1 main-col'
       :style="{width: leftColPerc*width-resizeElementWidth/2+'px'}">

      <div class='main-col-1-row-1 main-col-1-row'
         :style="{height: searchBarHeight+'px'}">
        <slot name="search"></slot>
      </div>

      <div class='main-col-1-row-2 main-col-1-row'
         :style="{height: height-readerHeight-searchBarHeight-resizeElementWidth/2+'px'}">
        <slot name="pane"></slot>
      </div>
      
      <div class='reader-resize main-col-1-row' @click="toggleReaderHeight"
         :style="{height: resizeElementWidth+'px'}">

        <span class="arrow-down"
              :style="{left: (leftColPerc*width)/2 - arrowWidth + 'px',
                      top: resizeElementWidth/2-arrowWidth/2 + 'px',
                      borderStyle: 'none solid solid solid', 
                      borderWidth: '0px ' + arrowWidth+'px '+ arrowWidth+'px ' + arrowWidth+'px ',
                      transform: 'rotate('+  ((readerHeight/readerMaxHeight)*180)   +'deg)'
                      }">
        </span>
      </div>

      <div class='main-col-1-row-3 main-col-1-row' v-show='readerHeight == readerMaxHeight'
         :style="{height: readerHeight - resizeElementWidth/2 +'px'}">
        <slot name="reader"></slot>
      </div>

    </div>

    <div class='main-col-resize main-col' @click='toggleLeftColWidth'
       :style="{width: resizeElementWidth +'px'}">
      <span class="arrow-left"
            :style="{left: resizeElementWidth/2-(arrowWidth/2)+'px',
                    top: height/2-arrowWidth+'px',
                    borderStyle: 'solid solid solid none', 
                    borderWidth: arrowWidth+'px '+ arrowWidth+'px ' + arrowWidth+'px ' + '0px',
                    transform: 'rotate('+  ((1-(leftColPerc-0.3)*5)*180)   +'deg)'
                    }">
      </span>
    </div>


    <div class='main-col-2 main-col'
       :style="{width: (1.0-leftColPerc)*width-resizeElementWidth/2+'px'}">
      <slot name="viz"></slot>
    </div>

  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

import {TweenMax} from "gsap";
//TweenLite.to(this.$data, 0.5, { xPosition: val });

export default {
  name: 'layout',
  components: {
  },
  data () {
    return {
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),

      leftColPerc: 0.5,
      unwatchLeftColPercGoal: undefined,
      
      readerHeight: 0,
      unwatchReaderHeightGoal: undefined,


    }
  },
  props:[
  ],
  computed:{
    ...mapGetters([
      'resizeElementWidth', 
      'arrowWidth', 
      'searchBarHeight',
      'readerMaxHeight',
    ]),
  },
  mounted(){
    window.addEventListener('resize', this.handleResize)
    this.unwatchLeftColPercGoal = this.$store.watch(this.$store.getters.leftColPercGoalWatcher, leftColPercGoal => {
      TweenLite.to(this.$data, 0.5, { leftColPerc: leftColPercGoal  });
    });
    this.unwatchReaderHeightGoal = this.$store.watch(this.$store.getters.readerHeightGoalWatcher, readerHeightGoal => {
      TweenLite.to(this.$data, 0.5, { readerHeight: readerHeightGoal  });
    });
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
    this.unwatchLeftColPercGoal();
    this.unwatchReaderHeightGoal();
  },
  methods: {
    ...mapActions([
      'changeLeftColPerc', 
      'changeReaderHeight',
    ]),
    handleResize(){
      this.width =  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    },
    toggleLeftColWidth(){
      if(this.leftColPerc<0.5){
        this.changeLeftColPerc(0.5); 
      }else{
        this.changeLeftColPerc(0.3); 
      }
    },
    toggleReaderHeight(){
      if(this.readerHeight<this.readerMaxHeight){
        this.changeReaderHeight(this.readerMaxHeight); 
      }else{
        this.changeReaderHeight(0); 
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #layout{
    display: flex;
    outline: red 1px dotted;
    outline-offset: -1px;
  }
  .main-col{
    outline: blue 1px dotted;
  }
  .main-col-resize{
    position:relative;
  }
  .main-col-resize:hover .arrow-left{
    border-color: transparent black transparent;
  }
  .arrow-left{
    border-color: transparent #bcbcbc transparent;
    width: 0;
    height: 0;
    position: absolute;
  }


  .main-col-1{
    display:flex;
    flex-direction: column;
  }
  .main-col-1-row{
    outline: green 1px dotted;
  }
  .reader-resize{
    position:relative;
  }
  .arrow-down{
    border-color: transparent transparent #bcbcbc transparent;
    width: 0;
    height: 0;
    position: absolute;
  }


</style>
