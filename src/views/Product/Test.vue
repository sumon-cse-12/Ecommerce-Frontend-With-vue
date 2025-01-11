<script setup>
import { ref } from 'vue';

// Dynamic variant inputs
const hasVariant = ref(false);
const variants = ref([{ name: '', values: [{ value: '', price: '' }] }]);

// Add a new variant
const addVariant = () => {
  variants.value.push({
    name: '', // Variant name
    values: [{ value: '', price: '' }], // Array of values with prices
  });
};

// Add a new value to a specific variant
const addVariantValue = (index) => {
  variants.value[index].values.push({ value: '', price: '' });
};

// Remove a variant
const removeVariant = (index) => {
  variants.value.splice(index, 1);
};

// Remove a specific value from a variant
const removeVariantValue = (variantIndex, valueIndex) => {
  variants.value[variantIndex].values.splice(valueIndex, 1);
};
</script>

<template>
  <div>
    <div class="form-group">
      <strong>Has Variant</strong>
      <label class="custom-switch">
        <input type="checkbox" v-model="hasVariant" />
        <span class="custom-switch-slider"></span>
      </label>
    </div>

    <div v-if="hasVariant" class="variant-section">
      <h4>Product Variants</h4>

      <div v-for="(variant, variantIndex) in variants" :key="variantIndex" class="mb-4">
        <!-- Variant Name -->
        <div class="form-group">
          <label for="">Variant Name</label>
          <input
            type="text"
            class="form-control"
            v-model="variant.name"
            placeholder="Enter Variant Name"
          />
        </div>

        <!-- Variant Values -->
        <div v-for="(value, valueIndex) in variant.values" :key="valueIndex" class="mb-2">
          <div class="row">
            <div class="col-md-5">
              <input
                type="text"
                class="form-control"
                v-model="value.value"
                placeholder="Enter Value"
              />
            </div>
            <div class="col-md-5">
              <input
                type="number"
                class="form-control"
                v-model="value.price"
                placeholder="Enter Price"
              />
            </div>
            <div class="col-md-2">
              <button
                class="btn btn-danger"
                @click="removeVariantValue(variantIndex, valueIndex)"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <!-- Add Variant Value -->
        <button class="btn btn-primary mt-2" @click="addVariantValue(variantIndex)">
          Add Value
        </button>

        <!-- Remove Variant -->
        <button class="btn btn-danger mt-2" @click="removeVariant(variantIndex)">
          Remove Variant
        </button>
      </div>

      <!-- Add Variant -->
      <button class="btn btn-success" @click="addVariant">Add Variant</button>
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
  content: '';
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
