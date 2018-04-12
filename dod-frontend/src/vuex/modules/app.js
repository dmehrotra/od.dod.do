import * as types from '../mutation-types'
//import * as d3 from 'd3';
//import * as _ from 'lodash';
//import api from '../api.js'

const state = {
  //departments: [],
  selection: []
}

const getters = {
  //origGraph: state => state.graph,
  //graphNodesWatcher: state => () => state.graph.nodes,
  selection: state => state.selection,
  currentSelectionWatcher: state => () => state.selection,


}

const mutations = {
  [types.CLEAR_SELECTION] (state) {
    state.selection = [];
  },
  [types.ADD_TO_SELECTION] (state, data) {
    state.selection.unshift(data);
  },
}

const actions = {
  clearSelection ({commit}) {
    commit(types.CLEAR_SELECTION);	
  },
  addToSelection ({commit, state}, newSelection) {
    //this makes sure nothing is selected twice
    let selectedAlready = false;
    state.selection.forEach(d=>{
      if(d.selected.uindex==newSelection.selected.uindex) selectedAlready = true;
    });
    if(!selectedAlready) commit(types.ADD_TO_SELECTION, newSelection);	
  },
}
export default {
  state,
  mutations,
  getters,
  actions
}
