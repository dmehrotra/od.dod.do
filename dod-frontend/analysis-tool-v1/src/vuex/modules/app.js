import * as types from '../mutation-types'
//import * as d3 from 'd3';
//import * as _ from 'lodash';
//import api from '../api.js'

const state = {
  //departments: [],
  firstThrow: undefined,

}

const getters = {
  //origGraph: state => state.graph,
  //graphNodesWatcher: state => () => state.graph.nodes,
  firstThrow: state => state.firstThrow,
  


}

const mutations = {
  [types.FIRST_THROW] (state, data) {
    state.firstThrow = data;
  },
  //[types.CHANGE_DEEP_SELECTION] (state, deepSelection) {
    //state.deepSelection = deepSelection;
  //},
}

const actions = {
  //addToSelection ({commit, state}, newSelection) {
    ////this makes sure nothing is selected twice
    //let selectedAlready = false;
    //state.selection.forEach(d=>{
      //if(d.selected.uindex==newSelection.selected.uindex) selectedAlready = true;
    //});
    //if(!selectedAlready) commit(types.ADD_TO_SELECTION, newSelection);	
  //},
  setFirstThrow ({commit}, data) {
    commit(types.FIRST_THROW, data);	
  },
}
export default {
  state,
  mutations,
  getters,
  actions
}
