<template>
  <div id="profile" class="container">
    <h3>Hello, {{getUser.username}}</h3>
    <small>Member since: {{getUser.createdAt}}</small>
    <div id="profile-pic-container">
      <img src="../../assets/placeholder.png" id="profile-pic" class="mt-3 mb-3">
      <br>
      <i id="edit-profile-pic" class="fas fa-upload"></i>
    </div>
    <hr>
    <div class="details mt-1">
      <h4>Details</h4>
      <p>Total posts: {{userPosts.length}}</p>
      <p>Total likes:</p>
    </div>
    <div class="posts">
      <b-button
        variant="secondary"
        class="mb-3"
        v-if="!showPosts"
        @click.prevent="showPosts = true"
      >Show posts</b-button>
      <b-button
        variant="secondary"
        class="mb-3"
        v-if="showPosts"
        @click.prevent="showPosts = false"
      >Hide posts</b-button>

      <b-list-group class="posts" v-if="showPosts">
        <b-list-group-item v-for="post in userPosts" :key="post._id">
          <h4>{{post.title}}</h4>
          <small>Created on {{post.createdAt}}</small>
          <p>{{post.body}}</p>
          <b-button variant="warning" class="mr-2">Edit</b-button>
          <b-button variant="danger" @click="deletePost(post._id)">Delete</b-button>
        </b-list-group-item>
        <p v-if="noUserPosts">You currently have zero posts</p>
      </b-list-group>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import PostService from "../../api/posts/PostService";

export default {
  data() {
    return {
      showPosts: false,
      userPosts: []
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
    noUserPosts() {
      if (this.userPosts.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  async created() {
    try {
      let getPosts = await PostService.getUserPosts(this.getUser._id);
      this.userPosts = getPosts.data;
    } catch (err) {
      console.log(err.message);
    }
  },
  methods: {
    async deletePost(id) {
      console.log("userid", this.getUser._id);
      await PostService.deletePost(id);
      let updatePosts = await PostService.getUserPosts(this.getUser._id);
      this.userPosts = updatePosts.data;
    }
  }
};
</script>
<style scoped lang="scss">
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
.details {
  line-height: 0.8rem;
  text-align: left;
  margin: 0 auto;
}
#profile-pic-container {
}
#edit-profile-pic {
  cursor: pointer;
  width: 30px;
  font-size: 1.4rem;
  color: #666;
  &:hover {
    opacity: 0.7;
  }
}
</style>

