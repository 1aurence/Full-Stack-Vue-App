<template>
  <div class="container mt-3">
    <h1>See what others are saying...</h1>
    <b-form-input v-model="postSearch" type="text" placeholder="Search post by title..."></b-form-input>
    <b-list-group class="mt-4">
      <b-list-group-item class="mb-5" id="post" v-for="post in filteredPosts" :key="post._id">
        <h3>{{post.title}}</h3>
        <small>Written by {{post.author.username}}, on {{post.createdAt}}</small>
        <p>{{post.body}}</p>
        <div class="rate-post">
          <div>
            <i class="fas fa-thumbs-up mr-3"></i>
            <i class="fas fa-thumbs-down"></i>
          </div>
          <b-button class="ml-3">Comment</b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import PostService from "../../api/posts/PostService";

export default {
  data() {
    return {
      userPosts: [],
      postSearch: ""
    };
  },
  async created() {
    try {
      let getPosts = await PostService.getPosts();
      if (getPosts) {
        console.log(getPosts);
        this.userPosts = getPosts.data;
      }
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    filteredPosts() {
      return this.userPosts.filter(post => {
        return post.title.toLowerCase().match(this.postSearch.toLowerCase());
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.rate-post {
  display: flex;
  align-items: center;
  color: #666;
  & i {
    cursor: pointer;
    &:hover {
      color: #888;
    }
  }
}
#post {
  background: #c9c9c9;
}
</style>

