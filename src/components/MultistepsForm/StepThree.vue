<script setup>
import { ref, reactive, inject } from "vue";
import { useProductStore } from "@/stores/product";
import { useRouter } from "vue-router";
import { image } from "@vee-validate/rules";
import { ErrorMessage } from "vee-validate";

const productStore = useProductStore();
const router = useRouter();
const swal = inject("$swal");

productStore.swal = swal;
productStore.router = router;

const imagePreview = ref(null);
const galleryImages = ref([]);
const hasVariant = ref(false);
const variants = ref([{ name: '', values: [{ value: '', price: '' }] }]);

const formData = reactive({
  name: null,
  description: null,
  image: null,
  galleryImages: [],
  has_variant: false,
  variants,
});

const addVariant = () => variants.value.push({ name: '', values: [{ value: '', price: '' }] });
const addVariantValue = (index) => variants.value[index].values.push({ value: '', price: '' });
const removeVariant = (index) => variants.value.splice(index, 1);
const removeVariantValue = (variantIndex, valueIndex) => variants.value[variantIndex].values.splice(valueIndex, 1);

const onFileChange = (e) => {
  const file = e.target.files[0];
  formData.image = file;
  const reader = new FileReader();
  reader.onload = (e) => imagePreview.value = e.target.result;
  reader.readAsDataURL(file);
};

const onGalleryFileChange = (e) => {
  formData.galleryImages = e.target.files;
  const imagesArray = [];
  Array.from(e.target.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => imagesArray.push(e.target.result);
    reader.readAsDataURL(file);
  });
  galleryImages.value = imagesArray;
};

const removeGalleryImage = (index) => galleryImages.value.splice(index, 1);

const onChangeHasVariant = (e) => {
  formData.has_variant = e.target.checked;
  if (!formData.has_variant) formData.variants = [{ name: '', values: [{ value: '', price: '' }] }];
};

const saveProductData = () => {
  productStore.storeProduct(formData);
};
</script>


<template>
  <div class="row">    
    <div class="col-12">
      <div class="card m-2">
        <form @submit.prevent="saveProductData" enctype="multipart/form-data">
          <div class="card-body">
            <h4>General Information</h4>
            <div class="row">
              <!-- Product Name -->
              <div class="col-md-12 col-lg-6 mb-3">
                <div class="form-group">
                  <label>Product Name</label>
                  <input type="text" v-model="formData.name" name="name" class="form-control"
                    placeholder="Enter Product Name" />
                </div>
              </div>

              <!-- Product Description -->
              <div class="col-md-12 col-lg-6 mb-3">
                <div class="form-group">
                  <label>Product Description</label>
                  <textarea class="form-control" v-model="formData.description" name="description" cols="3" rows="3"
                    placeholder="Enter Product Description"></textarea>
                </div>
              </div>

              <!-- Previous Price -->
              <div class="col-md-6 mb-3">
                <div class="form-group">
                  <label>Previous Price</label>
                  <input type="number" v-model="formData.previous_price" name="previous_price" class="form-control"
                    placeholder="Enter Previous Price" />
                </div>
              </div>

              <!-- Discount Price -->
              <div class="col-md-6 mb-3">
                <div class="form-group">
                  <label>Discount Price</label>
                  <input type="number" v-model="formData.discount_price" name="discount_price" class="form-control"
                    placeholder="Enter Discount Price" />
                </div>
              </div>
            </div>

            <!-- Product Variant Section -->
            <div class="row">
              <div class="col-md-12 mb-3">
                <strong>Has Variant</strong>
                <div class="form-group mt-3">
                  <label class="custom-switch">
                    <input type="checkbox" v-model="formData.has_variant" @change="onChangeHasVariant" />
                    <span class="custom-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Variant Details -->
              <div class="col-12" v-if="formData.has_variant">

                <h4>Product Variants</h4>
                <div v-for="(variant, variantIndex) in variants" :key="variantIndex" class="mb-4">
                  <div class="form-group">
                    <label>Variant Name</label>
                    <input type="text" class="form-control" v-model="variant.name" placeholder="Enter Variant Name" />
                  </div>

                  <!-- Variant Values -->
                  <div v-for="(value, valueIndex) in variant.values" :key="valueIndex" class="mb-2">
                    <div class="row">
                      <div class="col-md-5 mb-2">
                        <input type="text" class="form-control" v-model="value.value" placeholder="Enter Value" />
                      </div>
                      <div class="col-md-5 mb-2">
                        <input type="text" class="form-control" v-model="value.sku" placeholder="Enter SKU" />
                      </div>
                      <div class="col-md-5 mb-2">
                        <input type="text" class="form-control" v-model="value.stock" placeholder="Enter Stock" />
                      </div>
                      <div class="col-md-5 mb-2">
                        <input type="number" class="form-control" v-model="value.price" placeholder="Enter Price" />
                      </div>
                      <div class="col-md-2">
                        <button class="btn btn-danger"
                          @click="removeVariantValue(variantIndex, valueIndex)">Remove</button>
                      </div>
                    </div>
                  </div>
                  <button type="button" class="btn btn-primary mt-2" @click="addVariantValue(variantIndex)">Add
                    Value</button>
                  <button type="button" class="btn btn-danger mt-2 ml-2" @click="removeVariant(variantIndex)">Remove
                    Variant</button>
                </div>
                <button type="button" class="btn btn-success" @click="addVariant">Add Variant</button>
              </div>
            </div>

            <!-- Image Upload Section -->
            <div class="col-md-12 mb-3">
              <div class="form-group">
                <label>Upload Image</label>
                <input type="file" name="image" class="form-control" @change="onFileChange" accept="image/*" />
              </div>
            </div>

            <div class="col-md-12 mb-3" v-if="imagePreview">
              <h5>Image Preview:</h5>
              <img :src="imagePreview" alt="Uploaded Image" class="img-preview" />
            </div>

            <!-- Gallery Images Section -->
            <div class="col-md-12 mb-3">
              <div class="form-group">
                <label>Gallery Images</label>
                <input type="file" name="gallery_images" class="form-control" multiple @change="onGalleryFileChange"
                  accept="image/*" />
              </div>
            </div>

            <div class="col-md-12 mb-3" v-if="galleryImages.length">
              <h5>Gallery Image Previews:</h5>
              <div class="row">
                <div v-for="(image, index) in galleryImages" :key="index" class="col-md-2 mb-2">
                  <img :src="image" alt="Gallery Image" class="img-preview" />
                  <i class="fas fa-trash img-preview-delete-icon" @click="removeGalleryImage(index)"></i>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-info">Submit</button>
        </form>

      </div>
    </div>
  </div>
</template>



<style scoped>
.img-preview {
  width: 200px;
  height: 170px;
  object-fit: cover;
  border: 1px solid rgb(85, 83, 83);
}

.position-relative {
  position: relative;
}

.fas.fa-trash {
  cursor: pointer;
}

.fas.fa-trash:hover {
  color: red;
}

.img-preview-delete-icon {
  position: relative;
  bottom: 40%;
  right: 6%;
  color: #ef0a0a;
  background: #ffffff;
  text-align: center;
  padding: 6px 5px 6px 4px;
  font-size: 15px;
}

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

input:checked+.custom-switch-slider {
  background-color: #007bff;
}

input:checked+.custom-switch-slider:before {
  transform: translateX(25px);
}
</style>
