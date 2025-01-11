import { defineStore } from "pinia";
import { ecommerceAxiosClient } from "@/utils/systemaxios";
import config from "@/utils/config";
import router from "@/router";

export const useProductStore = defineStore('product', {
    state: () => ({
        rawData: [],
        dataLimit: config.defaultDataLimit || 10,
        products: [],
        product: null,
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
            price: null,
            stock: null,
            image: null,
            category_id: null,
            _method: 'PUT'
        }
    }),

    getters: {
        getTotalCount(state) {
            return state.pagination.totalCount;
        },
    },

    actions: {
        async getAllProducts() {
            this.is_loading = true;
            try {
                const { data } = await ecommerceAxiosClient.get("/all-products");
                this.rawData = data;
             
                
                this.products = data.data;
                this.pagination.totalCount = data.metadata.count;
                this.is_loading = false;
            } catch (error) {
                this.is_loading = false;
                this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Something Went Wrong!',
                    text: this.errors.message
                });
            }
        },
        async getProducts(page = 1, limit = this.dataLimit) {
            this.is_loading = true;
            try {
                const { data } = await ecommerceAxiosClient.get("/products", {
                    params: {
                        page: page,
                        per_page: limit
                    }
                });
                console.log(data.data);
                
                this.rawData = data.data;
                this.products = data.data;
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
                });
            }
        },
        async getProduct(product_id) {
            this.is_loading = true;
            try {
                const { data } = await ecommerceAxiosClient.get(`/products/${product_id}`);
                this.product = data.data;
                this.editFormData.name = data.data.name;
                this.editFormData.description = data.data.description;
                this.editFormData.price = data.data.price;
                this.editFormData.stock = data.data.stock;
                this.editFormData.category_id = data.data.category_id;
                this.is_loading = false;
            } catch (error) {
                this.is_loading = false;
                this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Something Went Wrong!',
                    text: this.errors.message
                });
            }
        },
        async storeProduct(formData) {
            this.is_loading = true;
            try {
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                const { data } = await ecommerceAxiosClient.post('/products', formData, config);
                this.swal({
                    icon: 'success',
                    title: 'Product Added Successfully!'
                });
                this.is_loading = false;
                this.router.push({ name: 'product-index' });
            } catch (error) {
                this.is_loading = false;
                this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Something went wrong!',
                    text: this.errors.message
                });
            }
        },
        async updateProduct(formData, product_id) {
            this.is_loading = true;
            try {
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                const { data } = await ecommerceAxiosClient.post(`/products/${product_id}`, formData, config);
                this.swal({
                    icon: 'success',
                    title: 'Product Updated Successfully!'
                });
                this.is_loading = false;
                this.router.push({ name: 'product-index' });
            } catch (error) {
                this.is_loading = false;
                this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Something went wrong!',
                    text: this.errors.message
                });
            }
        },
        async deleteProduct(product_id, callback) {
            this.is_loading = true;
            try {
                const { data } = await ecommerceAxiosClient.delete(`/products/${product_id}`);
                callback('success');
                this.swal({
                    icon: 'success',
                    title: 'Product Deleted Successfully!',
                    timer: 1000,
                });
                this.is_loading = false;
            } catch (error) {
                this.is_loading = false;
                this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Something went wrong!',
                    text: this.errors.message
                });
                callback('error');
            }
        },
        async changeProductStatus(product_id) {
            this.is_loading = true;
            try {
                const { data } = await ecommerceAxiosClient.get(`/products/status/${product_id}`);
                this.is_loading = false;
                this.swal({
                    icon: 'success',
                    title: 'Status Updated Successfully!',
                    timer: 1000,
                });
            } catch (error) {
                this.is_loading = false;
                this.errors = error.response.data;
                this.swal({
                    icon: 'error',
                    title: 'Something went wrong!',
                    text: this.errors.message
                });
            }
        }
    }
});
