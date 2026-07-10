<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const categories = [
  { id: 'postres', label: 'Postres' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'desayuno', label: 'Desayuno' },
  { id: 'almuerzo', label: 'Almuerzo' },
  { id: 'cena', label: 'Cena' },
]
const activeCategory = ref('postres')

const dessertTypes = [
  { id: 'pasteles', label: 'Pasteles', ring: '#C97B58' },
  { id: 'galletas', label: 'Galletas', ring: '#5C4433' },
  { id: 'helados', label: 'Helados', ring: '#8FC1B5' },
  { id: 'tartas', label: 'Tartas', ring: '#D8B98A' },
  { id: 'bombones', label: 'Bombones', ring: '#3C2A1E' },
]

const cookbooks = [
  { id: 1, title: 'Cocina Italiana', color: '#C97B58' },
  { id: 2, title: 'Postres Franceses', color: '#8FA377' },
  { id: 3, title: 'Comida Mexicana', color: '#B5502E' },
]

const recipes = [
  { id: 1, title: 'Tarta de Manzana', time: '45 min', rating: 0, color: '#D9C39A' },
  { id: 2, title: 'Brownie Chocolate', time: '35 min', rating: 0, color: '#4A3324' },
  { id: 3, title: 'Brownie Chocolate', time: '35 min', rating: 0, color: '#4A3324' },
  { id: 4, title: 'Brownie Chocolate', time: '35 min', rating: 0, color: '#4A3324' },
  { id: 5, title: 'Brownie Chocolate', time: '35 min', rating: 0, color: '#4A3324' },
  { id: 6, title: 'Brownie Chocolate', time: '35 min', rating: 0, color: '#4A3324' },
]

const navItems = [
  { id: 'home', label: 'Inicio' },
  { id: 'search', label: 'Buscar' },
  { id: 'favorites', label: 'Favoritos' },
  { id: 'profile', label: 'Perfil' },
]
const activeNav = ref('home')
</script>

<template>
  <div class="menu-page">
    <div class="menu-container">
      <div class="search-bar">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <circle cx="10" cy="10" r="7" />
          <path d="M20 20l-5-5" />
        </svg>
        <input v-model="searchQuery" type="text" placeholder="Buscar recetas, ingredientes..." />
      </div>

      <section class="section">
        <h2 class="section-title">Categorías</h2>
        <div class="category-row">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            class="category-btn"
            :class="{ active: activeCategory === cat.id }"
            @click="activeCategory = cat.id"
          >
            <span class="category-icon">
              <svg v-if="cat.id === 'postres'" viewBox="0 0 24 24" width="22" height="22">
                <path d="M4 21v-7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7" />
                <path d="M2 21h20" />
                <path d="M4 12c0-1.5 1-1.5 1-3s-1-1.5-1-3" />
                <path d="M12 12c0-1.5 1-1.5 1-3s-1-1.5-1-3" />
                <path d="M20 12c0-1.5-1-1.5-1-3s1-1.5 1-3" />
              </svg>
              <svg v-else-if="cat.id === 'bebidas'" viewBox="0 0 24 24" width="22" height="22">
                <path d="M7 8h10l-1 12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2L7 8Z" />
                <path d="M9 8V5a3 3 0 0 1 6 0v3" />
                <path d="M12 2v3" />
              </svg>
              <svg v-else-if="cat.id === 'desayuno'" viewBox="0 0 24 24" width="22" height="22">
                <path d="M2 18h20" />
                <circle cx="12" cy="18" r="5" />
                <path d="M12 4v3M4.9 9.9l2.1 2.1M19.1 9.9l-2.1 2.1" />
              </svg>
              <svg v-else-if="cat.id === 'almuerzo'" viewBox="0 0 24 24" width="22" height="22">
                <path d="M6 2v8a2 2 0 0 0 4 0V2" />
                <path d="M8 10v12" />
                <path d="M18 2c-2 0-3 2-3 4v4c0 1 .5 2 1.5 2H18" />
                <path d="M18 2v20" />
              </svg>
              <svg v-else viewBox="0 0 24 24" width="22" height="22">
                <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
              </svg>
            </span>
            <span class="category-label">{{ cat.label }}</span>
          </button>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Postres</h2>
          <a href="#" class="see-all">Ver todos</a>
        </div>
        <div class="subcategory-row">
          <div v-for="item in dessertTypes" :key="item.id" class="subcategory-item">
            <span class="subcategory-circle" :style="{ borderColor: item.ring }"></span>
            <span class="subcategory-label">{{ item.label }}</span>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Mis Libros de Cocina</h2>
        <div class="cookbook-row">
          <div v-for="book in cookbooks" :key="book.id" class="cookbook-card" :style="{ background: book.color }">
            <span class="cookbook-title">{{ book.title }}</span>
          </div>
          <button type="button" class="cookbook-card cookbook-new">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Nuevo</span>
          </button>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2 class="section-title">{{ recipes.length }} Recetas</h2>
          <button type="button" class="filter-btn">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M4 6h16M4 12h10M4 18h6" />
              <circle cx="16" cy="6" r="2" />
              <circle cx="10" cy="12" r="2" />
              <circle cx="16" cy="18" r="2" />
            </svg>
          </button>
        </div>
        <div class="recipe-grid">
          <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
            <div class="recipe-image" :style="{ background: recipe.color }"></div>
            <div class="recipe-info">
              <h3>{{ recipe.title }}</h3>
              <div class="recipe-meta">
                <span class="recipe-time">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                  {{ recipe.time }}
                </span>
                <span class="recipe-rating">
                  <svg
                    v-for="n in 5"
                    :key="n"
                    viewBox="0 0 24 24"
                    width="12"
                    height="12"
                    :fill="n <= recipe.rating ? '#C97B58' : 'none'"
                  >
                    <path
                      d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.9L12 3.5Z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav class="bottom-nav">
        <button
          v-for="item in navItems"
          :key="item.id"
          type="button"
          class="nav-btn"
          :class="{ active: activeNav === item.id }"
          :aria-label="item.label"
          @click="activeNav = item.id"
        >
          <svg v-if="item.id === 'home'" viewBox="0 0 24 24" width="20" height="20">
            <path d="M4 11l8-7 8 7" />
            <path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" />
          </svg>
          <svg v-else-if="item.id === 'search'" viewBox="0 0 24 24" width="20" height="20">
            <circle cx="10" cy="10" r="7" />
            <path d="M20 20l-5-5" />
          </svg>
          <svg v-else-if="item.id === 'favorites'" viewBox="0 0 24 24" width="20" height="20">
            <path
              d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6C19 16.4 12 21 12 21Z"
            />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="20" height="20">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" />
          </svg>
        </button>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.menu-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.menu-container {
  position: relative;
  width: 100%;
  max-width: 420px;
  padding: 1.5rem 1.25rem 6rem;
  box-sizing: border-box;
  background: #f3e3d0;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: #fff;
  border-radius: 999px;
  padding: 0.85rem 1.1rem;
  box-shadow: 0 6px 16px rgba(60, 42, 30, 0.08);
  color: #b7aba2;
}

