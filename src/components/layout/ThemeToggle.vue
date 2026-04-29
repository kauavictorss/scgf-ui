<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'"
    @click="toggleTheme"
  >
    <span class="theme-track" :class="{ dark: isDark }">
      <i :class="['pi', isDark ? 'pi-moon' : 'pi-sun', 'theme-thumb', { dark: isDark }]" />
    </span>
  </button>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const isDark = ref(false);

const applyTheme = (darkMode) => {
  isDark.value = darkMode;
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
};

const toggleTheme = () => {
  applyTheme(!isDark.value);
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme === 'dark');
    return;
  }

  applyTheme(false);
});
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--app-border);
  background: var(--app-surface);
  color: var(--app-text);
  border-radius: 999px;
  padding: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.theme-toggle:hover {
  background: var(--app-surface-alt);
}

.theme-track {
  width: 2.6rem;
  height: 1.4rem;
  border-radius: 999px;
  background: #ced4da;
  position: relative;
  display: block;
  transition: background-color 0.2s ease;
}

.theme-track.dark {
  background: #495057;
}

.theme-thumb {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 999px;
  background: #ffffff;
  position: absolute;
  top: 0.1rem;
  left: 0.1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.theme-thumb.dark {
  transform: translateX(1.2rem);
  background: #212529;
  color: #f8f9fa;
}

.theme-thumb {
  font-size: 0.95rem;
  color: #f59f00;
}
</style>
