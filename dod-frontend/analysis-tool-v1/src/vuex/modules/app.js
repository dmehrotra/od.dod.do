import * as types from '../mutation-types'
//import * as d3 from 'd3';
//import * as _ from 'lodash';
//import api from '../api.js'

const state = {
  //departments: [],
  firstThrow: undefined,
  selection: [],
}

const getters = {
  //origGraph: state => state.graph,
  firstThrow: state => state.firstThrow,
  selectionWatcher: state => () => state.selection,
  getProjectById: (state) => (id) => {
    return state.firstThrow.connections[0].find(d => d.id === id)
  }


}

const mutations = {
  [types.FIRST_THROW] (state, data) {
    state.firstThrow = data;
  },
  [types.TOGGLE_PROJECT_SELECTION] (state, id) {
    state.firstThrow.connections[0].filter(d=>d.id==id).forEach(d=>{
      d.selected = !d.selected;
      if(d.selected){
        state.selection.push(d.id);
      }else{
        let index = state.selection.indexOf(d.id);
        if (index > -1) {
          state.selection.splice(index, 1);
        }
      }
    })
  },
  [types.CHANGE_ALL_PROJECT_SELECTION] (state, flag){
    state.firstThrow.connections[0].forEach(d=>{
      d.selected = flag;
      let index = state.selection.indexOf(d.id);
      if (index > -1) {

        if(!d.selected){
          state.selection.splice(index, 1);
        }
      }else{

        if(d.selected){
          state.selection.push(d.id);
        }
      }

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
