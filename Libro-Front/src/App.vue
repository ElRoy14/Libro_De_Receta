<script setup lang="ts">
import { RouterView } from 'vue-router'

const API_URL = 'http://localhost:3000'

function loginWithGoogle() {
  window.location.href = `${API_URL}/auth/google`
}
</script>

<template>
  <header>
    <button type="button" @click="loginWithGoogle">Iniciar sesión con Google</button>
  </header>

  <RouterView />
</template>
