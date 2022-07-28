import { onMounted } from "vue";
import { useStore } from "vuex";

export function useWords() {
  const store = useStore();

  const getWords = async () => {
    store.dispatch("getWords");
  };

  onMounted(getWords);

  return {
    getWords,
  };
}
