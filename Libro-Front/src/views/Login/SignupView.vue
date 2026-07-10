<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { signup, ApiError } from '../../services/authService'

const API_URL = 'http://localhost:3000'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')
const isSubmitting = ref(false)

function signupWithGoogle() {
  window.location.href = `${API_URL}/auth/google`
}

function splitName(fullName: string): { first: string; last: string } {
  const [first, ...rest] = fullName.trim().split(/\s+/)
  return { first: first ?? '', last: rest.join(' ') }
}

async function handleSubmit() {
  error.value = ''
  isSubmitting.value = true

  try {
    const { first, last } = splitName(name.value)
    await signup({ first, last, email: email.value, password: password.value })
    router.push('/login')
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : 'No se pudo crear la cuenta'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="signup-page">
    <div class="hero-panel">
      <span class="blob blob--1"></span>
      <span class="blob blob--2"></span>
      <span class="blob blob--3"></span>
      <span class="blob blob--4"></span>

      <div class="hero-content">
        <div class="icon-box">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 4.5c-2.5-1.5-5.5-1.5-8 0v13c2.5-1.5 5.5-1.5 8 0M12 4.5c2.5-1.5 5.5-1.5 8 0v13c-2.5-1.5-5.5-1.5-8 0M12 4.5v13"
              stroke="#C97B58"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h1>Libro de Recetas</h1>
        <p>Tu colección de sabores</p>
      </div>

      <div class="testimonial">
        <p class="quote">"La mejor app para organizar mis recetas"</p>
        <p class="author">— María García, Chef casera</p>
      </div>
    </div>

    <div class="form-panel">
      <div class="form-inner">
        <h2>Crear cuenta</h2>
        <p class="subtitle">Comienza tu colección culinaria</p>

        <button type="button" class="google-btn" @click="signupWithGoogle">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="#4285F4"
              d="M23.52 12.27c0-.85-.07-1.47-.23-2.12H12v3.85h6.62c-.13 1.1-.86 2.77-2.47 3.89l-.02.15 3.59 2.78.25.02c2.28-2.1 3.55-5.2 3.55-8.57Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.78-2.94c-1.01.7-2.36 1.19-4.15 1.19-3.17 0-5.86-2.09-6.82-4.98l-.14.01-3.72 2.88-.05.14C3.25 21.3 7.28 24 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M5.18 14.36A7.5 7.5 0 0 1 4.77 12c0-.82.15-1.62.4-2.36l-.01-.16-3.77-2.93-.12.06A11.97 11.97 0 0 0 0 12c0 1.93.47 3.76 1.27 5.39l3.91-3.03Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c2.25 0 3.77.97 4.64 1.78l3.39-3.31C17.94 1.19 15.24 0 12 0 7.28 0 3.25 2.7 1.27 6.61l3.9 3.03C6.14 6.84 8.83 4.75 12 4.75Z"
            />
          </svg>
          <span>Continuar con Google</span>
        </button>

        <div class="divider"><span>o</span></div>

        <form @submit.prevent="handleSubmit">
          <label for="name">Nombre completo</label>
          <input id="name" v-model="name" type="text" placeholder="Ingresa tu nombre" autocomplete="name" />

          <label for="email">Correo electrónico</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="tu@email.com"
            autocomplete="email"
          />

          <label for="password">Contraseña</label>
          <div class="password-field">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              autocomplete="new-password"
            />
            <button
              type="button"
              class="toggle-password"
              :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              @click="showPassword = !showPassword"
            >
              <svg v-if="showPassword" viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path
                  d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
                  stroke="#8B8078"
                  stroke-width="1.5"
                />
                <circle cx="12" cy="12" r="3" stroke="#8B8078" stroke-width="1.5" />
              </svg>
              <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path
                  d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.24 4.24M9.9 5.1A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a13.5 13.5 0 0 1-3.1 3.9M6.1 6.6C3.6 8.2 2 12 2 12s3.5 7 10 7c1.2 0 2.3-.2 3.3-.6"
                  stroke="#8B8078"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <p v-if="error" class="error">{{ error }}</p>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta' }}
          </button>
        </form>

        <p class="signin">¿Ya tienes cuenta? <RouterLink to="/login">Inicia sesión</RouterLink></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signup-page {
  min-height: 100vh;
  display: flex;
}

.hero-panel {
  position: relative;
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: linear-gradient(155deg, #e7a583 0%, #c97b58 100%);
}

.blob {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
}

.blob--1 {
  width: 100px;
  height: 100px;
  top: 12%;
  left: 10%;
}

.blob--2 {
  width: 70px;
  height: 70px;
  top: 20%;
  right: 16%;
}

.blob--3 {
  width: 70px;
  height: 70px;
  bottom: 22%;
  left: 12%;
}

.blob--4 {
  width: 140px;
  height: 140px;
  bottom: 6%;
  right: 6%;
}

.hero-content {
  position: relative;
  text-align: center;
  max-width: 320px;
}

.icon-box {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  border-radius: 20px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
}

.icon-box svg {
  width: 36px;
  height: 36px;
}

.hero-content h1 {
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}

.hero-content p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  margin: 0;
}

.testimonial {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  max-width: 280px;
}

.testimonial .quote {
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
  font-size: 0.9rem;
  margin: 0 0 0.4rem;
}

.testimonial .author {
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.75rem;
  margin: 0;
}

.form-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 3rem 2rem;
}

.form-inner {
  width: 100%;
  max-width: 360px;
}

.form-inner h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d2420;
  margin: 0 0 0.35rem;
  text-align: center;
}

.subtitle {
  color: #8b8078;
  font-size: 0.9rem;
  margin: 0 0 1.75rem;
  text-align: center;
}

.google-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1px solid #ece3dd;
  background: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d2420;
  cursor: pointer;
}

.google-btn:hover {
  background: #faf7f5;
}

.divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #b7aba2;
  font-size: 0.8rem;
  margin: 1.25rem 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #ece3dd;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #2d2420;
  margin-bottom: 0.4rem;
}

input {
  border: none;
  border-radius: 14px;
  background: #f2ece7;
  padding: 0.85rem 1rem;
  font-size: 0.9rem;
  color: #2d2420;
  margin-bottom: 1.1rem;
  width: 100%;
  box-sizing: border-box;
}

input::placeholder {
  color: #b7aba2;
}

input:focus {
  outline: 2px solid #c97b58;
  outline-offset: 1px;
}

.password-field {
  position: relative;
}

.password-field input {
  padding-right: 2.75rem;
}

.toggle-password {
  position: absolute;
  right: 0.9rem;
  top: 50%;
  transform: translateY(-70%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
}

.error {
  color: #c0392b;
  font-size: 0.8rem;
  margin: -0.4rem 0 1rem;
}

.submit-btn {
  width: 100%;
  padding: 0.95rem;
  border: none;
  border-radius: 12px;
  background: #c97b58;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.25rem;
}

.submit-btn:hover {
  background: #bd6f4d;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.signin {
  text-align: center;
  font-size: 0.85rem;
  color: #8b8078;
  margin: 1.25rem 0 0;
}

.signin :deep(a) {
  color: #c97b58;
  font-weight: 600;
  text-decoration: none;
}

.signin :deep(a:hover) {
  text-decoration: underline;
}

@media (max-width: 900px) {
  .signup-page {
    flex-direction: column;
  }

  .hero-panel {
    flex: none;
    min-height: 320px;
    padding: 2.5rem 1.5rem;
  }

  .testimonial {
    display: none;
  }

  .form-panel {
    padding: 2.5rem 1.5rem 3rem;
  }
}
</style>
