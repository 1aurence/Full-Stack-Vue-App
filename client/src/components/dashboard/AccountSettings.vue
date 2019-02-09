<template>
  <div id="settings" class="container">
    <h3 class="mb-4">Settings</h3>
    <b-form @submit.prevent="changeUsername" class="w-25 m-auto d-flex align-items-center">
      <b-form-input v-model="form.newUsername" type="text" placeholder="New username"></b-form-input>
      <b-button class="ml-1" type="submit" variant="success">Change</b-button>
    </b-form>
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
      }
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
        let updateUser = await UserService.updateUsername(
          this.form.username,
          this.form.newUsername
        );
        if (updateUser) {
          this.$store.dispatch("updateUser", updateUser);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

