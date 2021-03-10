<template>
  <div id="app">
    <Tabs/>
    <Alert v-show="allResults"/>
  </div>
</template>

<script>
import Tabs from './components/Tabs';
import Alert from './components/Alert';


import 'toastr/build/toastr.css';

import { mapGetters } from 'vuex';
export default {
  components: {
    Tabs,
    Alert,
  },
  
  computed: {
    ...mapGetters({ allResults: 'allResults' }),
  },

  created(){
    this.$store.dispatch('setTemprature');
  }
}
</script>

<style>

</style>
