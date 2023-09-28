import axios from "axios"

export default class API {
    static BASE_URL = 'https://localhost:5001'

    static login(data) {
        return axios.post(`${this.BASE_URL}/Login`, data)
    }
}