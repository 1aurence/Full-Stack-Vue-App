const axios = require('axios')
const url = "/api/comment/"
class CommentService {

    static async comment(postId, authorId, body) {
        return axios.post(url + 'create/', {
            postId,
            authorId,
            body
        })
    }
    static async showPostComments(postId) {
        return axios.get(url + 'post-comments/' + postId)
    }
}
export default CommentService