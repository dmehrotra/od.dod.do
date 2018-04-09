<template>
  <div id="boardWrapper">
    <p><b>Board</b></p>
    <div v-for="node in selection" class="selectionWrapper">
      <p><b>{{node.selected.name}}</b></p>
      <a href="#">See All of {{node.selected.name}}'s contracts</a>
      <p>-> connected to:</p>
      <div class="connectedToWrapper">
        <div v-for="node2 in node.connections" class="connectedToIndividualWrapper">
          <p>{{node2.name}}</p><a href="#">See contracts between {{node2.name}} and {{node.selected.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'Board',
  methods:{
  },
	computed: {
    ...mapGetters([
      'selection'
    ]),
  }
  //data () {
  //  return {
  //    msg: ''
  //  }
  //}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#boardWrapper{
  width: 39%;
  height:900px;
  border: solid black;
  display: inline-block;
  overflow:scroll;
}
.selectionWrapper{
  width: 90%;
  border: solid black;
}
.connectedToWrapper{
  width: 80%;
  border: solid blue;
}
.connectedToIndividualWrapper{
  width: 100%;
  border: solid red;
}
</style>
