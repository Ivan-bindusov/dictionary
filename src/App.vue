<template>

  <my-input-word></my-input-word>

  <my-words></my-words>

</template>

<script>
import myInputWord from '@/components/myInputWord'
import myWords from '@/components/myWords'

export default {
  components: {
    myInputWord,
    myWords,
  },

  setup() {

    return {

    };
  },
};
</script>
