<script setup>
import { ref, reactive, inject } from "vue";
import { useCategoryStore } from "@/stores/category";
import { useRouter } from "vue-router";
import { image } from "@vee-validate/rules";
import { ErrorMessage } from "vee-validate";

const categoryStore = useCategoryStore();
const router = useRouter();
const swal = inject("$swal");
categoryStore.swal = swal;
categoryStore.router = router;

const formData = reactive({
  name: null,
  description: null,
  image: null,
});

const schema = {
  name: "required",
  description: "required",
  image: "required",
};

const oncChange = (e) => {
  formData.image = e.target.files[0];
  
};

const saveCategoryData = () =>{
  categoryStore.storeCategory(formData);
}
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
                <vee-form :validation-schema="schema" @submit="saveCategoryData" enctype="multipart/form-data">
                    <div class="row">
                        <div class="col-md-6">
                           <label for="">Category Name</label>
                           <vee-field type="text" v-model="formData.name" class="form-control" name="name" placeholder="Enter Name"/>
                           <ErrorMessage name="name" class="text-danger" />
                        </div>
                        <div class="col-md-6">
                            <label for="">Category Description</label>
                            <vee-field  as="textarea" v-model="formData.description"  type="text" class="form-control" name="description" placeholder="Enter Description"/>
                            <ErrorMessage name="description" class="text-danger" />
                          </div>
                        <div class="col-md-6 mb-3">
                            <label for="">Category Image</label>
                            <vee-field type="file" @change="oncChange" class="form-control" name="image" placeholder="Enter Description"/>
                            <ErrorMessage name="image" class="text-danger" />
                        </div>
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>  
                    </div>
                </vee-form>
            </div>
        </div>
    </div>
  </div>
</template>