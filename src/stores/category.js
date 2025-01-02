import { defineStore } from "pinia";
import { ecommerceAxiosClient } from "@/utils/systemaxios";
import config from "@/utils/config";
import router from "@/router";
import { is } from "@vee-validate/rules";

export const useCategoryStore = defineStore('category', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        categories: [],
        category: null,
        errors: [],
        is_loading: false,
        swal: null,
        router: null,
        pagination: {
            current_page: 1,
            last_page: 0,
            totalCount: 0,
        },
        editFormData: {
            name: null,
            description: null,
            image: null,
            _method: 'PUT'
        }
    }),

    getters: {
        getTotalCount(state){
            return state.pagination.totalCount;
        },
    },

    actions: {
        async getAllCategories(){
            this.is_loading = true;
            try {
                const {data}= await ecommerceAxiosClient.get("/all-categories");
                this.rawData = data;
                this.categories = data.data;
                this.pagination.totalCount = data.metadata.count;
                this.is_loading = false;
            } catch (error) {
                this.is_loading = false;
                this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Something Went Wrong!',
                    text: this.errors.message
                })
            }
        },
        async getCategories(page=1, limit = this.dataLimit){
            this.is_loading = true;
            try {
                const { data } = await ecommerceAxiosClient.get("/categories", {
                    params: {
                        page: page,
                        per_page: limit
                    }
                });
                console.log(data);
                this.rawData = data.data;
                this.categories = data.data;
                this.pagination.current_page = data.data.current_page;
                this.pagination.last_page = data.data.last_page;
                this.pagination.totalCount = data.data.total;
                this.is_loading = false;
            } catch (error) {
                this.is_loading = false;
               this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Something Went Wrong!',
                    text: this.errors.message
                })
            }
        },
        async getCategory(category_id){
            this.is_loading = true;
            try {
                const { data } = await ecommerceAxiosClient.get(`/categories/${category_id}`);
                console.log(data);
                this.category = data.data;
                this.editFormData.name = data.data.category_name;
                this.editFormData.description = data.data.category_description;
                this.is_loading = false;
            } catch (error) {
                this.is_loading = false;
                this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Something Went Wrong!',
                    text: this.errors.message
                })
            }
        },
        async storeCategory(formData){
            this.is_loading = false;
            try {
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                const {data} = await ecommerceAxiosClient.post('/categories', formData, config);
                console.log(data);
                this.swal({
                    icon: 'success',
                    title: 'Data Stored Successfully!'
                });
                this.is_loading = false;
                this.router.push({name: 'category-index'});
            } catch (error) {
                this.is_loading = false;
                console.log(error);
                this.errors = error.response.data;
                this.swal({
                    icon:'error',
                    title: 'Something went wrong!',
                    text: this.errors
                })
            }
        },
        async updateCategory(formData, category_id){
            this.is_loading = false;
            try {
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                const {data} = await ecommerceAxiosClient.post(`/categories/${category_id}`, formData, config);
                this.swal({
                    icon: 'success',
                    title: 'Data Updated Successfully!'
                });
                this.is_loading = false;
                this.router.push({name: 'category-index'});
            } catch (error) {
                this.is_loading = false;
                console.log(error);
                this.errors = error.response.data;
                this.swal({
                    icon:'error',
                    title: 'Something went wrong!',
                    text: this.errors
                })
            }
        },
        async deleteCategory(category_id, callback){
            this.is_loading = false;
            try {
                const { data } = await ecommerceAxiosClient.delete(`/categories/${category_id}`);
                callback('success');
                this.swal({
                    icon: 'success',
                    title: 'Action Performed Successfully',
                    timer: 1000,
                })
                this.is_loading = false;
            } catch (error) {
                this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Something went wrong!!',
                    timer: 1000,
                    text: this.errors.message
                })
                callback('error');
                this.is_loading = false;
            }
        },
  async changeStatus(category_id){
            this.is_loading = true;
            try {
                const { data } = await ecommerceAxiosClient.get(`/categories/status/${category_id}`);
                this.is_loading = false;
                this.swal({
                    icon: 'success',
                    title: 'Status Updated!',
                    timer: 1000,
                })
            } catch (error) {
                this.errors = error.response.data;
                this.is_loading = false;
                this.swal({
                    icon: 'error',
                    title: 'Something went wrong!!',
                    timer: 1000,
                    text: this.errors.message
                })
            }
        },
    }


});