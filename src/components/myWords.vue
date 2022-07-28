<template>

  <q-table
      class="q-mt-md"
      title="Words"
      :columns="columns"
      :rows="wordsState"
      row-key="name"
      v-model:pagination="pagination"
      :filter="filter"
      :visible-columns="visibleColumns"
  >
    <template v-slot:top-right>
      <q-input dense outlined debounse="600" v-model="filter" placeholder="Search">
        <template v-slot:append><q-icon name="search" /></template>
      </q-input>
    </template>

    <template v-slot:top-left>

      <div v-if="$q.screen.gt.xs" class="col">
        <q-toggle v-model="visibleColumns" val="value" label="Word" />
        <q-toggle v-model="visibleColumns" val="translate" label="Translate" />
        <q-toggle v-model="visibleColumns" val="rating" label="Rating" />
      </div>

      <q-select
          v-else
          v-model="visibleColumns"
          multiple
          dense
          options-dense
          outlined
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          style="min-width: 150px"
          class="q-mb-sm"
      />

    </template>

    <template v-slot:body="props">

      <q-tr :props="props" >
        <q-td @click.native="selectWord(event, props.row)" key="value" :props="props">
          {{ props.row.value }}
        </q-td>

        <q-td @click.native="selectWord(event, props.row)" key="translate" :props="props">
          {{ props.row.translate }}
        </q-td>

        <q-td key="rating" :props="props">
          <q-select
              filled
              dense
              v-model="props.row.rating"
              label="Choose rating"
              :options="options"
              @update:model-value="changeRating(props.row)"
          >
          </q-select>
        </q-td>

        <q-td class="text-center">
          <q-icon @click.native.stop="deleteWord(props.row.id)" class="cursor-pointer" name="close" size="26px" color="red" />
        </q-td>

      </q-tr>

    </template>

  </q-table>

</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { useWords } from "@/composables/useWords";
import { useAddStore } from "@/composables/useAddStore";
import { QTable, QInput, QSelect } from 'quasar'

export default {
  name: "my-words",
  components: {
    QTable, QInput, QSelect
  },
  data() {
    return {
      columns: [
        {
          name: 'value',
          required: false,
          label: 'Word',
          align: 'center',
          field: 'value'
        },
        {
          name: 'translate',
          required: false,
          label: 'Translate',
          align: 'center',
          field: 'translate'
        },
        {
          name: 'rating',
          required: true,
          label: 'Rating',
          align: 'center',
          field: 'rating'
        },
        {
          name: 'delete',
          required: true,
          label: 'Delete Word',
          align: 'center',
          field: 'delete'
        }
      ],
      dataQTable: [
        {value: 'dsfdf', translate: 'sdfdfdsg'},
      ],
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
      filter: '',
      options: [0, 1, 2],
      test: 0,
      visibleColumns: ['value', 'translate', 'rating'],
    }
  },
  methods: {
    ...mapActions({
      deleteWordFromDB: "deleteWordFromDB",
      setSelectedWord: "setSelectedWord",
      clearSelectedWord: "clearSelectedWord",
      setSavingWord: "setSavingWord",
      clearSavingWord: "clearSavingWord",
    }),
    ...mapGetters({
      inputWordStore: "inputWordStore",
    }),
    deleteWord(id) {
      if (this.$store.state.selectedIDWord == id) {
        this.$store.state.selectedIDWord = 0;
      }
      this.deleteWordFromDB(id).then((res) => {
        this.getWords();
      });
    },
    selectWord(event, row, index) {
      this.setSelectedWord(row.id);
    },
    changeRating(word) {
      this.setSavingWord({id: word.id, rating: word.rating}).then(() => {
        return this.addWordStore();
      }).then(() => {
        this.clearSavingWord();
      }).then(() => {
        this.getWords();
      })
    },
  },
  computed: {
    wordsState() {
      return this.$store.state.words;
    },
  },

  setup(props, ctx) {
    const { getWords } = useWords();
    const { addWordStore } = useAddStore();

    return {
      getWords, addWordStore,
    };
  },
};
</script>

<style lang="scss" scoped>
.list-of-words {
  width: 100%;
  tr {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    padding: 0 7px;
    &:hover {
      background-color: #e8e8e8;
    }
    &.edit {
      border: 1px solid #e8e8e8;
    }
    a {
      text-decoration: none;
      color: red;
    }
  }
}
</style>
