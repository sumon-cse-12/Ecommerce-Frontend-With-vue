import { defineStore } from "pinia";
import { ecommerceAxiosClient } from "@/utils/systemaxios";
import config from "@/utils/config";
import router from "@/router";

export const useCategoryStore = defineStore("category", {

state: () => ({

    rawData: [],
    dataLimit: config.defaultDataLimit || 10,
    totalData: 0,
    currentPage: 1,
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

    },

    async getCategories() {

    },

    async getCategory(){

    },

    async storeCategory(){

    },

    async updateCategory(){

    },

    async deleteCategory(){

    },

    async changeStatusCategory(){

    }

}

});