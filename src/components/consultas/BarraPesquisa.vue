<template>
  <div class="barra-pesquisa">
    <InputText
        :model-value="modelValue"
        :placeholder="placeholder"
        class="campo-busca"
        @input="atualizarValor"
        @keyup.enter="$emit('buscar')"
    />
    <Button v-if="mostrarBotao" :label="buttonLabel" icon="pi pi-search" @click="$emit('buscar')"/>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const props = defineProps({
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
  },
  mostrarBotao: {
    type: Boolean,
    default: true
  },
  bloquearNumeros: {
    type: Boolean,
    default: false
  },
  somenteNumeros: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'buscar']);

const atualizarValor = (valor) => {
  const texto = String(valor?.target?.value ?? valor ?? '');

  if (texto === '') {
    emit('update:modelValue', '');
    return;
  }

  if (props.somenteNumeros) {
    emit('update:modelValue', texto.replace(/\D/g, ''));
    return;
  }

  if (props.bloquearNumeros) {
    emit('update:modelValue', texto.replace(/\d/g, ''));
    return;
  }

  emit('update:modelValue', texto);
};
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
