<template>
  <div class="card">
    <MenuBar/>
    <router-view/>
  </div>
</template>

<script setup>
import MenuBar from './components/MenuBar.vue';
</script>
