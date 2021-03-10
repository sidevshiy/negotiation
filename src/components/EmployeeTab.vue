<template>
  <Form title="Employee" msg="waiting for employer..." @results="getResults" />
</template>

<script>
import Form from "./Form";
import { mapActions } from 'vuex';
export default {
  components: {
    Form,
  },
  methods: {
    ...mapActions({ getResults: "setEmployee" }),
  },
};
</script>

