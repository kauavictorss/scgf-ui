<template>
  <Form
      v-slot="$form"
      :resolver="resolver"
      :initialValues="formulario"
      :validateOnValueUpdate="false"
      :validateOnBlur="true"
      @submit="onFormSubmit"
      class="formulario-cadastro"
  >
    <TabMenu v-model:activeIndex="abaAtiva" :model="abasCadastro" class="abas-cadastro"/>

    <div v-if="abaAtiva === 0" class="grid-campos">
      <div class="campo">
        <label for="cpf">CPF</label>
        <InputMask id="cpf" name="cpf" v-model="formulario.cpf" mask="999.999.999-99"
                   :invalid="campoInvalido($form, 'cpf')"/>
        <Message v-if="campoInvalido($form, 'cpf')" severity="error" size="small" variant="simple">
          {{ obterMensagemCampo($form, 'cpf') }}
        </Message>
      </div>
      <div class="campo">
        <label for="nome">Nome</label>
        <InputText id="nome" name="nome" v-model="formulario.nome"
                   @input="tratarNomeInput"
                   @keydown="bloquearTeclaCampo('semNumeros', $event)"
                   @paste="bloquearColagemCampo('semNumeros', $event)"
                   :invalid="campoInvalido($form, 'nome')"/>
        <Message v-if="campoInvalido($form, 'nome')" severity="error" size="small" variant="simple">
          {{ obterMensagemCampo($form, 'nome') }}
        </Message>
      </div>
      <div class="campo">
        <label for="idade">Idade</label>
        <InputNumber
            id="idade" name="idade"
            v-model="formulario.idade"
            :useGrouping="false"
            :invalid="campoInvalido($form, 'idade')"
        />
        <Message v-if="campoInvalido($form, 'idade')" severity="error" size="small" variant="simple">
          {{ obterMensagemCampo($form, 'idade') }}
        </Message>
      </div>
      <div class="campo">
        <label for="email">Email</label>
        <InputText id="email" name="email" v-model="formulario.email"
                   :invalid="campoInvalido($form, 'email')"/>
        <Message v-if="campoInvalido($form, 'email')" severity="error" size="small" variant="simple">
          {{ obterMensagemCampo($form, 'email') }}
        </Message>
      </div>
      <div class="campo">
        <label for="especialidade">Especialidade</label>
        <Select
            inputId="especialidade"
            name="especialidade"
            v-model="formulario.especialidade"
            :options="especialidadesComSelecione"
            optionLabel="label"
            optionValue="value"
            filter
            emptyFilterMessage="Nenhum resultado encontrado"
            placeholder="Selecione"
            :invalid="campoInvalido($form, 'especialidade')"
        />
        <Message v-if="campoInvalido($form, 'especialidade')" severity="error" size="small" variant="simple">
          {{ obterMensagemCampo($form, 'especialidade') }}
        </Message>
      </div>
    </div>

    <div v-if="abaAtiva === 1" class="grid-campos">
      <div class="campo">
        <label for="cep">CEP</label>
        <InputMask id="cep" name="endereco.cep" v-model="formulario.endereco.cep" mask="99999-999"
                   :invalid="campoInvalido($form, 'endereco.cep')"/>
        <Message v-if="campoInvalido($form, 'endereco.cep')" severity="error" size="small" variant="simple">
          {{ obterMensagemCampo($form, 'endereco.cep') }}
        </Message>
      </div>
      <div class="campo">
        <label for="logradouro">Logradouro</label>
        <InputText id="logradouro" name="endereco.logradouro" v-model="formulario.endereco.logradouro"
                   :invalid="campoInvalido($form, 'endereco.logradouro')"/>
        <Message v-if="campoInvalido($form, 'endereco.logradouro')" severity="error" size="small" variant="simple">
          {{ obterMensagemCampo($form, 'endereco.logradouro') }}
        </Message>
      </div>
      <div class="campo">
        <label for="bairro">Bairro</label>
        <InputText id="bairro" name="endereco.bairro" v-model="formulario.endereco.bairro"
                   :invalid="campoInvalido($form, 'endereco.bairro')"/>
        <Message v-if="campoInvalido($form, 'endereco.bairro')" severity="error" size="small" variant="simple">
          {{ obterMensagemCampo($form, 'endereco.bairro') }}
        </Message>
      </div>
      <div class="campo">
        <label for="cidade">Cidade</label>
        <InputText id="cidade" name="endereco.cidade" v-model="formulario.endereco.cidade"
                   :invalid="campoInvalido($form, 'endereco.cidade')"/>
        <Message v-if="campoInvalido($form, 'endereco.cidade')" severity="error" size="small" variant="simple">
          {{ obterMensagemCampo($form, 'endereco.cidade') }}
        </Message>
      </div>
      <div class="campo">
        <label for="uf">UF</label>
        <Select
            inputId="uf"
            name="endereco.uf"
            v-model="formulario.endereco.uf"
            :options="ufsComSelecione"
            optionLabel="label"
            optionValue="value"
            filter
            emptyFilterMessage="Nenhum resultado encontrado"
            placeholder="Selecione"
            :invalid="campoInvalido($form, 'endereco.uf')"
        />
        <Message v-if="campoInvalido($form, 'endereco.uf')" severity="error" size="small" variant="simple">
          {{ obterMensagemCampo($form, 'endereco.uf') }}
        </Message>
      </div>
      <div class="campo">
        <label for="numero">Número</label>
        <InputText id="numero" name="endereco.numero" v-model="formulario.endereco.numero"
                   @input="tratarNumeroEnderecoInput"
                   @keydown="bloquearTeclaCampo('somenteNumeros', $event)"
                   @paste="bloquearColagemCampo('somenteNumeros', $event)"/>
      </div>
      <div class="campo">
        <label for="complemento">Complemento</label>
        <InputText id="complemento" name="endereco.complemento" v-model="formulario.endereco.complemento"/>
      </div>
    </div>

    <div v-if="abaAtiva === 2" class="grid-campos">
      <div class="campo">
        <label for="numConta">Número da conta</label>
        <InputMask id="numConta" name="conta.numConta" v-model="formulario.conta.numConta" mask="99999999-9"
                   :invalid="campoInvalido($form, 'conta.numConta')"/>
        <Message v-if="campoInvalido($form, 'conta.numConta')" severity="error" size="small" variant="simple">
          {{ obterMensagemCampo($form, 'conta.numConta') }}
        </Message>
      </div>
      <div class="campo">
        <label for="agencia">Agência</label>
        <InputMask id="agencia" name="conta.agencia" v-model="formulario.conta.agencia" mask="9999"
                   :invalid="campoInvalido($form, 'conta.agencia')"/>
        <Message v-if="campoInvalido($form, 'conta.agencia')" severity="error" size="small" variant="simple">
          {{ obterMensagemCampo($form, 'conta.agencia') }}
        </Message>
      </div>
      <div class="campo">
        <label for="tipoConta">Tipo da conta</label>
        <Select id="tipoConta" name="conta.tipoConta" v-model="formulario.conta.tipoConta"
                :options="tiposContaComSelecione"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecione"
                :invalid="campoInvalido($form, 'conta.tipoConta')"/>
        <Message v-if="campoInvalido($form, 'conta.tipoConta')" severity="error" size="small" variant="simple">
          {{ obterMensagemCampo($form, 'conta.tipoConta') }}
        </Message>
      </div>
      <div class="campo">
        <label for="salario">Salário</label>
        <InputNumber
            id="salario" name="conta.salario"
            v-model="formulario.conta.salario"
            mode="decimal"
            :minFractionDigits="2"
            :maxFractionDigits="2"
            :min="0.01"
            locale="pt-BR"
            :invalid="campoInvalido($form, 'conta.salario')"
        />
        <Message v-if="campoInvalido($form, 'conta.salario')" severity="error" size="small" variant="simple">
          {{ obterMensagemCampo($form, 'conta.salario') }}
        </Message>
      </div>
    </div>

    <div class="acoes-form">
      <Button label="Confirmar" type="submit" :loading="loading"/>
      <Button label="Cancelar" severity="secondary" outlined @click="cancelarCadastro"/>
    </div>
  </Form>
