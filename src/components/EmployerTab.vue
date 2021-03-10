<template>
  <Form title="Employer" msg="waiting for employee..." @results="getResults" />
</template>

<script>
import Form from "./Form";
import { mapActions } from "vuex";
export default {
  components: {
    Form,
  },
  methods: {
    ...mapActions({ getResults: "setEmployer" }),
  },
};
</script>

