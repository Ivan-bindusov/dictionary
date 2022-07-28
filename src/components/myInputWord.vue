<template>
  <form @submit.prevent action="">

    <div class="row sm-gutter q-pa-sm">

      <div class="col-xs-12 col-sm-6">
        <q-input
          outlined
          v-model="value"
          @keyup="enterWord"
          @keyup.right="focusTranslate"
          label="Enter word"
          ref="word"
          class="q-ml-sm q-pb-sm"
          clearable
          clear-icon="close"
        />
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-input
          outlined
          v-model="translate"
          @keyup="enterTranslate"
          @keyup.left="focusWord"
          label="Enter translate"
          ref="translate"
          class="q-ml-sm"
          clearable
          clear-icon="close"
        />
      </div>

    </div>

    <div class="row justify-center" v-if="!this.$store.state.selectedIDWord || this.$store.state.compareWord">
      <q-btn
          @click="addWord"
          color="secondary"
          glossy
      >Add word</q-btn>
    </div>

    <div v-else class="row justify-center">
      <q-btn color="secondary" @click="addWord">Save</q-btn>
      <q-btn class="q-ml-md" color="red" @click="cancelSaving">Cancel</q-btn>
    </div>

  </form>

  <q-dialog v-model="alert">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ msgError }}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat color="primary" @click="alert = false">OK</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { useAddStore } from "@/composables/useAddStore";
import { QInput } from 'quasar';

export default {
  name: "my-input-word",
  components: {
    QInput
  },
  data() {
    return {
      text: '',
      alert: false,
      msgError: '',
      compareWord: true,
      selectedID: this.$store.state.selectedIDWord,
    }
  },
  methods: {
    ...mapActions({
      clearSelectedWord: "clearSelectedWord",
    }),
    QAdd(event) {
      console.log(event.target.value)
    },
    addWord() {
      try {
        const res = this.addWordStore();
        res.then(result => {
          this.$store.state.selectedIDWord = 0;
          this.$store.state.word = '';
          this.$store.state.translate = '';
          this.$store.state.rating = 0;
        },
        error => {
          this.msgError = error
        })
      } catch (e) {
        alert(e)
      }
    },
    enterWord(event) {
      this.$store.state.word = event.target.value;
      this.compare();
    },
    enterTranslate(event) {
      this.$store.state.translate = event.target.value;
      this.compare();
    },
    focusTranslate() {
      this.$refs.translate.focus();
    },
    focusWord() {
      this.$refs.word.focus();
    },
    cancelSaving() {
      this.clearSelectedWord();
    },
    showPopup(msg) {
      this.msgError = msg;
      this.alert = true;
    },
    compare() {
      if(this.$store.state.selectedIDWord) {
        this.$store.state.compareWord = this.$store.state.word === this.$store.state.oldWord &&
            this.$store.state.translate === this.$store.state.oldTranslate;
      }
    }
  },
  computed: {
    ...mapGetters({
      inputWordStore: "inputWordStore",
    }),
    value: {
      get(){
        return this.$store.state.word
      },
      set(newVal) {
        this.$store.state.word = newVal
      }
    },
    translate: {
      get(){
        return this.$store.state.translate
      },
      set(newVal) {
        this.$store.state.translate = newVal
      }
    }
  },
  watch: {
    msgError(msg) {
      if(msg) {
        this.alert = true;
      } else {
        this.alert = false;
      }
    },
    alert(val) {
      if(val == false) {
        this.msgError = '';
      }
    },
    selectedID() {
      console.log("sdsdf")
      this.compare();
    },
  },

  setup(props, ctx) {
    const { addWordStore } = useAddStore();

    return {
      addWordStore
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
