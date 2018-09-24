import * as types from '../mutation-types'

const state = {
  //tabs
  activeTab: {'type':'all', 'value':'all', 'timestamp': 0},

  //reader
  currentReaderContent: {'id': undefined, 'text': undefined},
}

const getters = {
  //tabs
  activeTab: state => state.activeTab,
  activeTabWatcher: state => () => state.activeTab,

  //reader
  currentReaderContent: state => state.currentReaderContent,
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
}

const actions = {
  changeActiveTab({commit}, data){
    commit(types.CHANGE_ACTIVE_TAB, data);
  },
  changeReaderContent({commit}, data){
    console.log("yup");
    commit(types.CHANGE_READER_CONTENT, data);
  },
}
export default {
  state,
  mutations,
  getters,
  actions
}