.search-bar input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 0.9rem;
  color: #2d2420;
  background: transparent;
}

.search-bar input::placeholder {
  color: #b7aba2;
}

.section {
  margin-top: 1.75rem;
}

.section-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #2d2420;
  margin: 0 0 1rem;
}

.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.section-header .section-title {
  margin: 0;
}

.see-all {
  font-size: 0.8rem;
  font-weight: 600;
  color: #c97b58;
  text-decoration: none;
}

.category-row {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.category-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #2d2420;
  flex: 1;
}

.category-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: #fff;
  color: #2d2420;
  box-shadow: 0 4px 10px rgba(60, 42, 30, 0.06);
}

.category-btn.active .category-icon {
  background: #c97b58;
  color: #fff;
}

.category-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: #8b8078;
}

.category-btn.active .category-label {
  color: #c97b58;
}

.subcategory-row {
  display: flex;
  gap: 1.1rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.subcategory-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.subcategory-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid;
  background: #fff;
}

.subcategory-label {
  font-size: 0.72rem;
  color: #2d2420;
  font-weight: 600;
}

.cookbook-row {
  display: flex;
  gap: 0.85rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.cookbook-card {
  flex-shrink: 0;
  width: 100px;
  height: 130px;
  border-radius: 16px;
  display: flex;
  align-items: flex-end;
  padding: 0.75rem;
  box-sizing: border-box;
}

.cookbook-title {
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.2;
}

.cookbook-new {
  border: 2px dashed #d8c9b8;
  background: transparent;
  color: #b7aba2;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 600;
}

.filter-btn {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: none;
  background: #fff;
  color: #2d2420;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(60, 42, 30, 0.06);
}

.recipe-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.recipe-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(60, 42, 30, 0.06);
}

.recipe-image {
  aspect-ratio: 1 / 0.85;
}

.recipe-info {
  padding: 0.7rem 0.8rem 0.9rem;
}

.recipe-info h3 {
  font-size: 0.82rem;
  font-weight: 700;
  color: #2d2420;
  margin: 0 0 0.5rem;
}

.recipe-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #8b8078;
}

.recipe-time {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.72rem;
}

.recipe-rating {
  display: flex;
  gap: 0.15rem;
  color: #c97b58;
}

.bottom-nav {
  position: absolute;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 2.5rem);
  background: #fff;
  border-radius: 999px;
  padding: 0.6rem 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 30px rgba(60, 42, 30, 0.18);
}

.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b8078;
  cursor: pointer;
}

.nav-btn.active {
  background: #c97b58;
  color: #fff;
}
</style>
