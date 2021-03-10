<template>
  <form @submit="sendForm" v-if="!waiting">
    <h1 class="form_title">{{ title }}</h1>

    <div class="form_grup" v-for="(item, index) in fields" :key="index">
      <input
        class="form_input"
        :placeholder="item.placeholder"
        :value="item.value"
        @input="onInput(index, $event.target.value)"
      />
    </div>
    <button class="form_button">Send</button>
  </form>
  <div v-else>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import toastr from "toastr";
export default {
  props: {
    msg: String,
    title: String,
  },
  data() {
    return {
      fields: [
        {
          placeholder: "Enter salary",
          value: "",
          pattern: /^\d+$/,
        },
      ],
      waiting: false,
    };
  },
  created() {
    this.fields.forEach((item) => {
      item["control"] = false;
    });
    this.$root.$on("close", this.notWait);
  },
  methods: {
    onInput(index, value) {
      this.fields[index].value = value;
      if (this.fields[index].pattern.test(value)) {
        this.fields[index].control = true;
      } else {
        this.fields[index].control = false;
      }
    },
    sendForm(e) {
      e.preventDefault();
      let res = this.fields.every((elem) => {
        return elem.control === true;
      });
      if (res) {
        this.$emit("results", this.fields);
        this.waiting = true;
        toastr.success("We sent your number!");
      } else {
        toastr.error("The Fields are reqiured and should be just number");
      }
    },
    notWait() {
      this.waiting = !this.waiting;
    },
  },
};
</script>

<style scoped>
.form {
  width: 300px;
  padding: 32px;
  border-radius: 10px;
  box-shadow: 0 4px 16px #ccc;
  font-family: sans-serif;
  letter-spacing: 1px;
}

.form_title {
  text-align: center;
  margin: 0 0 32px 0;
  font-weight: normal;
}

.form_button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-family: sans-serif;
  letter-spacing: 1px;
  font-size: 16xp;
  color: #fff;
  background-color: #0071f0;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
}

.form_grup {
  position: relative;
  margin-bottom: 32px;
}

.form_input {
  width: 100%;
  padding: 0 0 10px 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  background-color: transparent;
  outline: none;
  transition: 0.3s;
}

.form_label {
  position: absolute;
  top: 0;
  z-index: -1;
  color: #9e9e9e;
  transition: 0.3s;
}

.form_button:focus,
.form_button:hover {
  background-color: rgba(0, 113, 240, 0.7);
}

.form_input:focus {
  border-bottom: 1px solid #1a73a8;
}

.form_input:focus ~ .form_label {
  top: -18px;
  font-size: 12px;
  color: #e0e0e0;
}

.form_input:focus ~ .form_label,
.form_input:not(:placeholder-shown) ~ .form_label {
  top: -18px;
  font-size: 12px;
  color: #e0e0e0;
}
</style>
