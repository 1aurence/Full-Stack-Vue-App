<template>
  <div>
    <b-jumbotron class="m-auto">
      <template slot="header">Bootstrap Vue</template>
      <template slot="lead">
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </template>
      <hr class="my-4">
      <p>
        It uses utility classes for typography and spacing to space content
        out within the larger container.
      </p>
      <router-link to="/login">
        <b-btn variant="primary" class="mr-3">Login</b-btn>
      </router-link>
      <router-link to="/signup">
        <b-btn variant="secondary">Signup</b-btn>
      </router-link>
    </b-jumbotron>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
.jumbotron {
  width: 50%;
}
</style>
