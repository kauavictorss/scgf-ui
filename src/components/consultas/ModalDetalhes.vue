<template>
  <Dialog
      class="modal-detalhes"
      :visible="visible"
      modal
      header="Detalhes"
      :style="{ width: '42rem' }"
      @update:visible="$emit('update:visible', $event)"
  >
    <p v-if="erro" class="erro">{{ erro }}</p>
    <table v-else-if="funcionario" class="detalhes-tabela">
      <tbody>
      <tr v-for="linha in linhasDetalhes" :key="linha.chave">
        <th>{{ linha.label }}</th>
        <td>{{ linha.valor }}</td>
      </tr>
      </tbody>
    </table>
    <p v-else-if="loading">Carregando detalhes...</p>
  </Dialog>
</template>

<script setup>
import {computed} from 'vue';
import Dialog from 'primevue/dialog';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  funcionario: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  erro: {
    type: String,
    default: ''
  }
});

defineEmits(['update:visible']);

const valorOuPadrao = (valor) => {
  return valor === null || valor === undefined || valor === '' ? 'Não informado' : valor;
};

const descricaoEspecialidade = (especialidade) => {
  if (!especialidade) {
    return 'Não informado';
  }

  if (typeof especialidade === 'string') {
    return especialidade;
  }

  return (
      especialidade.descricao
      || especialidade.label
      || especialidade.nome
      || 'Não informado'
  );
};

const linhasDetalhes = computed(() => {
  const funcionario = props.funcionario;
  if (!funcionario) {
    return [];
  }

  return [
    {chave: 'nome', label: 'Nome', valor: valorOuPadrao(funcionario.nome)},
    {chave: 'cpf', label: 'CPF', valor: valorOuPadrao(funcionario.cpf)},
    {chave: 'idade', label: 'Idade', valor: valorOuPadrao(funcionario.idade)},
    {chave: 'email', label: 'Email', valor: valorOuPadrao(funcionario.email)},
    {chave: 'especialidade', label: 'Especialidade', valor: descricaoEspecialidade(funcionario.especialidade)},
    {chave: 'numConta', label: 'Num. conta', valor: valorOuPadrao(funcionario.conta?.numConta)},
    {chave: 'agencia', label: 'Agência', valor: valorOuPadrao(funcionario.conta?.agencia)},
    {chave: 'tipoConta', label: 'Tipo da conta', valor: valorOuPadrao(funcionario.conta?.tipoConta)},
    {chave: 'salario', label: 'Salário', valor: valorOuPadrao(funcionario.conta?.salario)},
    {chave: 'cep', label: 'CEP', valor: valorOuPadrao(funcionario.endereco?.cep)},
    {chave: 'logradouro', label: 'Logradouro', valor: valorOuPadrao(funcionario.endereco?.logradouro)},
    {chave: 'numero', label: 'Número', valor: valorOuPadrao(funcionario.endereco?.numero)},
    {chave: 'bairro', label: 'Bairro', valor: valorOuPadrao(funcionario.endereco?.bairro)},
    {chave: 'cidade', label: 'Cidade', valor: valorOuPadrao(funcionario.endereco?.cidade)},
    {chave: 'uf', label: 'UF', valor: valorOuPadrao(funcionario.endereco?.uf)},
    {chave: 'complemento', label: 'Complemento', valor: valorOuPadrao(funcionario.endereco?.complemento)}
  ];
});
</script>

<style scoped>
:global(.modal-detalhes .p-dialog-title) {
  font-size: 1.65rem;
  font-weight: 600;
}

.erro {
  color: var(--app-danger);
  margin-bottom: 0.75rem;
}

.detalhes-tabela {
  width: 100%;
  border-collapse: collapse;
}

.detalhes-tabela th,
.detalhes-tabela td {
  text-align: left;
  padding: 0.65rem 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.detalhes-tabela th {
  width: 34%;
  font-weight: 600;
}
</style>
