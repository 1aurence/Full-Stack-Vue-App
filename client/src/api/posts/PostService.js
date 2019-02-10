const axios = require('axios')
const url = 'api/post/'
const url2 = 'api/user/'

class PostService {
    static async getUserPosts(userId) {
        return axios.get(url2 + 'user-posts/' + userId)
    }
    static async deletePost(postId) {
        return axios.delete(url + 'delete/' + postId)
    }

}
export default PostService