import GlobalState from "../src/global-state";

const stateDefault = {
  books: [],
};

const mutations = {
  removeBook(state, index) {
    state.book.splice(0, index);
  },
  addBook(state, data) {
    state.book.push(data);
  },
};

const actions = {
  actionTest({ commit }, data) {
    commit('addBook', data);
  },
};

const { Provider, StateContext } = new GlobalState({
  state: stateDefault,
  mutations,
  actions,
}).init();

export { Provider, StateContext };
