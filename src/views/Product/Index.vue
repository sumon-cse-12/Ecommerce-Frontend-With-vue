<script setup>
import { ref, reactive, inject, onMounted } from "vue";
import { useProductStore } from "@/stores/product";
import { useRouter } from "vue-router";
import config from "@/utils/config";

const productStore = useProductStore();
const router = useRouter();
const swal = inject("$swal");
productStore.swal = swal;
productStore.router = router;

const delete_product = (id, name) => {
  swal
    .fire({
      title: "Are you sure?",
      text: `You want to delete the product "${name}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    })
    .then((result) => {
      if (result.isConfirmed) {
        productStore.deleteProduct(id, (status) => {
          if (status == "success") {
            productStore.getProducts(1, 10);
          }
        });
      }
    });
};

onMounted(() => {
  productStore.getProducts(1, 10); 
});
</script>


<template>
  <div class="row">
    <div class="col-md-12 p-3">
      <div class="card p-3">
        <div class="d-flex">
          <div class="mr-auto">
            <h4>Products</h4>
          </div>
          <div class="ml-auto">
            <router-link to="/product/create" class="btn btn-primary"
              >Add Product</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="table-responsive">
          <table class="table table-striped text-primary">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Image</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, index) in productStore.products"
                :key="product.product_id"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ product.product_name }}</td>
                <td>{{ product.product_description }}</td>
                <td>999</td>
                <td>23</td>
                <td>
                  <img
                    :src="`${config.ecommerceApiHost}uploads/${product.product_image}`"
                    alt="product image"
                    style="width: 50px; height: 50px"
                  />
                </td>
                <td>
                  <label class="custom-switch">
                    <input
                      type="checkbox"
                      :checked="product.is_active"
                      @change.prevent="productStore.changeStatus(product.product_id)"
                    />
                    <span class="custom-switch-slider"></span>
                  </label>
                </td>
                <td>
                  <router-link
                    :to="{ name: 'product-edit', params: { id: product.product_id } }"
                    class="btn btn-primary btn-sm"
                    >Edit</router-link
                  >
                  <a
                    @click.prevent="delete_product(product.product_id, product.product_name)"
                    class="btn btn-danger btn-sm ms-2"
                    ><i class="fas fa-trash"></i
                  ></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="d-flex justify-content-end mt-3">
        <v-pagination
          v-model="productStore.pagination.current_page"
          :pages="productStore.pagination.last_page"
          :range="1"
          active-color="#fff"
          @update:modelValue="
            productStore.getProducts(
              productStore.pagination.current_page,
              productStore.dataLimit
            )
          "
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
}

.custom-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.custom-switch-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 25px;
  transition: 0.4s;
}

.custom-switch-slider:before {
  position: absolute;
  content: "";
  height: 19px;
  width: 19px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}

input:checked + .custom-switch-slider {
  background-color: #007bff;
}

input:checked + .custom-switch-slider:before {
  transform: translateX(25px);
}
</style>