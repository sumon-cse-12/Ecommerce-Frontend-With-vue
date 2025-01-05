<script setup>
import { ref } from 'vue';

const imagePreview = ref(null);
const galleryImages = ref([]);  // To hold multiple images

// Function to handle the main image preview
const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// Function to handle gallery images and provide previews
const onGalleryFileChange = (e) => {
  const files = e.target.files;
  const imagesArray = [];

  // Loop through the selected files and create image previews
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagesArray.push(e.target.result);  // Push each image preview to the array
      galleryImages.value = [...imagesArray];  // Update the galleryImages array
    };
    reader.readAsDataURL(files[i]);
  }
};

// Function to remove image from the gallery
const removeGalleryImage = (index) => {
  galleryImages.value.splice(index, 1);  // Remove image at the specified index
};
</script>

<template>
  <div class="row">
    <div class="col-12">
      <div class="card m-2">
        <div class="card-body">
          <h4>General Information</h4>

          <div class="product-information-sec">
            <div class="row">
              <div class="col-md-12 mb-3">
                <div class="form-group">
                  <label for="">Product Name</label>
                  <input type="text" class="form-control" placeholder="Enter Product Name" />
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <div class="form-group">
                  <label for="">Product Description</label>
                  <textarea class="form-control" name="description" cols="3" rows="3"></textarea>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="form-group">
                  <label for="">Previous Price</label>
                  <input type="number" class="form-control" placeholder="Enter Previous Price" />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="form-group">
                  <label for="">Discount Price</label>
                  <input type="number" class="form-control" placeholder="Enter Discount Price" />
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <strong>Has Varient</strong>
                <div class="form-group mt-3">
                
                  <label class="custom-switch">
                    <input type="checkbox"/>
                    <span class="custom-switch-slider"></span>
                  </label>
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <div class="form-group">
                  <label for="imageUpload">Upload Image</label>
                  <input type="file" class="form-control" id="imageUpload" @change="onFileChange" accept="image/*" />
                </div>
              </div>

              <!-- Image Preview -->
              <div class="col-md-12 mb-3" v-if="imagePreview">
                <div class="mt-3">
                  <h5>Image Preview:</h5>
                  <img :src="imagePreview" alt="Uploaded Image" class="img-preview" />
                </div>
              </div>

              <!-- Gallery Image -->
              <div class="col-md-12 mb-3">
                <div class="form-group">
                  <label for="galleryImages">Gallery Images</label>
                  <input
                    type="file"
                    name="gallery_images"
                    class="form-control"
                    multiple
                    @change="onGalleryFileChange"
                    accept="image/*"
                  />
                </div>
              </div>

              <!-- Gallery Images Preview -->
              <div class="col-md-12 mb-3" v-if="galleryImages.length">
                <div class="mt-3">
                  <h5>Gallery Image Previews:</h5>
                  <div class="row">
                    <div v-for="(image, index) in galleryImages" :key="index" class="col-md-2 mb-2">
                      <img :src="image" alt="Gallery Image" class="img-preview" />
                      <!-- Delete Icon -->
                      <i
                        class="fas fa-trash img-preview-delete-icon"
                        @click="removeGalleryImage(index)"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

input:checked + .custom-switch-slider {
  background-color: #007bff;
}

input:checked + .custom-switch-slider:before {
  transform: translateX(25px);
}
</style>
