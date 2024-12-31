import { defineStore } from "pinia";
import { ecommerceAxiosClient } from "@/utils/systemaxios";
import config from "@/utils/config";
import router from "@/router";
import { is } from "@vee-validate/rules";

export const useCategoryStore = defineStore("category", {

state: () => ({

    rawData: [],
    dataLimit: config.defaultDataLimit || 10,
    totalData: 0,
    currentPage: 1,
    categories: [],
    isLoading: false,
    swal: null,
    router: null,
    error: [],
    message: [],
    category: null,
    pagination: {
        currentPage: 1,
        lastPage: 0,
        totalCount: 0,
    }
}),

getters: {
   getTotalCount(state) {
       return state.pagination.totalCount;
   }    
},

actions: {
    async getAllCategories() {
        this.isLoading = true;
        try {
            const { data } = await ecommerceAxiosClient.get("/all-categories");
            this.rawData = data;
            this.category = data.data;
            this.pagination.totalCount = 10;            
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            this.error = error.response.data;
            this.swal.fire({
                icon: "error",
                title: "Something went wrong!",
                text: this.error.message,
            }); 
            
        }

    },

    async getCategories(page = 1, limit = this.dataLimit) {

        this.isLoading = true;
        try {
            const { data } = await ecommerceAxiosClient.get("/category", {
                params: {
                    page: this.currentPage,
                    limit: this.dataLimit,
                },
            });

            console.log(data.data);  
            

            this.rawData = data;
            this.categories = data.data;
            this.isLoading = false;

        } catch (error) {
            this.isLoading = false;
            this.error = error.response.data;
            this.swal.fire({
                icon: "error",
                title: "Something went wrong!",
                text: this.error.message,
            });
        }   

    },

    async getCategory(){

    },

    async storeCategory(){

    },

    async updateCategory(){

    },

    async deleteCategory(category_id, callback){

        this.isLoading = false;
        try{

            const {data} = await ecommerceAxiosClient.delete(`/category/${category_id}`);
            callback('success');
            this.swal({
                icon: "success",
                title: "Category Deleted!",
                timer: 2000,
            })
            this.isLoading = false;

        }catch(error){
           
            this.error = error.response.data;
           
            this.swal({
                icon: "error",
                title: "Something went wrong!",
                text: this.error.message,
                timer: 2000,    
            })
            callback('error');
            this.isLoading = false;

        }
    }


    },

    async changeStatusCategory(category_id){
        this.isLoading = true;
        try{
            const {data} = await ecommerceAxiosClient.get(`/category/status/${category_id}`);
            this.isLoading = false;
            this.swal.fire({
                icon: "success",
                title: "Status Updated!",
                timer: 2000,
            });

        }catch(error){
            this.error = error.response.data;
            this.isLoading = false;
            this.swal.fire({
                icon: "error",
                title: "Something went wrong!",
                text: this.error.message,
                timer: 2000,
            });
        }
    }

});