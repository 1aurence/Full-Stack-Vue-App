<template>
  <div>
    <h1>Dashboard</h1>
    <h2>Welcome: {{getUser.username}}</h2>
  </div>
</template>
<script>
import UserService from "../../api/user/UserService";
import { mapGetters } from "vuex";

export default {
  props: {
    user: Object,
    required: true
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  // async beforeRouteEnter(to, from, next) {
  //   console.log(this.getUser);
  //   next(vm => {
  //     name: "Dashboard";
  //   });
  // }
};
</script>
