<template>
  <div class="container mt-3">
    <!-- <router-link class="mr-5" :to="{path: '/profile'}" active>Profile</router-link> -->
    <div>
      <b-nav>
        <b-nav-item active>
          <router-link class="mr-3" :to="{path: '/profile'}" active>Profile</router-link>
        </b-nav-item>
        <b-nav-item active>
          <router-link class="mr-3" :to="{path: '/account-settings'}" active>Account Settings</router-link>
        </b-nav-item>
      </b-nav>
    </div>

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
<style lang="scss" scoped>
a {
  text-decoration: none;
  font-size: 1.5rem;
  color: #888 !important;
}
.router-link-active {
  text-decoration: underline;
}
</style>

