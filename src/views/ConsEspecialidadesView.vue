<template>
  <div class="cabecalho">
    <h1>Especialidades</h1>
    <BarraPesquisa
        v-model="termoBuscaInput"
        placeholder="Filtrar por código ou descrição"
        @buscar="aplicarBusca"
    />
  </div>
  <p v-if="erro" class="erro">{{ erro }}</p>
  <div class="card">
    <DataTable :value="especialidadesFiltradas" :loading="carregando" tableStyle="min-width: 50rem">
      <Column field="codigo" header="Código" sortable style="width: 40%"/>
      <Column field="descricao" header="Descrição" sortable style="width: 60%"/>
    </DataTable>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ApiService from '@/service/ApiService.js';
import BarraPesquisa from '@/components/consultas/BarraPesquisa.vue';

const especialidades = ref([]);
const carregando = ref(false);
const erro = ref('');
const termoBuscaInput = ref('');
const termoBusca = ref('');

const aplicarBusca = () => {
  termoBusca.value = termoBuscaInput.value;
};

const especialidadesFiltradas = computed(() => {
  const termo = termoBusca.value.trim().toLowerCase();
  if (!termo) {
    return especialidades.value;
  }

  return especialidades.value.filter((especialidade) => {
    return (
        String(especialidade.codigo || '').toLowerCase().includes(termo) ||
        String(especialidade.descricao || '').toLowerCase().includes(termo)
    );
  });
});

const paraLinhaEspecialidade = (item) => {
  if (typeof item === 'string') {
    return {codigo: item, descricao: item};
  }

  return {
    codigo: item?.codigo || item?.name || item?.id || item?.descricao || 'N/A',
    descricao: item?.descricao || item?.label || item?.nome || item?.valor || item?.name || 'N/A'
  };
};

onMounted(async () => {
  carregando.value = true;
  erro.value = '';

  try {
    const response = await ApiService.listarEspecialidades();
    const dados = response.data?.content || response.data || [];
    especialidades.value = Array.isArray(dados) ? dados.map(paraLinhaEspecialidade) : [];
  } catch (errorApi) {
    erro.value = 'Não foi possível carregar as especialidades pela API.';
    especialidades.value = [];
    console.error('Erro ao listar especialidades:', errorApi);
  } finally {
    carregando.value = false;
  }
});
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
  color: #b91c1c;
  margin-bottom: 0.75rem;
}

.card {
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 0.75rem;
  padding: 1rem;
}

:deep(.p-datatable .p-datatable-thead > tr > th),
:deep(.p-datatable .p-datatable-tbody > tr > td) {
  border-color: var(--app-border);
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background: var(--app-surface-alt);
}
</style>
