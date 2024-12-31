<script setup>
import { ref, reactive, inject } from "vue";
import { useCategoryStore } from "@/stores/category";
import { useRouter } from "vue-router";

const categoryStore = useCategoryStore();
const router = useRouter();
const swal = inject("$swal");
categoryStore.swal = swal;
categoryStore.router = router;


 
</script>
<template>
    Create
</template>