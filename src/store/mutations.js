export default {
  SET_WORDS(state, words) {
    state.words = words;
  },
  SET_SAVING_WORD(state, obj) {
    if(obj.id) {
      const word = state.words.find((item) => item.id == obj.id);
      for (let key in word) {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = word[key];
        }
      }
      state.savingWord = obj;
    } else {
      state.savingWord = obj;
    }
  },
  CLEAR_SAVING_WORD(state) {
    state.savingWord = {};
  },
  SET_SELECTED_ID_WORD(state, id) {
    state.selectedIDWord = id;
  },
  SET_SELECTED_ID_WORD_SECOND(state, id) {
    state.selectedIDWordSecond = id;
  },
  CLEAR_SELECTED_ID_WORD_SECOND(state) {
    state.selectedIDWordSecond = 0;
  },
  SET_SELECTED_WORD(state, id) {
    state.selectedIDWord = id;
    const w = state.words.find((item) => item.id == id);
    state.word = w.value;
    state.translate = w.translate;
    state.rating = w.rating || 0;
    state.oldWord = w.value;
    state.oldTranslate = w.translate;
  },
  CLEAR_SELECTED_WORD(state) {
    state.selectedIDWord = 0;
    state.word = '';
    state.translate = '';
    state.rating = 0;
    state.oldWord = '';
    state.oldTranslate = '';
    state.compareWord = true;
  },
  CLEAR_COMPARE_WORD(state) {
    state.compareWord = true;
  }
};
