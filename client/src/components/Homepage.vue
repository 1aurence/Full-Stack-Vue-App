<template>
  <div>
    <h1>Homepage</h1>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getUser"])
  }
};
</script>
<style scoped>
.jumbotron {
  width: 50%;
}
</style>
