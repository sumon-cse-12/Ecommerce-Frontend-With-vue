<script setup>
import { ref, reactive, inject, onMounted } from "vue";
import { useCategoryStore } from "@/stores/category";
import { useRouter } from "vue-router";

const categoryStore = useCategoryStore();
const router = useRouter();
const swal = inject("$swal");
categoryStore.swal = swal;
categoryStore.router = router;

const delete_category = (id,name) => {
  swal
    .fire({
      title: "Are you sure?",
      text: `You want to delete ${name} category`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    })
    .then((result) => {
      if (result.isConfirmed) {
        categoryStore.deleteCategory(id, (status) => {
          if(status == 'success'){
            categoryStore.getCategories(1, 10);
          }
        });
      }
    }); 
};  

onMounted(() => {
  categoryStore.getCategories(1, 10);
});
</script>

<template>
  <div class="row">
    <div class="col-md-12 p-3">
      <div class="card p-3">
        <div class="d-flex">
          <div class="mr-auto">
            <h4>Category</h4>
          </div>
          <div class="ml-auto">
            <router-link to="/category/create" class="btn btn-primary"
              >Add Category</router-link
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
                <th scope="col">Image</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(category, index) in categoryStore.categories"
                :key="category.category_id"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ category.category_name }}</td>
                <td>
                  <img
                    :src="category.category_image"
                    alt="category image"
                    style="width: 50px; height: 50px"
                  />
                </td>
                <td>
                  <label class="custom-switch">
                    <input
                      type="checkbox"
                      :checked="category.is_active"
                      @change.prevent="categoryStore.changeStatusCategory(category.category_id)"
                    />
                    <span class="custom-switch-slider"></span>
                  </label>
                </td>

                <td>
                  <router-link :to="{ name: 'category-edit', params: { id: category.category_id } }"
                    class="btn btn-primary btn-sm"
                    >Edit</router-link
                  >
                  <a @click.prevent="delete_category(category.category_id, category.category_name)" class="btn btn-danger btn-sm ms-2"><i class="fas fa-trash"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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