<template>
  <div>
    <b-modal
      id="modal"
      v-model="viewingComments"
      v-if="viewingComments"
      title="Your messages"
      no-close-on-esc
      hide-header-close
      no-close-on-backdrop
    >
      <div class="d-block text-center">
        <p v-if="messages.length === 0">Your inbox is currently empty</p>
        <b-list-group>
          <b-list-group-item v-for="msg in messages" :key="msg._id" id="msg" class="mb-2">
            <h3>{{msg.title}}</h3>
            <small>From: {{msg.from.username}}</small>
            <hr>
            <p class="mt-4">{{msg.body}}</p>
            <b-btn size="sm" variant="warning" @click="deleteMsg(msg._id)">Delete</b-btn>
          </b-list-group-item>
        </b-list-group>
      </div>
      <div slot="modal-footer" class="w-100">
        <b-btn size="sm" class="float-left" variant="secondary" @click="stopViewingComments">Close</b-btn>
        <b-btn size="sm" class="float-right" variant="primary">Reply</b-btn>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import MessageService from "../../api/messages/MessageService";
export default {
  data() {
    return {
      viewingComments: true,
      messages: [],
      pageBeforeEnter: null
    };
  },
  beforeRouteEnter(to, from, next) {
    localStorage.setItem("pageBeforeEnter", from.name);
    console.log(from);
    next();
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  async created() {
    try {
      let getMsgs = await MessageService.getMessages(this.getUser._id);
      this.messages = getMsgs.data;
    } catch (err) {
      console.log(err.response.data);
    }
  },
  methods: {
    stopViewingComments() {
      let page = localStorage.getItem("pageBeforeEnter");
      this.$router.push({ name: page });
      localStorage.clear();
    },
    async deleteMsg(id) {
      try {
        let msgDelete = await MessageService.delete(id);
        if (msgDelete) {
          this.refreshMsgs();
        }
      } catch (err) {}
    },
    async refreshMsgs() {
      try {
        let getMsgs = await MessageService.getMessages(this.getUser._id);
        this.messages = getMsgs.data;
      } catch (err) {
        console.log(err.response.data);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#msg {
  max-height: 250px;
  overflow-y: auto;
  background: #f8f8f8;
}
</style>

