import axios from "axios";
import config from  './config'

const baseClient = axios.create({
    baseURL: config.ecommerceApiHost,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',

    }
})

const ecommerceAxiosClient = axios.create({
    baseURL: config.ecommerceApiHost+'api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Bearer ${config.apiToken}`,
    }
})

export { baseClient, ecommerceAxiosClient }