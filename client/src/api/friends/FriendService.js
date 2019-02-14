const axios = require('axios')
const url = "/api/friend/"
class FriendService {
    static async addFriend(requestingUser, recievingUser) {
        return axios.post(url + 'add', {
            requestingUser,
            recievingUser
        })
    }
    static async removeFriend(to, from) {
        return axios.delete(`${url}remove/${to}/${from}`)
    }
    static async getFriends(id) {
        return axios.get(url + id)
    }
    static async getPendingFriendRequests(id) {
        return axios.get(url + '/requests/' + id)
    }
    static async acceptFriendRequest(to, from) {
        return axios.post(url + 'accept', {
            to,
            from
        })
    }
}

export default FriendService