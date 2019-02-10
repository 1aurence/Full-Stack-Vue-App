<template>
  <div id="settings" class="container">
    <h3 class="mb-4">Settings</h3>
    <div class="username">
      <b-form @submit.prevent="changeUsername" class="w-25 m-auto d-flex align-items-center">
        <b-form-input v-model="form.newUsername" type="text" placeholder="New username"></b-form-input>
        <b-button class="ml-1" type="submit" variant="success">Change</b-button>
      </b-form>
      <br>
      <b-alert show variant="success" v-if="nameChangeSuccess">Your username has been changed</b-alert>
      <b-alert show variant="warning" v-if="error.status">{{error.msg}}</b-alert>
    </div>
  </div>
</template>
<style>
#settings {
  text-align: center;
}
</style>
<script>
import { mapGetters } from "vuex";
import UserService from "../../api/user/UserService";

export default {
  data() {
    return {
      form: {
        username: null,
        newUsername: ""
      },
      error: {
        stauts: false,
        msg: null
      },
      nameChangeSuccess: false
    };
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  mounted() {
    this.form.username = this.getUser.username;
  },
  methods: {
    async changeUsername() {
      try {
        let updateUser = await UserService.changeUsername(
          this.form.username,
          this.form.newUsername
        );
        if (updateUser) {
          console.log(updateUser);
          this.$store.dispatch("updateUser", updateUser);
          this.nameChangeSuccess = true;
          setTimeout(() => {
            this.nameChangeSuccess = false;
          }, 3500);
          this.form.newUsername = "";
        }
      } catch (error) {
        console.log(error);
        this.form.newUsername = "";
        this.error.msg = "Username already in use";
        this.error.status = true;
        setTimeout(() => {
          this.error.status = false;
        }, 3500);
      }
    }
  }
};
</script>

