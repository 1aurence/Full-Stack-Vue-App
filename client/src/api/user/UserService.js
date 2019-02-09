const axios = require('axios')
const url = 'api/user/'
class UserService {
    static async create(username, email, password) {
        const user = {
            username,
            email,
            password
        }
        return axios.post(url + 'create', user)
    }
    static async login(username, password) {
        const user = {
            username,
            password
        }
        return axios.post(url + 'login', user)

    }
    static async getUserInfo(id) {
        return axios.get(url + 'user-info', id)

    }
    static async updateUsername(currentUsername, newUsername) {
        return axios.put(url + currentUsername, {
            newUsername
        })
    }
}
export default UserService