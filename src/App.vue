<template>
  <div class="app-shell">
    <MensagensToast ref="toastRef"/>
    <MenuNavegacao/>
    <router-view/>
  </div>
</template>

<script setup>
import {ref, provide} from 'vue';
import MenuNavegacao from './components/layout/MenuNavegacao.vue';
import MensagensToast from './components/layout/MensagensToast.vue';

const toastRef = ref(null);

const toastService = {
  mostrar: (msg, tipo = 'info') => {
    if (toastRef.value?.mostrar) {
      toastRef.value.mostrar(msg, tipo);
    }
  }
};

provide('toast', toastService);
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
}
</style>
