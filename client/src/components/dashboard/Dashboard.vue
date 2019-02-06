<template>
  <div>
    <h1>Dashboard</h1>
    <h2>Welcome: {{user.username || this.$user.username}}</h2>
  </div>
</template>
<script>
import UserService from "../../api/user/UserService";
import { mapGetters } from "vuex";

export default {
  props: {
    user: Object
  },
  data() {
    return {};
  },
  async created() {
    if (this.$user) {
      this.user = this.$user;
    }
  },
  computed: {
    ...mapGetters(["loggedIn"]),
    loggedIn() {
      return loggedIn || this.$user;
      console.log(loggedIn);
    }
  }
};
</script>
