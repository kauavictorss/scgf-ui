<template>
  <TabMenu v-model:activeIndex="abaAtiva" :model="abasCadastro" class="abas-cadastro"/>

  <div v-if="abaAtiva === 0" class="grid-campos">
    <div class="campo">
      <label for="cpf">CPF</label>
      <InputMask id="cpf" v-model="formulario.cpf" mask="999.999.999-99" :invalid="props.camposComErro.includes('cpf')"/>
    </div>
    <div class="campo">
      <label for="nome">Nome</label>
      <InputText id="nome" v-model="formulario.nome" :invalid="props.camposComErro.includes('nome')"/>
    </div>
    <div class="campo">
      <label for="idade">Idade</label>
      <InputNumber id="idade" v-model="formulario.idade" :useGrouping="false" :min="18" :max="120" :invalid="props.camposComErro.includes('idade')"/>
    </div>
    <div class="campo">
      <label for="email">Email</label>
      <InputText id="email" v-model="formulario.email" :invalid="props.camposComErro.includes('email')"/>
    </div>
    <div class="campo">
      <label for="especialidade">Especialidade</label>
      <Select
        id="especialidade"
        v-model="formulario.especialidade"
        :options="props.especialidadesOptions"
        optionLabel="label"
        optionValue="value"
        filter
        placeholder="Selecione uma especialidade"
        :invalid="props.camposComErro.includes('especialidade')"
      />
    </div>
  </div>

  <div v-if="abaAtiva === 1" class="grid-campos">
    <div class="campo">
      <label for="cep">CEP</label>
      <InputMask id="cep" v-model="formulario.endereco.cep" mask="99999-999" :invalid="props.camposComErro.includes('endereco.cep')"/>
    </div>
    <div class="campo">
      <label for="logradouro">Logradouro</label>
      <InputText id="logradouro" v-model="formulario.endereco.logradouro" :invalid="props.camposComErro.includes('endereco.logradouro')"/>
    </div>
    <div class="campo">
      <label for="bairro">Bairro</label>
      <InputText id="bairro" v-model="formulario.endereco.bairro" :invalid="props.camposComErro.includes('endereco.bairro')"/>
    </div>
    <div class="campo">
      <label for="cidade">Cidade</label>
      <InputText id="cidade" v-model="formulario.endereco.cidade" :invalid="props.camposComErro.includes('endereco.cidade')"/>
    </div>
    <div class="campo">
      <label for="uf">UF</label>
      <InputText id="uf" v-model="formulario.endereco.uf" maxlength="2" @input="normalizarUf" :invalid="props.camposComErro.includes('endereco.uf')"/>
    </div>
    <div class="campo">
      <label for="numero">Número</label>
      <InputText id="numero" v-model="formulario.endereco.numero" :invalid="props.camposComErro.includes('endereco.numero')"/>
    </div>
    <div class="campo">
      <label for="complemento">Complemento</label>
      <InputText id="complemento" v-model="formulario.endereco.complemento" :invalid="props.camposComErro.includes('endereco.complemento')"/>
    </div>
  </div>

  <div v-if="abaAtiva === 2" class="grid-campos">
    <div class="campo">
      <label for="numConta">Número da conta</label>
      <InputMask id="numConta" v-model="formulario.conta.numConta" mask="99999999-9" :invalid="props.camposComErro.includes('conta.numConta')"/>
    </div>
    <div class="campo">
      <label for="agencia">Agência</label>
      <InputMask id="agencia" v-model="formulario.conta.agencia" mask="9999" :invalid="props.camposComErro.includes('conta.agencia')"/>
    </div>
    <div class="campo">
      <label for="tipoConta">Tipo da conta</label>
      <Select id="tipoConta" v-model="formulario.conta.tipoConta" :options="tiposConta" optionLabel="label" optionValue="value" :invalid="props.camposComErro.includes('conta.tipoConta')"/>
    </div>
    <div class="campo">
      <label for="salario">Salário</label>
      <InputNumber
        id="salario"
        v-model="formulario.conta.salario"
        mode="decimal"
        :minFractionDigits="2"
        :maxFractionDigits="2"
        :min="0.01"
        :invalid="props.camposComErro.includes('conta.salario')"
      />
    </div>
  </div>

  <div class="acoes-form">
    <Button label="Confirmar" :loading="loading" @click="confirmarCadastro"/>
    <Button label="Cancelar" severity="secondary" outlined @click="cancelarCadastro"/>
  </div>
