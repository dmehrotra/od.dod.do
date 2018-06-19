<template>
  <div id="firstThrowProject" :style="{width: width + 'px', height: (height-2) + 'px'}">
    <div id="checkboxWrapper" :style="{width: checkboxWrapperWidth + 'px', height: height + 'px'}">
      <div id="checkBox" class="unchecked" 
          :style="{
            width: (checkboxWrapperWidth*0.7) + 'px', 
            height: (checkboxWrapperWidth*0.7) + 'px',
            top: (checkboxWrapperWidth*0.15) + 'px',
            left: (checkboxWrapperWidth*0.15) + 'px',
          }">
      </div>

    </div>
    <div id="contentWrapper" :style="{width: (width-checkboxWrapperWidth) + 'px', height: height + 'px'}">
      <div id="headlineWrapper" :style="{height: headlineWrapperHeight + 'px'}">
        <h2 :style="{lineHeight: headlineWrapperHeight +'px'}">{{headline}}</h2>
      </div>
      <div id="infoWrapper" :style="{width: (width-checkboxWrapperWidth)+'px'}" v-if="project">
        <div id="fullText" :style="{width: 0.7*(width-checkboxWrapperWidth)+'px', height: (height-headlineWrapperHeight-22) +'px'}" v-if="project">


          <p>{{project.full_text}}</p>
        </div>
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
    }
  },
  props:[
    'width',
    'height',
    'headline',
    'project',
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
    ]),
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
}
.checked{
  background-color: black;
}
.unchecked{
  background-color: white;
}
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

