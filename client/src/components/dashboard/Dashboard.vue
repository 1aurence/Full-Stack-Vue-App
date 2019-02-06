<template>
  <div>
    <h1>Dashboard</h1>
    <h2>Welcome: {{user.username || this.$user.username}}</h2>
  </div>
</template>
<script>
import UserService from "../../api/user/UserService";

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
  mounted() {
    console.log(this.$user);
  }
};
</script>
