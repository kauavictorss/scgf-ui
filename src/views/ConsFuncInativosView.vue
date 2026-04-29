<template>
  <h1>Funcionários Inativos</h1>
  <div class="card">
    <DataTable :value="funcionarios" tableStyle="min-width: 50rem">
      <Column field="cpf" header="Cpf" sortable="" style="width: 20%" />
      <Column field="nome" header="Nome" sortable="" style="width: 20%" />
      <Column field="email" header="Email" sortable="" style="width: 20%" />
      <Column field="especialidade" header="Especialidade" sortable="" style="width: 20%" />
    </DataTable>
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, onMounted } from 'vue';
import ApiService from '@/service/ApiService.js';

const funcionarios = ref([]);

onMounted(async () => {
  const response = await ApiService.listarFuncionariosInativos();
  funcionarios.value = response.data.content || response.data || [];
});
</script>
