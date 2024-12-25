export default {
    appName: 'Laravel Ecommerce',
    appVersion: '1.0.0',
    defaultDataLimit: 10,
    ecommerceApiHost: import.meta.env.VITE_API_URL,
    apiToken: localStorage.getItem('token'),
    requestTimeOut: 5000,


}