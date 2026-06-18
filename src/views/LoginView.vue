<template>
  <div class="login-view">
    <div class="login-background">
      <img src="../assets/brasao.png" alt="Brasão SCGF" class="bg-brasao"/>
    </div>
    <ModalLogin/>
  </div>
</template>

<script setup>
import ModalLogin from '@/components/layout/ModalLogin.vue';
</script>

<style scoped>
.login-view {
  position: fixed;
  inset: 0; /* Cobre toda a tela */
  background-color: var(--app-bg);
  z-index: 1000;
  overflow: hidden;
}

.login-background {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.05;
  filter: grayscale(1);
  pointer-events: none;
}

.bg-brasao {
  width: min(400px, 80vw);
  height: auto;
}
</style>
