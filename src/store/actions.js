import api from "@/api/idb";
import db from "@/api/db";

export default {
  addWordToDB({ commit }, word) {
    return api.saveWord(word);
  },

  async getWords({ commit }) {
    let words = await api.getWords();
    commit("SET_WORDS", words);
  },

  async getWordsDexie() {
    return db.worddb;
  },

  async deleteWordFromDB({ commit }, id) {
    return api.deleteWord(id);
  },

  async setSavingWord({commit}, obj) {
    return commit("SET_SAVING_WORD", obj);
  },

  async clearSavingWord({commit}) {
    return commit("CLEAR_SAVING_WORD");
  },

  async setSelectedIDWordSecond({commit}, id) {
    return commit("SET_SELECTED_ID_WORD_SECOND", id);
  },

  async clearSelectedIDWordSecond({commit}) {
    return commit("CLEAR_SELECTED_ID_WORD_SECOND", 0);
  },

  async setSelectedWord({ commit }, id) {
    return commit("SET_SELECTED_WORD", id);
  },

  async clearSelectedWord({ commit }) {
    return commit("CLEAR_SELECTED_WORD");
  },

  async clearCompareWord({ commit }) {
    return commit("CLEAR_COMPARE_WORD");
  },
};
