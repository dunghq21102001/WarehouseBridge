import axios from "axios"
import noti from './common/noti'

let token
function checkToken() {
    token = localStorage.getItem('token')
    return token
    // if (token == null) return window.location.href = '/login'
}
checkToken()
const instance = axios.create({
    baseURL: 'https://localhost:5001',
    // baseURL: 'https://warehouse.bsite.net/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    },
})

instance.interceptors.request.use(
    (config) => {
        checkToken()
        config.headers['Authorization'] = 'Bearer ' + token
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            noti.error('Phiên đăng nhập đã hết hạn')
            // window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default class API {
    // auth
    static login(data) {
        return instance.post('/Login', data)
    }

    static register(data) {
        return instance.post('/Register', data)
    }

    static confirmEmail(code, userId) {
        return instance.get(`/ConfirmEmail?code=${code}&userId=${userId}`)
    }

    // Warehouses
    static warehouses() {
        return instance.get('/api/Warehouses')
    }

    static warehousesByAdmin() {
        return instance.get('/Admin/api/Warehouses')
    }

    static warehouseById(id) {
        return instance.get(`/api/Warehouses/${id}`)
    }

    static warehouseByProvider(providerId) {
        return instance.get(`/api/Warehouses/GetWarehouseByProvider/${providerId}`)
    }

    static warehouseByCategory(categoryId) {
        return instance.get(`/api/Warehouses/GetWarehouseByCategory/${categoryId}`)
    }

    static addWarehouse(data) {
        return instance.post('/Admin/api/Warehouses', data)
    }

    static deleteWarehouse(id) {
        return instance.delete(`/Admin/api/Warehouses/${id}`)
    }

    static updateWarehouse(data) {
        return instance.put(`/Admin/api/Warehouses`, data)
    }

    // warehouse detail
    static warehouseDetails() {
        return instance.get(`/api/WarehouseDetails`)
    }
    static warehouseDetailByID(id) {
        return instance.get(`/api/WarehouseDetails/${id}`)
    }
    static addWarehouseDetail(data) {
        return instance.post(`/Admin/api/WarehouseDetails`, data)
    }
    static warehouseDetailsByAdmin() {
        return instance.get(`/Admin/api/WarehouseDetails`)
    }
    static whDetailByIDAdmin(id) {
        return instance.get(`/Admin/api/WarehouseDetails/${id}`)
    }
    static updateWarehouseDetailByID(data) {
        return instance.put(`/Admin/api/WarehouseDetails`, data)
    }
    static deleteWarehouseDetailByID(id) {
        return instance.delete(`/Admin/api/WarehouseDetails/${id}`)
    }

    // provider
    static provider() {
        return instance.get('/api/Providers')
    }

    static providerById(id) {
        return instance.get(`/api/Providers/${id}`)
    }

    // Warehouses detail
    static warehouseDetailById(id) {
        return instance.get(`/api/WarehouseDetails/GetWarehouseDetailByWarehouse/${id}`)
    }

    // Warehouses image
    static imageByWarehouseId(id) {
        return instance.get(`/api/ImageWarehouses/GetImageWarehouseByWarehouse/${id}`)
    }

    //category
    static categories() {
        return instance.get('/api/Categories')
    }

    static addCategory(data) {
        return instance.post('/Admin/api/Categories', data)
    }

    static deleteCategory(id) {
        return instance.delete(`/Admin/api/Categories/${id}`)
    }

    static updateCategory(data) {
        return instance.put('/Admin/api/Categories', data)
    }

    //Provider
    static providers() {
        return instance.get('/api/Providers')
    }

    static addProvider(data) {
        return instance.post('/Admin/api/Providers', data)
    }

    static deleteProvider(id) {
        return instance.delete(`/Admin/api/Providers/${id}`)
    }

    static updateProvider(data) {
        return instance.put('/Admin/api/Providers', data)
    }

    // payment + order

    static getOrder() {
        return instance.get(`/api/Orders`)
    }

    static postOrder(WHId) {
        return instance.post(`/api/Orders?warehouseDetailId=${WHId}`)
    }

    static getOderById(id) {
        return instance.get(`/api/Orders/${id}`)
    }

}
