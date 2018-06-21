<template>
  <div id="firstThrowProject" :style="{width: width + 'px', height: (height-2) + 'px'}">
    <div id="checkboxWrapper" :style="{width: checkboxWrapperWidth + 'px', height: height + 'px'}">
      <div id="checkBox" :class="{ checked: checked, unchecked: !checked }" 
          :style="{
            width: (checkboxWrapperWidth*0.7) + 'px', 
            height: (checkboxWrapperWidth*0.7) + 'px',
            top: (checkboxWrapperWidth*0.15) + 'px',
            left: (checkboxWrapperWidth*0.15) + 'px',
          }"
          @click="clicked"
          >
      </div>

    </div>
    <div id="contentWrapper" :style="{width: (width-checkboxWrapperWidth) + 'px', height: height + 'px'}">
      <div id="headlineWrapper" :style="{height: headlineWrapperHeight + 'px'}">
        <h2 :style="{lineHeight: headlineWrapperHeight +'px'}">{{headline}}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'firstThrowProject',
  data () {
    return {
      checkboxWrapperWidth: 50,
      headlineWrapperHeight: 50,
      checked: false,
    }
  },
  props:[
    'width',
    'height',
    'headline',
  ],
  computed:{
    ...mapGetters([
      'firstThrow'
    ]),
  },
  mounted(){
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions([
      'changeAllProjectSelection'
    ]),
    clicked(){
      console.log("all");  
      this.checked = !this.checked;
      this.changeAllProjectSelection(this.checked);

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#firstThrowProject{
  border: 1px solid black;
}
#checkboxWrapper{
  display: inline-block;
  float:left;
  position:relative;
}
#checkBox{
  position:absolute;
  border: 1px solid black;
  cursor: pointer;
}
.checked{
  background-color: black;
  opacity: 1;
}
.unchecked{
  background-color: white;
  opacity: 1;
}
/*
.unchecked:hover{
  background-color: black;
  opacity: 0.1;
  border: 1px solid black;
}
.checked:hover{
  opacity: 0.8;
  border: 1px solid black;
}
*/
#contentWrapper{
  float:left; 
  display: inline-block;
}
#headlineWrapper h2{
  font-size:1em;
  margin:0;
  margin-left:30px;
  font-family: sans-serif;
}
#infoWrapper{
}
#fullText{
  margin-left:30px;
  overflow: scroll;
  border-left: 1px solid black;
}
#fullText p{
  font-family: sans-serif;
  margin-left:10px;

}
</style>

