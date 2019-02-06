<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <router-link to="/">
      <b-navbar-brand>NavBar</b-navbar-brand>
    </router-link>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item>
          <router-link to="/homepage">Home</router-link>
        </b-nav-item>

        <b-nav-item v-if="user">
          <router-link to="/dashboard">Dashboard</router-link>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="getUser">
        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>{{getUser.username}}</em>
          </template>
          <b-dropdown-item class="dropdown-links">Profile</b-dropdown-item>
          <b-dropdown-item @click="signOut" class="dropdown-links">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["loggedIn"])
  },
  methods: {
    signOut() {
      this.$store.dispatch("signout");
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters(["getUser"])
  }
};
</script>

<style scoped>
a {
  color: #f8f9fa !important;
  text-decoration: none !important;
}
a:hover {
  opacity: 0.8;
}
.dropdown-links {
  color: #666 !important;
}
</style>

