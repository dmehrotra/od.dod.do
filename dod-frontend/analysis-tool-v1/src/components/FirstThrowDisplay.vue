<template>
  <div id="firstThrowDisplay" :style="{width: width + 'px', height: height + 'px', display: 'inline-block', float: 'left'}">
      <div id="headlineWrapper" :style="{width: width + 'px', height: headlineWrapperHeight+'px'}">
        <h3>"first throw projects"</h3>
      </div>

      <div id="checkAllWrapper" :style="{width: width + 'px', height: (checkAllWrapperHeight)+'px'}">

        <first-throw-project-show-all
           :width="width"
           :height="checkAllWrapperHeight"
           :headline="'un/check all projects'"
        ></first-throw-project-show-all>
      </div>
      <div id="firstThrowProjectsList" :style="{width: width + 'px', height: (height-checkAllWrapperHeight-headlineWrapperHeight-12)+'px'}">
        <first-throw-project v-for="project in firstThrow.connections[0]"
           :width="width"
           :height="300"
           :headline="project.id"
           :project="project"
        ></first-throw-project>
      </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

import FirstThrowProject from '@/components/FirstThrowProject'
import FirstThrowProjectShowAll from '@/components/FirstThrowProjectShowAll'

export default {
  name: 'firstThrowDisplay',
  components: {
    FirstThrowProject,
    FirstThrowProjectShowAll,
  },
  data () {
    return {
      checkAllWrapperHeight:50,
      headlineWrapperHeight:80
    }
  },
  props:[
    'width',
    'height',
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
#firstThrowDisplay{
  background-color: white;
  display: inline-block;
  float:left;
}
#firstThrowRequester p{
  margin: 0; 
}
#checkboxWrapper{
  display: inline-block;
  background-color: blue;
  float:left;
}
#firstThrowProjectsList{
  overflow: scroll;
  border: 3px black solid;
}
#checkAllWrapper{

  border: 3px black solid;
}
#headlineWrapper h3{
  margin:0;
}
</style>

