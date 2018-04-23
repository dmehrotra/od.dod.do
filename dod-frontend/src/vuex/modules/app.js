import * as types from '../mutation-types'
//import * as d3 from 'd3';
//import * as _ from 'lodash';
//import api from '../api.js'

const state = {
  //departments: [],
  selection: [],
  deepSelection: undefined

}

const getters = {
  //origGraph: state => state.graph,
  //graphNodesWatcher: state => () => state.graph.nodes,
  selection: state => state.selection,
  currentSelectionWatcher: state => () => state.selection,

  deepSelection: state => state.deepSelection,
  


}

const mutations = {
  [types.CLEAR_SELECTION] (state) {
    state.selection = [];
  },
  [types.ADD_TO_SELECTION] (state, data) {
    state.selection.unshift(data);
  },
  [types.REMOVE_FROM_SELECTION] (state, uindex) {
    state.selection = state.selection.filter(d=>d.selected.uindex!=uindex);
  },
  [types.CHANGE_DEEP_SELECTION] (state, deepSelection) {
    state.deepSelection = deepSelection;
  },
  [types.CLEAR_DEEP_SELECTION] (state) {
    state.deepSelection = undefined;
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
  removeFromSelection ({commit, state}, uindex) {
    commit(types.REMOVE_FROM_SELECTION, uindex);	
  },
  deepSelect({commit, state}, uindex) {
    state.selection.forEach(d=>{
      if(d.selected.uindex== uindex){
        console.log(d);
        commit(types.CHANGE_DEEP_SELECTION, d);	

      }
    });
  },
  clearDeepSelection ({commit, state}) {
    commit(types.CLEAR_DEEP_SELECTION);	
  },
}
export default {
  state,
  mutations,
  getters,
  actions
}
