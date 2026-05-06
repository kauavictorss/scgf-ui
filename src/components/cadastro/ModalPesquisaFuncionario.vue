<template>
  <Dialog
      v-model:visible="visibilidade"
      modal
      header="Consultar funcionário"
      :style="{ width: '95vw', maxWidth: '1200px' }"
      @hide="fecharModal"
  >
    <div class="filtros-consulta">
      <BarraPesquisa
          v-model="filtroCpf"
          placeholder="Filtrar por CPF"
          :mostrar-botao="false"
          somente-numeros
      />
      <BarraPesquisa
          v-model="filtroNome"
          placeholder="Filtrar por nome"
          :mostrar-botao="false"
          bloquear-numeros
      />
      <BarraPesquisa
          v-model="filtroEspecialidade"
          placeholder="Filtrar por especialidade"
          :mostrar-botao="false"
          bloquear-numeros
      />
    </div>

    <p v-if="mensagemExibida" class="info-consulta">{{ mensagemExibida }}</p>
    <p v-else-if="!loading && funcionariosFiltrados.length === 0" class="info-consulta">
      Funcionário não encontrado
    </p>

    <TabelaConsultas
        :dados="funcionariosFiltrados"
        :loading="loading"
        @row-click="emit('selecionar', $event)"
    />
  </Dialog>
</template>

<script setup>
import {computed, ref, watch} from 'vue';
import Dialog from 'primevue/dialog';
import BarraPesquisa from '@/components/consultas/BarraPesquisa.vue';
import TabelaConsultas from '@/components/consultas/TabelaConsultas.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  funcionarios: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  mensagem: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:visible', 'selecionar']);

const filtroNome = ref('');
const filtroCpf = ref('');
const filtroEspecialidade = ref('');

const normalizarTexto = (valor) => String(valor || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const visibilidade = computed({
  get: () => props.visible,
  set: (valor) => emit('update:visible', valor)
});

const mensagemExibida = computed(() => props.mensagem?.trim() || '');

const obterDescricaoEspecialidade = (especialidade) => {
  if (!especialidade) {
    return '';
  }

  if (typeof especialidade === 'string') {
    return especialidade;
  }

  return especialidade.descricao || especialidade.label || especialidade.nome || '';
};

const funcionariosFiltrados = computed(() => {
  const nome = normalizarTexto(filtroNome.value);
  const cpf = normalizarTexto(filtroCpf.value);
  const especialidade = normalizarTexto(filtroEspecialidade.value);

  return props.funcionarios.filter((funcionario) => {
    const nomeFuncionario = normalizarTexto(funcionario.nome);
    const cpfFuncionario = normalizarTexto(funcionario.cpf);
    const especialidadeFuncionario = normalizarTexto(obterDescricaoEspecialidade(funcionario.especialidade));

    return (
        (!nome || nomeFuncionario.includes(nome)) &&
        (!cpf || cpfFuncionario.includes(cpf)) &&
        (!especialidade || especialidadeFuncionario.includes(especialidade))
    );
  });
});

const fecharModal = () => {
  emit('update:visible', false);
};

const limparFiltros = () => {
  filtroNome.value = '';
  filtroCpf.value = '';
  filtroEspecialidade.value = '';
};

watch(
    () => props.visible,
    (visivel) => {
      if (!visivel) {
        limparFiltros();
      }
    }
);
</script>

<style scoped>
.filtros-consulta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.info-consulta {
  margin: 0 0 1rem;
  color: var(--app-muted);
}
</style>
