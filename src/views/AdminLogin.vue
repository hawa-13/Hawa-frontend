<template>
  <div class="login-page">
    <form class="login-box" @submit.prevent="login">
      <h2>Admin Login</h2>

      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />

      <button type="submit">Login</button>

      <p v-if="error" class="error">{{ error }}</p>

      <RouterLink to="/">Back to Portfolio</RouterLink>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')

function login() {
  if (username.value === 'admin' && password.value === 'admin123') {
    localStorage.setItem('adminLoggedIn', 'true')
    router.push('/admin-dashboard')
  } else {
    error.value = 'Wrong username or password'
  }
}
</script>