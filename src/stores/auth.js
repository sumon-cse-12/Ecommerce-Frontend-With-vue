import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {baseClient, ecommerceAxiosClient} from '@/utils/systemaxios';
export const useAuthStore = defineStore('auth', {
  state: () => ({
   token: localStorage.getItem('token') || '',
   unsername: localStorage.getItem('username') || '',
   error:[],
   message:[],

   
  }),
  getters: {
    getToken: (state) => state.token,
    getUsername: (state) => state.username,
    getError: (state) => state.error,
    getMessage: (state) => state.message,
  },

  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
  },
  setUsername(name) {
    this.username = name
    localStorage.setItem('username', name)
  },

  removeToken: () => {
    localStorage.removeItem('token')
  },
  removeUsername: () => {
    localStorage.removeItem('username')
  },

  async login(formData, callback) {
    try {
    
      const response = await baseClient.get('/sanctum/csrf-cookie');

    
      const {data,status} = await ecommerceAxiosClient.post('/login', formData);
      console.log(data) ;
      if(data){
        this.setToken(data.token);
        this.setUsername(data.name);
        this.message = data.message;
        callback(data.status); 
      }
      
     
    } catch (error) {
      this.error = error.response.data;
          this.removeToken();
          this.message = error.response?.data?.message
          callback(error);
    }
  },

  // async login(formData, callback) {
  //   try {
  //     const response =  await baseClient.get('/sanctum/csrf-cookie'); // Get CSRF token
  //     const { data } = await ecommerceAxiosClient.post('/login', formData);

  //     this.setToken(data.token);
  //     this.setUsername(data.username);
  //     if (callback) callback(data);
  //   } catch (error) {
  //     this.error = error.response?.data || ['An unexpected error occurred.'];
  //   }
  // },
  

}
})
