<template>
  <div class="container mt-3">
    <div>
      <b-nav>
        <b-nav-item active>
          <router-link class="mr-3" :to="{name: 'Profile' }" active>Profile</router-link>
        </b-nav-item>
        <b-nav-item active>
          <router-link class="mr-3" :to="{name: 'AccountSettings'}" active>Account Settings</router-link>
        </b-nav-item>
      </b-nav>
    </div>

    <router-view/>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";

export default {
  props: {
    user: Object,
    required: true
  },
  // computed: {
  //   ...mapGetters(["getUser"])
  // }
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  font-size: 1.5rem;
  color: #888 !important;
}
.router-link-exact-active {
  text-decoration: underline;
}
</style>

