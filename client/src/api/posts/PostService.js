const axios = require('axios')
const url = '/api/post/'

class PostService {
    static async getPosts() {
        return axios.get(url + 'posts')
    }
    static async getUserPosts(userId) {
        return axios.get(url + 'user-posts/' + userId)
    }
    static async deletePost(postId) {
        return axios.delete(url + 'delete/' + postId)
    }
    static async createPost(post) {
        return axios.post(url + 'create', post)
    }


}
export default PostService