</template>

<script setup>
import {nextTick, ref, watch} from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import TabMenu from 'primevue/tabmenu';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  focusField: {
    type: String,
    default: ''
  },
  especialidadesOptions: {
    type: Array,
    default: () => []
  },
  camposComErro: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['confirmar', 'cancelar']);

const abaAtiva = ref(0);

const abasCadastro = [
  {label: 'Dados básicos'},
  {label: 'Endereço'},
  {label: 'Dados bancários'}
];

const tiposConta = [
  {label: 'Conta Corrente', value: 'CORRENTE'},
  {label: 'Conta Poupança', value: 'POUPANCA'},
  {label: 'Conta Salário', value: 'SALARIO'}
];

const obterAbaPorCampo = (campo) => {
  if (!campo) {
    return 0;
  }

  if (campo.startsWith('endereco.')) {
    return 1;
  }

  if (campo.startsWith('conta.')) {
    return 2;
  }

  return 0;
};

const idsPorCampo = {
  cpf: 'cpf',
  nome: 'nome',
  idade: 'idade',
  email: 'email',
  especialidade: 'especialidade',
  'endereco.cep': 'cep',
  'endereco.logradouro': 'logradouro',
  'endereco.bairro': 'bairro',
  'endereco.cidade': 'cidade',
  'endereco.uf': 'uf',
  'endereco.numero': 'numero',
  'endereco.complemento': 'complemento',
  'conta.numConta': 'numConta',
  'conta.agencia': 'agencia',
  'conta.tipoConta': 'tipoConta',
  'conta.salario': 'salario'
};

const formularioInicial = () => ({
  cpf: '',
  nome: '',
  idade: '',
  email: '',
  especialidade: '',
  conta: {
    numConta: '',
    agencia: '',
    tipoConta: 'CORRENTE',
    salario: ''
  },
  endereco: {
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: '',
    numero: '',
    complemento: ''
  }
});

const formulario = ref(formularioInicial());

const numeroOuNulo = (valor) => {
  if (valor === '' || valor === null || valor === undefined) {
    return null;
  }

  const numero = Number(valor);
  return Number.isNaN(numero) ? null : numero;
};

const montarPayload = () => ({
  ...formulario.value,
  cpf: String(formulario.value.cpf || '').replace(/\D/g, ''),
  idade: numeroOuNulo(formulario.value.idade),
  conta: {
    ...formulario.value.conta,
    salario: numeroOuNulo(formulario.value.conta.salario)
  },
  endereco: {
    ...formulario.value.endereco,
    uf: String(formulario.value.endereco.uf || '').replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 2)
  }
});

const confirmarCadastro = () => {
  emit('confirmar', montarPayload());
};

const normalizarUf = () => {
  formulario.value.endereco.uf = String(formulario.value.endereco.uf || '').replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 2);
};

watch(
  () => props.focusField,
  async (campo) => {
    if (!campo) {
      return;
    }

    abaAtiva.value = obterAbaPorCampo(campo);
    await nextTick();
    const idAlvo = idsPorCampo[campo];
    const elemento = idAlvo ? document.getElementById(idAlvo) : null;
    if (elemento) {
      elemento.focus();
      elemento.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }
);

const resetForm = () => {
  formulario.value = formularioInicial();
  abaAtiva.value = 0;
};

const cancelarCadastro = () => {
  resetForm();
  emit('cancelar');
};

defineExpose({resetForm});
</script>

<style scoped>
.abas-cadastro {
  margin-bottom: 1rem;
}

.grid-campos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.85rem 1rem;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.acoes-form {
  margin-top: 1.25rem;
  display: flex;
  gap: 0.75rem;
}
</style>
