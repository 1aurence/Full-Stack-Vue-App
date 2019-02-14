<template>
  <div>
    <b-alert
      v-if="accountCreated"
      class="alert"
      show
      variant="success"
    >Account has been successfully created</b-alert>
    <b-alert v-if="createError" class="alert" show variant="warning">{{createError}}</b-alert>

    <b-form @submit.prevent="createUser" class="form mt-3">
      <b-form-group id="exampleInputGroup3" label="Email:" label-for="exampleInput3">
        <b-form-input
          id="exampleInput3"
          type="text"
          v-model="form.email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup1" label="Username:" label-for="exampleInput1">
        <b-form-input
          id="exampleInput1"
          type="text"
          v-model="form.username"
          required
          placeholder="Enter username"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2" label="Password:" label-for="exampleInput2">
        <b-form-input
          id="exampleInput2"
          type="password"
          v-model="form.password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Sign up</b-button>
      <p>Or
        <router-link to="/login">Login</router-link>
      </p>
    </b-form>
  </div>
</template>
<script>
import UserService from "../../api/user/UserService";
export default {
  data() {
    return {
      accountCreated: false,
      createError: null,

      form: {
        email: "",
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async createUser() {
      try {
        let newUser = await UserService.create(
          this.form.username,
          this.form.email,
          this.form.password
        );
        if (newUser) {
          this.accountCreated = true;
          this.resetForm();
          console.log(newUser);
        }
      } catch (err) {
        this.createError = err.response.data;
        setTimeout(() => {
          this.createError = null;
        }, 2500);
        this.form.password = "";
      }
    },
    resetForm() {
      this.form.username = "";
      this.form.email = "";
      this.form.password = "";
    }
  }
};
</script>
<style>
.form,
.alert {
  width: 40%;
  margin: 0 auto;
}
</style>
