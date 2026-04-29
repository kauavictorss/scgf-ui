<template>
  <div class="card">
    <MenuNavegacao/>
    <router-view/>
  </div>
</template>

<script setup>
import MenuNavegacao from './components/layout/MenuNavegacao.vue';
</script>