</template>

<script setup>
import {nextTick, ref, watch, computed} from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import TabMenu from 'primevue/tabmenu';
import Message from 'primevue/message';
import {Form} from '@primevue/forms';
import {extrairMensagemPorCampo} from '@/utils/msgErros';

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

const ufsBrasil = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT',
  'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO',
  'RR', 'SC', 'SP', 'SE', 'TO'
];

const especialidadesComSelecione = computed(() => [
  {label: 'Selecione', value: ''},
  ...(props.especialidadesOptions || [])
]);

const tiposContaComSelecione = computed(() => [
  {label: 'Selecione', value: ''},
  ...tiposConta
]);

const ufsComSelecione = computed(() => [
  {label: 'Selecione', value: ''},
  ...ufsBrasil.map((uf) => ({label: uf, value: uf}))
]);

const obterAbaPorCampo = (campo) => {
  if (!campo) return 0;
  if (campo.startsWith('endereco.')) return 1;
  if (campo.startsWith('conta.')) return 2;
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
    tipoConta: '',
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

// --- Lógica de Validação PrimeVue Forms ---

const resolver = ({values}) => {
  const errors = {};

  const addError = (field, message) => {
    errors[field] = [{message}];
  };

  // Dados Básicos
  if (!values.cpf) addError('cpf', 'CPF é obrigatório');
  if (!values.nome?.trim()) addError('nome', 'Nome é obrigatório');

  if (values.idade === null || values.idade === undefined || values.idade === '') {
    addError('idade', 'Idade é obrigatória');
  } else if (values.idade < 18) {
    addError('idade', 'O funcionário deve ser maior de 18 anos');
  } else if (values.idade > 120) {
    addError('idade', 'Idade inválida');
  }

  if (!values.email?.trim()) {
    addError('email', 'Email é obrigatório');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    addError('email', 'Email inválido');
  }

  if (!values.especialidade) addError('especialidade', 'Especialidade é obrigatória');

  // Endereço
  if (!values.endereco?.cep) addError('endereco.cep', 'CEP é obrigatório');
  if (!values.endereco?.logradouro?.trim()) addError('endereco.logradouro', 'Logradouro é obrigatório');
  if (!values.endereco?.bairro?.trim()) addError('endereco.bairro', 'Bairro é obrigatório');
  if (!values.endereco?.cidade?.trim()) addError('endereco.cidade', 'Cidade é obrigatória');
  if (!values.endereco?.uf) addError('endereco.uf', 'UF é obrigatória');

  // Dados Bancários
  if (!values.conta?.numConta) addError('conta.numConta', 'Número da conta é obrigatório');
  if (!values.conta?.agencia) addError('conta.agencia', 'Agência é obrigatória');
  if (!values.conta?.tipoConta) addError('conta.tipoConta', 'Tipo da conta é obrigatório');
  if (values.conta?.salario === null || values.conta?.salario === undefined || values.conta?.salario === '') {
    addError('conta.salario', 'Salário é obrigatório');
  }

  return {errors};
};

const obterEstadoCampoForm = ($form, campo) => {
  if (!$form) return null;
  return campo.split('.').reduce((acumulado, chave) => acumulado?.[chave], $form);
};

const campoInvalido = ($form, campo) => {
  const estado = obterEstadoCampoForm($form, campo);
  return props.camposComErro.includes(campo) || Boolean(estado?.invalid);
};

const obterMensagemCampo = ($form, campo) => {
  if (props.camposComErro.includes(campo)) {
    return extrairMensagemPorCampo(campo);
  }
  const estado = obterEstadoCampoForm($form, campo);
  return estado?.error?.message || '';
};

// --- Utilitários e Eventos ---

const numeroOuNulo = (valor) => {
  if (valor === '' || valor === null || valor === undefined) return null;
  const numero = Number(valor);
  return Number.isNaN(numero) ? null : numero;
};

const bloquearTeclaCampo = (tipo, event) => {
  const tecla = event?.key || '';
  const teclasLiberadas = ['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Home', 'End', 'Escape'];
  if (teclasLiberadas.includes(tecla) || event?.ctrlKey || event?.metaKey || event?.altKey) return;
  if (tecla.length !== 1) return;
  if (tipo === 'semNumeros' && /\d/.test(tecla)) event.preventDefault();
  if (tipo === 'somenteNumeros' && /\D/.test(tecla)) event.preventDefault();
};

const bloquearColagemCampo = (tipo, event) => {
  const texto = event?.clipboardData?.getData('text') || '';
  if (!texto) return;
  if (tipo === 'semNumeros' && /\d/.test(texto)) event.preventDefault();
  if (tipo === 'somenteNumeros' && /\D/.test(texto)) event.preventDefault();
};

const tratarNomeInput = (event) => {
  formulario.value.nome = String(event?.target?.value || '').replace(/\d/g, '');
};

const tratarNumeroEnderecoInput = (event) => {
  formulario.value.endereco.numero = String(event?.target?.value || '').replace(/\D/g, '');
};

const montarPayload = () => {
  const values = formulario.value;
  return {
    ...values,
    cpf: String(values.cpf || '').replace(/\D/g, ''),
    idade: numeroOuNulo(values.idade),
    conta: {
      ...values.conta,
      salario: numeroOuNulo(values.conta.salario)
    },
    endereco: {
      ...values.endereco,
      uf: String(values.endereco.uf || '').trim().toUpperCase()
    }
  };
};

const onFormSubmit = ({valid}) => {
  if (valid) {
    emit('confirmar', montarPayload());
  }
};

watch(
    () => props.focusField,
    async (campo) => {
      if (!campo) return;
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

.campo label {
  min-height: 1.25rem;
  display: flex;
  align-items: center;
}

.campo :deep(.p-inputtext),
.campo :deep(.p-inputmask),
.campo :deep(.p-inputnumber-input),
.campo :deep(.p-select) {
  min-height: 2.75rem;
}

.campo :deep(.p-select .p-select-label) {
  display: flex;
  align-items: center;
}

.acoes-form {
  margin-top: 1.25rem;
  display: flex;
  gap: 0.75rem;
}
</style>
