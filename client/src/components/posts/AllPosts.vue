<template>
  <div class="container mt-3">
    <div class="alerts">
      <b-alert
        class="alert"
        show
        variant="success"
        v-if="newComment.success"
      >Comment successfully created</b-alert>
      <b-alert class="alert" show variant="warning" v-if="newComment.error">{{newComment.error}}</b-alert>
    </div>
    <h2 class="mb-3">See what others are saying...</h2>
    <b-form-input v-model="postSearch" type="text" placeholder="Search post by title..."></b-form-input>
    <b-list-group class="mt-4">
      <b-list-group-item class="mb-5" id="post" v-for="post in filteredPosts" :key="post._id">
        <h3>{{post.title}}</h3>
        <small>Written by {{post.author.username}}, on {{post.createdAt}}</small>
        <hr>
        <p>{{post.body}}</p>
        <div class="rate-post">
          <div>
            <i class="fas fa-thumbs-up mr-3"></i>
            <i class="fas fa-thumbs-down"></i>
          </div>
          <b-button
            class="ml-3"
            size="sm"
            variant="primary"
            @click="startCommenting(post._id, post.author._id)"
          >Comment</b-button>
          <b-button
            class="ml-3"
            size="sm"
            v-if="!post.showingComments"
            @click="showComments(post,post._id)"
          >Show Comments</b-button>
          <b-button
            class="ml-3"
            size="sm"
            v-if="post.showingComments"
            @click="post.showingComments = false"
          >Hide Comments</b-button>
        </div>
        <b-list-group class="mt-2" v-if="post.showingComments" id="comments">
          <b-list-group-item
            class="mb-1"
            v-for="comment in comments"
            v-if="comment.postId === post._id"
            :key="comment._id"
          >
            <h4>{{comment.author.username}} said:</h4>
            <p>{{comment.body}}</p>
            <small>{{comment.createdAt}}</small>
          </b-list-group-item>
        </b-list-group>
      </b-list-group-item>
    </b-list-group>
    <b-modal
      no-close-on-esc
      hide-header-close
      no-close-on-backdrop
      v-model="newComment.commenting"
      title="Tell em' what you thought"
    >
      <b-form-textarea
        v-model="newComment.comment"
        placeholder="Your comment..."
        :rows="3"
        :max-rows="6"
      />

      <div slot="modal-footer" class="w-100">
        <b-btn size="sm" class="float-left" variant="secondary" @click="stopCommenting">Cancel</b-btn>
        <b-btn size="sm" class="float-right" variant="primary" @click="createComment">Submit</b-btn>
      </div>
    </b-modal>
  </div>
</template>
<script>
import PostService from "../../api/posts/PostService";
import CommentService from "../../api/comments/CommentService";

import { get } from "http";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      userPosts: [],
      postSearch: "",
      comments: [],
      newComment: {
        comment: "",
        commenting: false,
        success: false,
        error: null,
        postId: null,
        authorId: null
      }
    };
  },
  async created() {
    try {
      let getPosts = await PostService.getPosts();
      if (getPosts) {
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
    },
    filteredComments(comment, post) {}
  },
  methods: {
    async createComment() {
      try {
        let addComment = await CommentService.comment(
          this.newComment.postId,
          this.newComment.authorId,
          this.newComment.comment
        );
        if (addComment) {
          this.newComment.success = true;
          this.showComments();
          setTimeout(() => {
            this.stopCommenting();
            this.newComment.success = false;
          }, 1500);
        }
      } catch (err) {
        this.newComment.error = err.response.data;
        setTimeout(() => {
          this.newComment.error = null;
        }, 2500);
      }
    },
    async showComments(post, postId) {
      try {
        let comments = await CommentService.showPostComments(postId);
        if (comments) {
          this.comments = comments.data;
          post.showingComments = true;
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    startCommenting(postId, authorId) {
      this.newComment.postId = postId;
      this.newComment.authorId = authorId;
      this.newComment.commenting = true;
      this.newComment.comment = "";
    },
    stopCommenting() {
      this.newComment.postId = null;
      this.newComment.authorId = null;
      this.newComment.comment = "";
      this.newComment.commenting = false;
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
  background: lighten(#c9c9c9, 15);
  width: 50%;
}
#comments {
  height: 300px;
  overflow: scroll;
}
.alert {
  position: absolute;
  z-index: 99999 !important;
  top: 30px;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>

