<template>
  <div class="container mt-3">
    <router-link class="mr-5" :to="{path: '/profile'}" active>Profile</router-link>
    <router-link :to="{path: '/account-settings'}" active>Account Settings</router-link>
    <router-view/>
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
  }
};
</script>
