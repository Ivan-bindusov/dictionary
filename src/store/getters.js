export default {
  inputWordStore(state) {
    const word = state.words.find((item) => item.id == state.selectedIDWord);
    state.word = word?.value;
    state.translate = word?.translate;
    return word;
  },
};
