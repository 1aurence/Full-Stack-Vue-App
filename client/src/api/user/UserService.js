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
    static async login(username, password) {
        const user = {
            username,
            password
        }
        try {
            let getUser = await axios.post(url + 'login', user)
            if (getUser.status === 200) {
                return getUser
            }
        } catch (err) {

            return err
        }


    }
    static async getUserInfo(id) {
        return axios.get(url + 'user-info', id)

    }
}
export default UserService