import * as types from '../mutation-types'

const state = {
  // layout 
  searchBarHeight: 80,
  paneWidthPercentage: 40,
  readerHeight: 210,
  currentReaderHeight: 210,
  currentReaderId: '',
  currentReaderText: '',
  
}

const getters = {
  // layout 
  searchBarHeight: state => state.searchBarHeight,
  paneWidthPercentage: state => state.paneWidthPercentage,
  currentReaderHeight: state => state.currentReaderHeight,
  readerText: state => state.currentReaderText,

}

const mutations = {
  [types.TOGGLE_READER_HEIGHT] (state, data) {
    state.currentReaderHeight = state.readerHeight - state.currentReaderHeight;
  },
  [types.SET_READER_TEXT] (state, data) {
    if(state.currentReaderId == data.id){
      state.currentReaderHeight = 0;
    }else{
      state.currentReaderHeight = state.readerHeight;
      state.currentReaderId = data.id;
      state.currentReaderText = data.text;
    }
  },
}

const actions = {
  toggleReader ({commit}, data){
    commit(types.TOGGLE_READER_HEIGHT);	
  },
  setReaderText ({commit}, data){
    commit(types.SET_READER_TEXT, data);	
  },
}
export default {
  state,
  mutations,
  getters,
  actions
}
