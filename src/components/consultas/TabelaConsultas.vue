<template>
  <div class="tabela-container">
    <div class="card">
      <DataTable
        :value="paginaAtual"
        :loading="loading"
        tableStyle="min-width: 50rem"
        @row-click="emit('row-click', $event)"
      >
        <Column field="cpf" header="CPF" sortable style="width: 20%">
          <template #body="{ data }">
            {{ formatarCpf(data.cpf) }}
          </template>
        </Column>
        <Column field="nome" header="Nome" sortable style="width: 20%" />
        <Column field="email" header="Email" sortable style="width: 20%" />
        <Column field="especialidadeDescricao" header="Especialidade" sortable style="width: 20%">
          <template #body="{ data }">
            {{ data.especialidadeDescricao }}
          </template>
        </Column>
      </DataTable>
    </div>

    <Paginator
      v-model:first="primeiroItem"
      :rows="rows"
      :totalRecords="totalRegistros"
      @page="atualizarPagina"
      template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
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
  totalRecords: {
    type: Number,
    default: null
  },
  rows: {
    type: Number,
    default: 10
  },
  serverPagination: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['row-click', 'page-change']);

const primeiroItem = ref(0);

const paginaAtual = computed(() => {
  const dadosProcessados = props.dados
    .map((item) => ({
      ...item,
      especialidadeDescricao: obterDescricaoEspecialidade(item.especialidade)
    }));

  if (props.serverPagination) {
    return dadosProcessados;
  }

  const inicio = primeiroItem.value;
  const fim = inicio + props.rows;
  return dadosProcessados.slice(inicio, fim);
});

const totalRegistros = computed(() => props.totalRecords ?? props.dados.length);

const formatarCpf = (valor) => {
  const digitos = String(valor ?? '').replace(/\D/g, '').slice(0, 11);

  if (!digitos) {
    return '';
  }

  return digitos.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
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

const atualizarPagina = (event) => {
  primeiroItem.value = event.first;
  emit('page-change', event);
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
  margin-bottom: 1rem;
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 0.75rem;
  padding: 0.5rem 0.75rem;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  cursor: pointer;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background: color-mix(in srgb, var(--app-surface-alt) 72%, var(--app-border));
}

:deep(.p-paginator) {
  background: transparent;
  border: none;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page),
:deep(.p-paginator .p-paginator-prev),
:deep(.p-paginator .p-paginator-next),
:deep(.p-paginator .p-paginator-last) {
  min-width: 2rem;
  height: 2rem;
}
</style>
