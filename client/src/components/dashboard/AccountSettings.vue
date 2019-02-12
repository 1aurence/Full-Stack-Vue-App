<template>
  <div id="settings" class="container mt-3">
    <h3 class="mb-4">Settings</h3>
    <div class="username">
      <br>
      <b-alert show variant="success" v-if="usernameAlert.success">Your username has been changed</b-alert>
      <b-alert show variant="warning" v-if="usernameAlert.error">{{usernameAlert.msg}}</b-alert>
      <b-form @submit.prevent="changeUsername" class="w-25 m-auto d-flex align-items-center">
        <b-form-input v-model="usernameForm.newUsername" type="text" placeholder="New username"></b-form-input>
        <b-button class="ml-1" type="submit" variant="success">Change</b-button>
      </b-form>
    </div>

    <div class="password mt-4">
      <b-form @submit.prevent="changePassword" class="w-25 m-auto d-flex align-items-center">
        <b-form-input v-model="passwordForm.newPassword" type="password" placeholder="New password"></b-form-input>
        <b-button class="ml-1" type="submit" variant="success">Change</b-button>
      </b-form>
      <br>
      <b-alert show variant="success" v-if="passwordAlert.success">Your password has been changed</b-alert>
      <b-alert show variant="warning" v-if="passwordAlert.error">{{passwordAlert.msg}}</b-alert>
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
      usernameForm: {
        username: null,
        newUsername: ""
      },
      usernameAlert: {
        error: false,
        success: false,
        msg: null
      },
      passwordForm: {
        password: null,
        newPassword: ""
      },
      passwordAlert: {
        error: false,
        success: false,
        msg: null
      }
    };
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  mounted() {
    this.usernameForm.username = this.getUser.username;
  },
  methods: {
    async changeUsername() {
      try {
        let updateUser = await UserService.changeUsername(
          this.getUser._id,
          this.usernameForm.newUsername
        );
        if (updateUser) {
          console.log(updateUser);
          this.$store.dispatch("updateUser", updateUser);
          this.usernameAlert.success = true;
          setTimeout(() => {
            this.usernameAlert.success = false;
          }, 3500);
          this.usernameForm.newUsername = "";
        }
      } catch (error) {
        console.log(error);
        this.usernameForm.newUsername = "";
        this.usernameAlert.msg = "Username already in use";
        this.usernameAlert.error = true;
        setTimeout(() => {
          this.usernameAlert.error = false;
        }, 3500);
      }
    },
    async changePassword() {
      try {
        let newPassword = await UserService.changePassword(
          this.getUser._id,
          this.passwordForm.newPassword
        );
        if (newPassword) {
          this.$store.dispatch("updatePassword", newPassword);
          this.passwordAlert.success = true;
          setTimeout(() => {
            this.passwordAlert.success = false;
          }, 3500);
          this.passwordForm.newPassword = "";
        }
      } catch (error) {
        console.log(error);
        this.passwordForm.newPassword = "";
        this.passwordAlert.msg = "Username already in use";
        this.passwordAlert.error = true;
        setTimeout(() => {
          this.passwordAlert.error = false;
        }, 3500);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
input {
  min-width: 160px;
  margin: 0 auto;
}
</style>


