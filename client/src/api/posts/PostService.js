const axios = require('axios')
const url = '/api/post/'
const url2 = '/api/user/'

class PostService {
    static async getPosts() {
        return axios.get(url + 'posts')
    }
    static async getUserPosts(userId) {
        return axios.get(url2 + 'user-posts/' + userId)
    }
    static async deletePost(postId) {
        return axios.delete(url + 'delete/' + postId)
    }
    static async createPost(post) {
        return axios.post(url + 'create', post)
    }
    static async comment(postId,authorId,body) {
        return axios.post(url + 'comment', {postId, authorId, body})
    }
    static async showPostComments(postId) {
        return axios.get(url + 'comments/', postId)
    }

}
export default PostService