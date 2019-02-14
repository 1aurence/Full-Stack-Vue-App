<template>
  <div>
    <b-alert v-if="error.status" class="alert" show variant="warning">{{error.msg}}</b-alert>

    <b-form @submit.prevent="login" class="form mt-3">
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

      <b-button type="submit" variant="primary">Login</b-button>
      <br>
      <p>Or
        <router-link to="/signup">Signup</router-link>
      </p>
    </b-form>
  </div>
</template>
<script>
import UserService from "../../api/user/UserService";

export default {
  data() {
    return {
      error: {
        status: false,
        msg: ""
      },
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      try {
        let user = await UserService.login(
          this.form.username,
          this.form.password
        );
        if (user) {
          this.$store.dispatch("login", user.data);
          this.$router.push({
            name: "Profile",
            params: { user: user.data }
          });
        }
      } catch (err) {
        this.error.status = true;
        this.error.msg = err.message;
        console.log(err);
      }
    }
  }
};
</script>
<style>
.form {
  width: 40%;
  margin: 0 auto;
}
</style>


