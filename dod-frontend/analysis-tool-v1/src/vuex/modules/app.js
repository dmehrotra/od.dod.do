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
  [types.TOGGLE_PROJECT_SELECTION] (state, id) {
    state.firstThrow.connections[0].filter(d=>d.id==id).forEach(d=>{
      d.selected = !d.selected;
    })
  },
  [types.CHANGE_ALL_PROJECT_SELECTION] (state, flag){
    state.firstThrow.connections[0].forEach(d=>{
      d.selected = flag;
    })
  },
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
    data.connections[0].forEach(d=>{
      d.selected = false;
    });
    commit(types.FIRST_THROW, data);	
  },
  toggleProjectSelection({commit}, id){
    commit(types.TOGGLE_PROJECT_SELECTION, id);
  },
  changeAllProjectSelection({commit}, flag){
    commit(types.CHANGE_ALL_PROJECT_SELECTION, flag);
  }
}
export default {
  state,
  mutations,
  getters,
  actions
}
