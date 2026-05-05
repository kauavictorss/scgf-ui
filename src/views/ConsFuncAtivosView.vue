<template>
  <div class="cabecalho">
    <h1>Funcionários Ativos</h1>
    <BarraPesquisa
        v-model="termoBuscaInput"
        placeholder="Filtrar por CPF, nome, email ou especialidade"
        @buscar="aplicarBusca"
    />
  </div>
  <p v-if="erroLista" class="erro">{{ erroLista }}</p>
  <TabelaConsultas
      :dados="funcionariosFiltrados"
      :loading="carregandoLista"
      @row-click="abrirDetalhes"
  />

  <ModalDetalhes
      v-model:visible="mostrarDetalhes"
      :funcionario="detalheFuncionario"
      :loading="carregandoDetalhes"
      :erro="erroDetalhes"
  />
</template>

<script setup>
import {computed, ref, onMounted} from 'vue';
import BarraPesquisa from '@/components/consultas/BarraPesquisa.vue';
import TabelaConsultas from '@/components/consultas/TabelaConsultas.vue';
import ModalDetalhes from '@/components/consultas/ModalDetalhes.vue';
import ApiService from '@/service/ApiService.js';

const funcionarios = ref([]);
const termoBuscaInput = ref('');
const termoBusca = ref('');
const carregandoLista = ref(false);
const erroLista = ref('');
const mostrarDetalhes = ref(false);
const carregandoDetalhes = ref(false);
const erroDetalhes = ref('');
const detalheFuncionario = ref(null);

const aplicarBusca = () => {
  termoBusca.value = termoBuscaInput.value;
};

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
  const termo = termoBusca.value.trim().toLowerCase();
  if (!termo) {
    return funcionarios.value;
  }

  return funcionarios.value.filter((funcionario) => {
    const campos = [
      funcionario.cpf,
      funcionario.nome,
      funcionario.email,
      obterDescricaoEspecialidade(funcionario.especialidade)
    ];
    return campos.some((valor) => String(valor || '').toLowerCase().includes(termo));
  });
});

onMounted(async () => {
  carregandoLista.value = true;
  erroLista.value = '';

  try {
    const response = await ApiService.listarFuncionariosAtivos();
    funcionarios.value = response.data.content || response.data || [];
  } catch (error) {
    erroLista.value = 'Não foi possível carregar os funcionários ativos.';
    console.error('Erro ao listar funcionários ativos:', error);
  } finally {
    carregandoLista.value = false;
  }
});

const abrirDetalhes = async (event) => {
  const funcionario = event.data;
  mostrarDetalhes.value = true;
  carregandoDetalhes.value = true;
  erroDetalhes.value = '';
  detalheFuncionario.value = {...funcionario};

  try {
    const response = await ApiService.listarDetalhesFuncionario(funcionario.cpf);
    const detalhes = Array.isArray(response.data) ? response.data[0] : response.data;

    detalheFuncionario.value = {
      ...funcionario,
      ...detalhes
    };
  } catch (error) {
    erroDetalhes.value = 'Não foi possível carregar os detalhes deste funcionário.';
    console.error('Erro ao buscar detalhes do funcionário:', error);
  } finally {
    carregandoDetalhes.value = false;
  }
};
</script>

<style scoped>
.cabecalho {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1.9rem;
  margin-bottom: 1rem;
}

.cabecalho h1 {
  margin: 0;
}

.erro {
  color: var(--app-danger);
  margin-bottom: 0.75rem;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  cursor: pointer;
}
</style>
