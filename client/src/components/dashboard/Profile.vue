<template>
  <div id="profile" class="container mt-3">
    <div class="alerts">
      <b-alert
        class="alert"
        show
        variant="success"
        v-if="friendRequestResponse"
      >{{friendRequestResponse}}</b-alert>
      <b-alert class="alert" show variant="success" v-if="friendRequest.success">Friend request sent</b-alert>
      <b-alert
        class="alert"
        show
        variant="warning"
        v-if="friendRequest.error"
      >Friend request still pending</b-alert>
      <b-alert class="alert" show variant="success" v-if="friendRemoved">Friend has been removed</b-alert>
      <b-alert
        class="alert"
        show
        variant="success"
        v-if="msgInfo.success"
      >Your message has been sent</b-alert>
      <b-alert class="alert" show variant="success" v-if="msgInfo.error">{{msgInfo.error}}</b-alert>
    </div>
    <div class="row mt-5">
      <div class="user-info column">
        <h3 id="username">Hello, {{getUser.username}}</h3>
        <small>Member since: {{getUser.createdAt}}</small>
        <div id="profile-pic-container">
          <img src="../../assets/placeholder.png" id="profile-pic" class="mt-3 mb-3">
          <br>
          <i id="edit-profile-pic" class="fas fa-upload"></i>
        </div>
        <div class="user-details mt-1">
          <h4>Details</h4>
          <p>
            <i class="fas fa-envelope"></i>
            : {{userMessages.length}}
          </p>
          <p>Total posts: {{userPosts.length}}</p>
          <p>Total friends: {{friends.length}}</p>
          <b-button
            v-if="!showFriendRequests"
            variant="link"
            @click="showFriendRequests = true"
          >See pending friend requests: {{pendingFriendRequests.length}}</b-button>
          <b-button
            v-if="showFriendRequests"
            variant="link"
            @click="showFriendRequests = false"
          >Hide requests</b-button>
          <b-list-group v-if="showFriendRequests">
            <b-list-group-item v-for="request in pendingFriendRequests" :key="request._id">
              {{request.from.username}}
              <b-button
                variant="primary"
                size="sm"
                @click="acceptFriendRequest(request.to, request.from._id)"
              >Accept</b-button>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
      <div class="friends column ml-5">
        <h3>Your Friends</h3>
        <p v-if="friends.length === 0">Seems like you currently have no one added</p>
        <b-button
          v-if="!viewingFriends && friends.length >= 1"
          variant="link"
          @click="viewingFriends = true"
        >View Friends</b-button>
        <b-button
          v-if="viewingFriends && friends.length >= 1"
          variant="link"
          @click="viewingFriends = false"
        >Hide Friends</b-button>
        <br>
        <b-list-group v-if="viewingFriends && friends.length >= 1" id="friends">
          <b-list-group-item class="mb-1" v-for="friend in friends" :key="friend._id">
            {{friend.from.username}}
            <br>
            <b-button
              variant="link"
              size="sm"
              @click="removeFriend(friend.to, friend.from._id)"
            >Remove</b-button>
            <b-button variant="link" size="sm" @click="viewUser(friend.from._id)">View profile</b-button>
            <b-button
              variant="link"
              size="sm"
              @click="startMsg(friend.from._id,friend.to)"
            >Send Message</b-button>
          </b-list-group-item>
        </b-list-group>
        <b-button variant="primary" @click="getUsers">Add new friend</b-button>
        <b-modal id="modal" v-model="friendRequest.showModal" title="Search users">
          <b-form-input
            v-model="friendRequest.username"
            placeholder="Search username"
            class="mb-3"
          />
          <b-list-group v-if="filteredUsers" id="user-list">
            <b-list-group-item v-for="user in filteredUsers" :key="user._id" class="mb-2">
              {{user.username}}
              <b-btn
                size="sm"
                class="float-right"
                variant="primary"
                @click="sendFriendRequest(user._id)"
              >Add</b-btn>
            </b-list-group-item>
          </b-list-group>

          <div slot="modal-footer" class="w-100">
            <b-btn
              size="sm"
              class="float-left"
              variant="secondary"
              @click="friendRequest.showModal=false"
            >Cancel</b-btn>
          </div>
        </b-modal>
      </div>
      <div class="posts ml-5 column">
        <h3>Your Posts</h3>
        <b-button
          variant="primary"
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

        <b-list-group class="posts column" v-if="showPosts">
          <b-list-group-item class="mb-1" v-for="post in userPosts" :key="post._id">
            <h4 v-if="!post.editing">{{post.title}}</h4>
            <div v-if="post.editing">
              <b-form-input
                v-if="post.editing"
                label="Title"
                placeholder="Change title"
                class="mb-3"
              />
              <b-form-textarea
                v-model="post.newBody"
                placeholder="Enter something"
                :rows="3"
                :max-rows="6"
              />
            </div>

            <small>Created on {{post.createdAt}}</small>
            <p>{{post.body}}</p>
            <div v-if="!post.editing">
              <b-button variant="warning" class="mr-2" @click="post.editing=true">Edit</b-button>
              <b-button variant="danger" @click="deletePost(post._id)">Delete</b-button>
            </div>
            <div v-if="post.editing">
              <b-button variant="secondary" class="mr-2" @click="post.editing=false">Cancel</b-button>
              <b-button variant="primary">Save</b-button>
            </div>
          </b-list-group-item>
          <p v-if="noUserPosts">You currently have zero posts</p>
        </b-list-group>
      </div>
      <hr>
    </div>
    <b-modal id="modal" v-model="viewingUser" v-if="viewingUser" title="User">
      <div class="d-block text-center">
        <h3>{{userProfile.username}}</h3>
        <p>Joined: {{userProfile.createdAt}}</p>
        <p>Total Friends: {{userProfileFriends.length}}</p>
      </div>
      <div slot="modal-footer" class="w-100">
        <b-btn size="sm" class="float-left" variant="secondary" @click="viewingUser=false">Close</b-btn>
      </div>
    </b-modal>
    <b-modal
      no-close-on-esc
      hide-header-close
      no-close-on-backdrop
      id="modal"
      v-model="msgModal"
      title="Send Message"
    >
      <b-form class="mt-4">
        <b-form-group>
          <b-form-input label="Title" v-model="msg.title" placeholder="Title" class="mb-3"/>
          <b-form-textarea
            v-model="msg.body"
            placeholder="Enter something"
            :rows="3"
            :max-rows="6"
          />
        </b-form-group>
      </b-form>
      <div slot="modal-footer" class="w-100">
        <b-btn size="sm" class="float-right" variant="primary" @click="sendMsg">Send</b-btn>
        <b-btn size="sm" class="float-left" variant="secondary" @click="cancelMsg">Cancel</b-btn>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import PostService from "../../api/posts/PostService";
