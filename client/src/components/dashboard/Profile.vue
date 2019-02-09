<template>
  <div>
    <div id="profile" class="container">
      <h3>Hello, {{getUser.username}}</h3>
      <small>Member since: {{getUser.createdAt}}</small>
      <img src="../../assets/placeholder.png" id="profile-pic" class="mt-3 mb-3">
      <!-- <b-form-file
        v-model="file"
        :state="Boolean(file)"
        id="img-upload"
        placeholder="Choose an image..."
      ></b-form-file>-->
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getUser"]),

    pics() {
      return "../../assets/placeholder.png";
    }
  }
};
</script>
<style scoped>
#profile {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  width: 40%;
  margin: 0 auto;
}
#profile-pic {
  border-radius: 50%;
  border: 1px solid #666;
  height: 90px;
  width: 90px;
  align-self: center;
}
#img {
  width: 30px !important;
}
</style>

