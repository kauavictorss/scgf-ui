<template>
  <Toast ref="toastRef" position="top-right" class="toast-messages"/>
</template>

<script setup>
import {ref} from 'vue';
import Toast from 'primevue/toast';

const toastRef = ref(null);

// Tipos de mensagens
const tipos = {
  sucesso: {severity: 'success', life: 4000},
  aviso: {severity: 'warn', life: 4000},
  erro: {severity: 'error', life: 5000},
  info: {severity: 'info', life: 3000}
};

const mostrar = (mensagem, tipo = 'info') => {
  const config = tipos[tipo] || tipos.info;
  toastRef.value?.add({
    severity: config.severity,
    summary: obterTitulo(tipo),
    detail: mensagem,
    life: config.life
  });
};

const obterTitulo = (tipo) => {
  const titulos = {
    sucesso: 'Sucesso',
    aviso: 'Aviso',
    erro: 'Erro',
    info: 'Informação'
  };
  return titulos[tipo] || 'Informação';
};

defineExpose({
  mostrar
});
</script>

<style scoped>
:global(.toast-messages) {
  position: fixed;
  top: 5.5rem;
  right: 1rem;
  z-index: 2000;
}

:global(.toast-messages .p-toast-message) {
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
