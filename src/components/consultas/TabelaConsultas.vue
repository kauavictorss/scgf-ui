<template>
  <div class="tabela-container">
    <div class="card">
      <DataTable
        :value="paginaAtual"
        :loading="loading"
        tableStyle="min-width: 50rem"
        @row-click="emit('row-click', $event)"
      >
        <Column field="cpf" header="CPF" sortable style="width: 20%" />
        <Column field="nome" header="Nome" sortable style="width: 20%" />
        <Column field="email" header="Email" sortable style="width: 20%" />
        <Column field="especialidade" header="Especialidade" sortable style="width: 20%">
          <template #body="{ data }">
            {{ obterDescricaoEspecialidade(data.especialidade) }}
          </template>
        </Column>
      </DataTable>
    </div>

    <Paginator
      v-model:first="primeiroItem"
      :rows="10"
      :totalRecords="dados.length"
      @page="atualizarPagina"
      template="PrevPageLink PageLinks NextPageLink"
      class="paginator"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';

const props = defineProps({
  dados: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['row-click']);

const primeiroItem = ref(0);
const itensPorPagina = 10;

const paginaAtual = computed(() => {
  const inicio = primeiroItem.value;
  const fim = inicio + itensPorPagina;
  return props.dados.slice(inicio, fim);
});

const obterDescricaoEspecialidade = (especialidade) => {
  if (!especialidade) {
    return '';
  }

  if (typeof especialidade === 'string') {
    return especialidade;
  }

  return especialidade.descricao || especialidade.label || especialidade.nome || '';
};

const atualizarPagina = (event) => {
  primeiroItem.value = event.first;
};
</script>

<style scoped>
.tabela-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card {
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 0.75rem;
  padding: 1rem;
}

.paginator {
  display: flex;
  justify-content: center;
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 0.75rem;
  padding: 1rem;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  cursor: pointer;
}

:deep(.p-paginator) {
  background: transparent;
  border: none;
}
</style>
