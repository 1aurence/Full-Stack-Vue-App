const axios = require('axios')
const url = "/api/message/"

class MessageService {
    static async getMessages(id) {
        return axios.get(url + id)
    }
    static async delete(id) {
        return axios.delete(url + '/delete/' + id)
    }
    static async send(msg) {
        return axios.post(url + '/create', msg)
    }
}
export default MessageService