<template>
  <div class="app-shell">
    <MenuNavegacao/>
    <router-view/>
  </div>
</template>

<script setup>
import MenuNavegacao from './components/layout/MenuNavegacao.vue';
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
}
</style>
