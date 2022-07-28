import { useStore } from 'vuex'

export function useAddStore() {
  const store = useStore();

  const addWordStore = async () => {
    let resAdd;
    let compare = false;

    store.state.words.forEach((item) => {
      if(store.state.selectedIDWord != item.id) {
        if (item.value == store.state.word) {
          compare = true;
        }
      }
    });

    if (compare) {
      resAdd = new Promise((resolve, reject) => {
        reject("Such word is exists");
      });
    } else if (Object.keys(store.state.savingWord).length) {

      resAdd = store.dispatch("addWordToDB", {...store.state.savingWord});

    } else if (!store.state.word || !store.state.translate) {

      resAdd = new Promise((resolve, reject) => {
        reject("Fill all fields");
      });

    } else {
      if (store.state.selectedIDWord) {
        resAdd = store.dispatch("addWordToDB", {
          id: store.state.selectedIDWord,
          value: store.state.word,
          translate: store.state.translate,
          rating: store.state.rating || 0,
        });
      } else {
        resAdd = store.dispatch("addWordToDB", {
          value: store.state.word,
          translate: store.state.translate,
          rating: store.state.rating || 0,
        });
      }
    }
    return resAdd;
  };

  return {
    addWordStore,
  };
}
