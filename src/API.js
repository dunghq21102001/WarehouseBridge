import axios from "axios";

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
        // Trước mỗi yêu cầu API, kiểm tra token
        checkToken();
        // Thêm token vào tiêu đề Authorization
        config.headers['Authorization'] = 'Bearer ' + token;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default class API {
    // auth
    static login(data) {
        return instance.post('/Login', data);
    }

    static register(data) {
        return instance.post('/Register', data);
    }

    static confirmEmail(code, userId) {
        return instance.get(`/ConfirmEmail?code=${code}&userId=${userId}`);
    }

    // Warehouses
    static warehouses() {
        return instance.get('/api/Warehouses');
    }

    static warehouseById(id) {
        return instance.get(`/api/Warehouses/${id}`);
    }

    static warehouseByProvider(providerId) {
        return instance.get(`/api/Warehouses/GetWarehouseByProvider/${providerId}`);
    }

    static warehouseByCategory(categoryId) {
        return instance.get(`/api/Warehouses/GetWarehouseByCategory/${categoryId}`);
    }

    static addWarehouse(data) {
        return instance.post('/Admin/api/Warehouses', data);
    }

    static deleteWarehouse(id) {
        return instance.delete(`/Admin/api/Warehouses/${id}`)
    }

    // provider
    static provider() {
        return instance.get('/api/Providers');
    }

    static providerById(id) {
        return instance.get(`/api/Providers/${id}`);
    }

    // Warehouses detail
    static warehouseDetailById(id) {
        return instance.get(`/api/WarehouseDetails/GetWarehouseDetailByWarehouse/${id}`);
    }

    // Warehouses image
    static imageByWarehouseId(id) {
        return instance.get(`/api/ImageWarehouses/GetImageWarehouseByWarehouse/${id}`);
    }
}
