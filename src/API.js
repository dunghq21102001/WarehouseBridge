import axios from "axios"
export default class API {
    static BASE_URL = 'https://localhost:5001'


    // auth
    static login(data) {
        return axios.post(`${this.BASE_URL}/Login`, data)
    }
    static register(data) {
        return axios.post(`${this.BASE_URL}/Register`, data)
    }
    static confirmEmail(code, userId) {
        return axios.get(`${this.BASE_URL}/ConfirmEmail?code=${code}&userId=${userId}`)
    }

    //Warehouses
    static warehouses() {
        return axios.get(`${this.BASE_URL}/api/Warehouses`)
    }
    static warehouseById(id) {
        return axios.get(`${this.BASE_URL}/api/Warehouses/${id}`)
    }
    static warehouseByProvider(providerId) {
        return axios.get(`${this.BASE_URL}/api/Warehouses/GetWarehouseByProvider/${providerId}`)
    }
    static warehouseByCategory(categoryId) {
        return axios.get(`${this.BASE_URL}/api/Warehouses/GetWarehouseByCategory/${categoryId}`)
    }
    static provider() {
        return axios.get(`${this.BASE_URL}/api/Providers`)
    }
    static providerById(id) {
        return axios.get(`${this.BASE_URL}/api/Providers/${id}`)
    }

    // Warehouses detail
}