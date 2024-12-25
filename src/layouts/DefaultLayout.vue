<template>
  <Navbar />
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->

    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <router-view> </router-view>
    </section>
    <!-- /.content -->
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
</script>