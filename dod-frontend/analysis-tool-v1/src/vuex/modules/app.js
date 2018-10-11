import * as types from '../mutation-types'

const state = {
  //tabs
  activeTab: {'type':'all', 'value':'all', 'timestamp': 0},

  //reader
  currentReaderContent: {'id': undefined, 'text': undefined, 'date': undefined},

  //viz Settings
  showVizSettings: false,
  unfoldSharedRelationsByDefault: true,
  sharedRelationsThreshold: 3,
  focusedNode:[],
  
  //tooltip
  //tooltipDims: {width: 130, height:240},
  tooltipDims: {width: 130, height:240},

}

const getters = {
  //tabs
  activeTab: state => state.activeTab,
  activeTabWatcher: state => () => state.activeTab,

  //reader
  currentReaderContent: state => state.currentReaderContent,

  //viz Settings
  showVizSettings: state => state.showVizSettings,
  unfoldSharedRelationsByDefault: state => state.unfoldSharedRelationsByDefault,
  sharedRelationsThreshold: state => state.sharedRelationsThreshold,

  focusedNode: state => state.focusedNode,
  focusedNodeWatcher: state => () => state.focusedNode,

  // tooltip
  tooltipDims: state => state.tooltipDims,
}

const mutations = {
  [types.CHANGE_ACTIVE_TAB] (state, data){
    console.log('changin tab', data);
    state.activeTab = data;
  },
  [types.CHANGE_READER_CONTENT] (state, data){
    console.log('changin reader content', data);
    state.currentReaderContent = data;
  },
  [types.TOGGLE_VIZ_SETTINGS] (state){
    state.showVizSettings = !state.showVizSettings;
  },
  [types.SET_FOCUSED_NODE] (state, data){
    if(data.flag){
      if(!state.focusedNode.includes(data.id)){
        state.focusedNode.push(data.id);
      }
    }else{
      if(state.focusedNode.includes(data.id)){
        let idx = state.focusedNode.indexOf(data.id);
        state.focusedNode.splice(idx, 1);
      }
    }
  },
}

const actions = {
  changeActiveTab({commit}, data){
    commit(types.CHANGE_ACTIVE_TAB, data);
  },
  changeReaderContent({commit}, data){
    commit(types.CHANGE_READER_CONTENT, data);
  },
  toggleVizSettings({commit}){
    commit(types.TOGGLE_VIZ_SETTINGS);
  },
  setFocusedNode({commit}, data){
    commit(types.SET_FOCUSED_NODE, data);
  },
}
export default {
  state,
  mutations,
  getters,
  actions
}
