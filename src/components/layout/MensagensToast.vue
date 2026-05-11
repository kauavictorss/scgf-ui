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

:global(.toast-messages .p-toast-message-content) {
  display: flex;
  align-items: flex-start; /* Alinha o ícone com o topo do texto */
  gap: 0.5rem;
}

:global(.toast-messages .p-toast-message-icon) {
  margin-top: 0.25rem; /* Ajuste fino para alinhar o ícone com a primeira linha do título */
}

:global(.toast-messages .p-toast-message-text) {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
</style>
