<script setup>
import { useAuthStore } from '@/stores/auth';
import { ErrorMessage } from 'vee-validate';
import { ref, reactive, inject } from 'vue';
import { useRouter } from 'vue-router';


const swal = inject('$swal');
const router = useRouter();
const authStore = useAuthStore();

const loginForm = reactive({
  email: '',
  password: '',
});

const schema = reactive({
    email: 'required|email',
    password: 'required|min:6',
})

const login = () => {
    authStore.login(loginForm, (status) => {
        if(status == 'success') {
           swal({
            'icon': 'success',
            'title': authStore.message,
            'timer': 2000,
           });
              router.push({name: 'dashboard'});
        }else{
            swal({
                'icon': 'error',
                'title': authStore.message,
                'timer': 2000,  
            });
            router.push({name: 'login'});

        }
    });
}
</script>

<template>

<div class="login-page">
    <div class="login-box">
  <div class="login-logo">
    <a href="../../index2.html"><b>Admin</b>LTE</a>
  </div>
  <!-- /.login-logo -->
  <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg">Sign in to start your session</p>
        <vee-form :validation-schema="schema" @submit="login" class="mt-4 pt-2">
        <div class="input-group mb-3">
          <vee-field v-model="loginForm.email" type="email" name="email" class="form-control" placeholder="Email"/>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
            <ErrorMessage class="text-danger" name="email" />
        </div>
        <div class="input-group mb-3">
          <vee-field v-model="loginForm.password" name="password" type="password" class="form-control" placeholder="Password"/>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
          <ErrorMessage class="text-danger" name="password" />
        </div>
        <div class="row">
          <!-- /.col -->
          <div class="col-12">
            <button type="submit" class="btn btn-primary btn-block w-100">Sign In</button>
          </div>
          <!-- /.col -->
        </div>
      </vee-form>

      <div class="social-auth-links text-center mb-3">
        <p>- OR -</p>
        <a href="#" class="btn btn-block btn-primary">
          <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
        </a>
        <a href="#" class="btn btn-block btn-danger">
          <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
        </a>
      </div>
      <!-- /.social-auth-links -->

      <p class="mb-1">
        <a href="forgot-password.html">I forgot my password</a>
      </p>
      <p class="mb-0">
        <a href="register.html" class="text-center">Register a new membership</a>
      </p>
    </div>
    <!-- /.login-card-body -->
  </div>
</div>
</div>


</template>