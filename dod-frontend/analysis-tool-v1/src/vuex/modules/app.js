import * as types from '../mutation-types'

const state = {
  //tabs
  activeTab: {'type':'all', 'value':'all', 'timestamp': 0},
}

const getters = {
  //tabs
  activeTab: state => state.activeTab,
  activeTabWatcher: state => () => state.activeTab,
}

const mutations = {
  [types.CHANGE_ACTIVE_TAB] (state, data){
    console.log('changin tab', data);
    state.activeTab = data;
  },
}

const actions = {
  changeActiveTab({commit}, data){
    commit(types.CHANGE_ACTIVE_TAB, data);
  },
}
export default {
  state,
  mutations,
  getters,
  actions
}
