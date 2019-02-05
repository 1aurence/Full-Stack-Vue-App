const axios = require('axios')
const url = 'http://localhost:3000/api/user/'
class UserService {
    static async create(username, email, password) {
        const user = {
            username,
            email,
            password
        }
        return axios.post(url + 'create', user)
    }
    static async getUser() {

    }
}
export default UserService