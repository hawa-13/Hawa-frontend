<template>
  <div class="login-page">
    <form class="login-box" @submit.prevent="login">
      <h2>Admin Login</h2>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>

      <RouterLink to="/">Back to Portfolio</RouterLink>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function login() {
  error.value = ''
  loading.value = true

  try {
    const res = await api.post('/admin/login', {
      email: email.value,
      password: password.value,
    })

    localStorage.setItem('adminToken', res.data.token)
    localStorage.setItem('adminLoggedIn', 'true')

    router.push('/admin-dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>