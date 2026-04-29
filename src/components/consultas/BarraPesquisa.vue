<template>
  <div class="barra-pesquisa">
    <InputText
      :model-value="modelValue"
      :placeholder="placeholder"
      class="campo-busca"
      @update:model-value="$emit('update:modelValue', $event)"
      @keyup.enter="$emit('buscar')"
    />
    <Button :label="buttonLabel" icon="pi pi-search" @click="$emit('buscar')" />
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Pesquisar'
  },
  buttonLabel: {
    type: String,
    default: 'Buscar'
  }
});

defineEmits(['update:modelValue', 'buscar']);
</script>

<style scoped>
.barra-pesquisa {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.75rem;
}

.campo-busca {
  width: 22rem;
}
</style>
