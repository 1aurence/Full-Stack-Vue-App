<template>
  <div class="container">
    <div class="alerts">
      <b-alert class="alert" show variant="success" v-if="postCreated">Post successfully created</b-alert>
      <b-alert class="alert" show variant="warning" v-if="error">{{error}}</b-alert>
    </div>
    <h3 class="mt-4">Create Post</h3>

    <b-form @submit.prevent="createPost" class="mt-4">
      <b-form-group>
        <b-form-input label="Title" v-model="form.title" placeholder="Title" class="mb-3"/>
        <b-form-textarea v-model="form.body" placeholder="Enter something" :rows="3" :max-rows="6"/>
      </b-form-group>
      <b-button variant="primary" type="submit">Create Post</b-button>
    </b-form>
  </div>
</template>
<script>
import PostService from "../../api/posts/PostService";

export default {
  data() {
    return {
      form: {
        title: "",
        body: "",
        author: this.$store.getters.getUser._id
      },
      postCreated: false,
      error: null
    };
  },

  methods: {
    async createPost() {
      try {
        let createPost = await PostService.createPost(this.form);
        if (createPost) {
          console.log(createPost);
          this.form.title = "";
          this.form.body = "";
          this.postCreated = true;
          setTimeout(() => {
            this.postCreated = false;
          }, 3500);
        }
      } catch (err) {
        this.error = err.response.data;
        setTimeout(() => {
          this.error = null;
        }, 3500);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.alert {
  position: absolute;
  z-index: 99999 !important;
  top: 30px;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>

