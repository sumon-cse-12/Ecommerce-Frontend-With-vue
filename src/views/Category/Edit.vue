<script setup>
import { ref, reactive, inject, onMounted } from "vue";
import { useCategoryStore } from "@/stores/category";
import { useRouter, useRoute } from "vue-router";
import { image } from "@vee-validate/rules";
import { ErrorMessage } from "vee-validate";

const categoryStore = useCategoryStore();
const router = useRouter();
const route = useRoute();
const swal = inject("$swal");
categoryStore.swal = swal;
categoryStore.router = router;

const schema = {
  name: "required",
  description: "required",
  image: "required",
};

const oncChange = (e) => {
    categoryStore.editFormData.image = e.target.files[0];
  
};

const updateCategoryData = () =>{
    categoryStore.updateCategory(categoryStore.editFormData,route.params.id);
}
onMounted(() => {
  categoryStore.getCategory(route.params.id);
});
</script>
<template>
  <div class="row">
    <div class="col-md-12 p-3">
      <div class="card p-3">
        <div class="d-flex">
          <div class="mr-auto">
            <h4>Create</h4>
          </div>
          <div class="ml-auto">
            <router-link :to="{name:'category-index'}" class="btn btn-primary">Back</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <vee-form :validation-schema="schema" @submit="updateCategoryData" enctype="multipart/form-data">
                    <div class="row">
                        <div class="col-md-6">
                           <label for="">Category Name</label>
                           <vee-field type="text"   v-model="categoryStore.editFormData.name" class="form-control" name="name" placeholder="Enter Name"/>
                           <ErrorMessage name="name" class="text-danger" />
                        </div>
                        <div class="col-md-6">
                            <label for="">Category Description</label>
                            <vee-field  as="textarea" v-model="categoryStore.editFormData.description"  type="text" class="form-control" name="description" placeholder="Enter Description"/>
                            <ErrorMessage name="description" class="text-danger" />
                          </div>
                        <div class="col-md-6 mb-3">
                            <label for="">Category Image</label>
                            <vee-field type="file" @change="oncChange" class="form-control" name="image"/>
                            <ErrorMessage name="image" class="text-danger" />
                        </div>
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary">Update</button>
                        </div>  
                    </div>
                </vee-form>
            </div>
        </div>
    </div>
  </div>
</template>