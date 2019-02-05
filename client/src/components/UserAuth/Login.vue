<template>
  <div>
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
          type="text"
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
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  method: {
    login() {}
  }
};
</script>
<style>
.form {
  width: 40%;
  margin: 0 auto;
}
</style>


