<template>
  <h1>Consultar Funcionário por CPF</h1>
  <p v-if="erro" class="erro">{{ erro }}</p>
  <div class="busca">
    <InputText
      v-model="cpfBusca"
      class="myinput"
      placeholder="Digite o CPF"
      @keyup.enter="buscarPorCpf"
    />
    <Button label="Buscar" icon="pi pi-search" :loading="carregando" @click="buscarPorCpf" />
  </div>

  <div class="card">
    <DataTable :value="funcionarios" :loading="carregando" tableStyle="min-width: 50rem">
      <Column field="cpf" header="Cpf" sortable="" style="width: 20%" />
      <Column field="nome" header="Nome" sortable="" style="width: 20%" />
      <Column field="email" header="Email" sortable="" style="width: 20%" />
      <Column field="especialidade" header="Especialidade" sortable="" style="width: 20%" />
      <Column field="estado" header="Estado" sortable="" style="width: 20%" />
    </DataTable>
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ref } from 'vue';
import ApiService from '@/service/ApiService.js';

const funcionarios = ref([]);
const carregando = ref(false);
const erro = ref('');
const cpfBusca = ref('');

const buscarPorCpf = async () => {
  const cpfNormalizado = cpfBusca.value.replace(/\D/g, '');

  if (!cpfNormalizado) {
    erro.value = 'Informe um CPF para buscar.';
    funcionarios.value = [];
    return;
  }

  carregando.value = true;
  erro.value = '';

  try {
    const response = await ApiService.buscarFuncionarioPorCpf(cpfNormalizado);
    const dados = response.data?.content || response.data;
    funcionarios.value = Array.isArray(dados) ? dados : dados ? [dados] : [];

    if (!funcionarios.value.length) {
      erro.value = 'Nenhum funcionario encontrado para esse CPF.';
    }
  } catch (error) {
    funcionarios.value = [];
    erro.value = 'Nao foi possivel consultar o CPF informado.';
    console.error('Erro ao buscar funcionario por CPF:', error);
  } finally {
    carregando.value = false;
  }
};
</script>

<style scoped>
.busca {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1rem;
}

.erro {
  color: #b91c1c;
  margin-bottom: 0.75rem;
}

.myinput {
  width: 18rem;
}

</style>
