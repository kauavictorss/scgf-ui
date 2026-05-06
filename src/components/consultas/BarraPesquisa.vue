<template>
  <div class="barra-pesquisa">
    <InputText
        :model-value="modelValue"
        :placeholder="placeholder"
        class="campo-busca"
        @update:modelValue="atualizarValor"
        @keydown="bloquearTecla"
        @paste="bloquearColagem"
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

const bloquearTecla = (event) => {
  const tecla = event?.key || '';
  const teclaValida = [
    'Backspace',
    'Tab',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Delete',
    'Home',
    'End',
    'Escape'
  ];

  if (teclaValida.includes(tecla) || event?.ctrlKey || event?.metaKey || event?.altKey) {
    return;
  }

  if (tecla.length !== 1) {
    return;
  }

  if (props.somenteNumeros && /\D/.test(tecla)) {
    event.preventDefault();
  }

  if (props.bloquearNumeros && /\d/.test(tecla)) {
    event.preventDefault();
  }
};

const bloquearColagem = (event) => {
  const texto = event?.clipboardData?.getData('text') || '';

  if (!texto) {
    return;
  }

  if (props.somenteNumeros && /\D/.test(texto)) {
    event.preventDefault();
  }

  if (props.bloquearNumeros && /\d/.test(texto)) {
    event.preventDefault();
  }
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