import UserService from "../../api/user/UserService";
import FriendService from "../../api/friends/FriendService";
import MessageService from "../../api/messages/MessageService";

export default {
  data() {
    return {
      showPosts: false,
      userPosts: [],
      post: {
        editing: false,
        newTitle: "",
        newBody: ""
      },
      userMessages: [],
      userProfileFriends: 0,
      userProfile: null,
      viewingUser: false,
      friendRemoved: false,
      showFriendRequests: false,
      friendRequestResponse: null,
      friends: [],
      users: [],
      viewingFriends: false,
      pendingFriendRequests: [],
      friendRequest: {
        showModal: false,
        error: false,
        success: false,
        username: ""
      },
      msgModal: false,
      msg: {
        to: null,
        from: null,
        title: "",
        body: ""
      },
      msgInfo: {
        error: null,
        success: null
      }
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
    },
    filteredUsers() {
      return this.users.filter(user => {
        return user.username
          .toLowerCase()
          .match(this.friendRequest.username.toLowerCase());
      });
    }
  },
  async created() {
    try {
      let getPosts = await PostService.getUserPosts(this.getUser._id);
      if (getPosts) {
        this.userPosts = getPosts.data;
      }
    } catch (err) {
      console.log(err.response.data);
    }
    try {
      let getFriends = await FriendService.getFriends(this.getUser._id);
      if (getFriends) {
        this.friends = getFriends.data;
      }
    } catch (err) {
      console.log(err.response.data);
    }
    try {
      let pendingFriendRequests = await FriendService.getPendingFriendRequests(
        this.getUser._id
      );
      this.pendingFriendRequests = pendingFriendRequests.data;
    } catch (err) {}
    try {
      let getMsgs = await MessageService.getMessages(this.getUser._id);
      this.userMessages = getMsgs.data;
    } catch (err) {
      console.log(err.response.data);
    }
  },
  methods: {
    async deletePost(id) {
      await PostService.deletePost(id);
      let updatePosts = await PostService.getUserPosts(this.getUser._id);
      this.userPosts = updatePosts.data;
    },
    editPost() {
      return (this.post.editing = true);
    },
    async getUsers() {
      this.friendRequest.showModal = true;
      try {
        let users = await UserService.getUsers();
        if (users) {
          this.users = users.data;
        }
      } catch (err) {
        console.log(err.response.data);
      }
    },
    async refreshFriendRequests() {
      let pendingFriendRequests = await FriendService.getPendingFriendRequests(
        this.getUser._id
      );
      this.pendingFriendRequests = pendingFriendRequests.data;
    },
    async sendFriendRequest(recievingUser) {
      try {
        let addFriend = await FriendService.addFriend(
          this.getUser._id,
          recievingUser
        );
        if (addFriend) {
          this.friendRequest.success = true;
          setTimeout(() => {
            this.friendRequest.success = false;
          }, 2500);
        }
      } catch (err) {
        this.friendRequest.error = true;
        setTimeout(() => {
          this.friendRequest.error = false;
        }, 2500);
        console.log(err.response.data);
      }
    },
    async acceptFriendRequest(to, from) {
      try {
        let acceptRequest = await FriendService.acceptFriendRequest(to, from);
        if (acceptRequest) {
          this.refreshFriendRequests();
          this.refreshFriendList();
          this.showFriendRequests = false;
          this.acceptedFriendRequest = true;
          this.friendRequestResponse = acceptRequest.data;
          setTimeout(() => {
            this.acceptedFriendRequest = false;
          }, 2500);
        }
      } catch (err) {}
    },
    async refreshFriendList() {
      try {
        let getFriends = await FriendService.getFriends(this.getUser._id);
        if (getFriends) {
          this.friends = getFriends.data;
        }
      } catch (err) {
        console.log(err.response.data);
      }
    },
    async removeFriend(to, from) {
      let confirm = window.confirm("Are you sure?");
      console.log(to, from);
      if (confirm) {
        try {
          let removeFriend = await FriendService.removeFriend(to, from);
          if (removeFriend) {
            this.refreshFriendList();
            this.friendRemoved = true;
            setTimeout(() => {
              this.friendRemoved = false;
            }, 2500);
          }
        } catch (err) {
          console.log(err.response.data);
        }
      }
    },
    async viewUser(id) {
      console.log(id);
      try {
        let getUser = await UserService.getUserInfo(id);
        if (getUser) {
          console.log(getUser);
          this.userProfile = getUser.data;
        }
      } catch (err) {
        console.log(err.response.data);
      }
      try {
        let getFriends = await FriendService.getFriends(id);
        if (getFriends) {
          this.userProfileFriends = getFriends.data;
        }
      } catch (err) {
        console.log(err.response.data);
      }
      this.viewingUser = true;
    },
    startMsg(to, from) {
      this.msg.to = to;
      this.msg.from = from;
      this.msgModal = true;
    },
    cancelMsg() {
      this.msg.to = null;
      this.msg.from = null;
      this.msg.title = null;
      this.msg.body = null;
      this.msgModal = false;
    },
    async sendMsg() {
      try {
        let sendMsg = await MessageService.send(this.msg);
        if (sendMsg) {
          this.msgInfo.success = true;
          this.msg.title = "";
          this.msg.body = "";
          setTimeout(() => {
            this.msgInfo.success = false;
            this.cancelMsg();
          }, 2500);
        }
      } catch (err) {
        console.log(err.response.data);
        this.msgInfo.error = err.response.data;
        setTimeout(() => {
          this.msgInfo.error = null;
        }, 2500);
      }
    }
  }
};
</script>
<style scoped lang="scss">
#profile {
  text-align: center;
}
.column {
  margin-right: 5%;
}
#profile-pic {
  border-radius: 50%;
  border: 1px solid #666;
  height: 90px;
  width: 90px;
}
#img {
  width: 30px !important;
}
.user-info {
  line-height: 0.8rem;
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
#username {
  white-space: nowrap;
}
#user-list {
  height: 200px;
  overflow-y: auto;
}
#friends {
  height: 150px;
  width: 200px;
  overflow-y: auto;
}
.alert {
  position: absolute;
  z-index: 99999 !important;
  top: 30px;
  left: 50%;
  transform: translate(-50%, 0);
}
#modal {
  z-index: 10 !important;
  position: absolute;
}
</style>
