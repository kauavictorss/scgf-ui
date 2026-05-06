<template>
  <TabMenu v-model:activeIndex="abaAtiva" :model="abasCadastro" class="abas-cadastro"/>

  <div v-if="abaAtiva === 0" class="grid-campos">
    <div class="campo">
      <label for="cpf">CPF</label>
      <InputMask id="cpf" v-model="formulario.cpf" mask="999.999.999-99"
                 :invalid="obterValidacaoCampo('cpf').invalido"
                 @blur="marcarCampoTocado('cpf')"/>
      <small v-if="obterValidacaoCampo('cpf').invalido" class="erro-label">
        {{ obterValidacaoCampo('cpf').mensagem }}
      </small>
    </div>
    <div class="campo">
      <label for="nome">Nome</label>
      <InputText id="nome" v-model="formulario.nome"
                 @input="tratarNomeInput"
                 @keydown="bloquearTeclaCampo('semNumeros', $event)"
                 @paste="bloquearColagemCampo('semNumeros', $event)"
                  :invalid="obterValidacaoCampo('nome').invalido"
                  @blur="marcarCampoTocado('nome')"/>
      <small v-if="obterValidacaoCampo('nome').invalido" class="erro-label">
        {{ obterValidacaoCampo('nome').mensagem }}
      </small>
    </div>
    <div class="campo">
      <label for="idade">Idade</label>
      <InputNumber
          id="idade"
          v-model="formulario.idade"
          :useGrouping="false"
          :invalid="obterValidacaoCampo('idade').invalido"
          @blur="marcarCampoTocado('idade')"
      />
      <small v-if="obterValidacaoCampo('idade').invalido" class="erro-label">
        {{ obterValidacaoCampo('idade').mensagem }}
      </small>
    </div>
    <div class="campo">
      <label for="email">Email</label>
      <InputText id="email" v-model="formulario.email"
                 :invalid="obterValidacaoCampo('email').invalido"
                 @blur="marcarCampoTocado('email')"/>
      <small v-if="obterValidacaoCampo('email').invalido" class="erro-label">
        {{ obterValidacaoCampo('email').mensagem }}
      </small>
    </div>
    <div class="campo">
      <label for="especialidade">Especialidade</label>
      <Select
          inputId="especialidade"
          v-model="formulario.especialidade"
          :options="especialidadesComSelecione"
          optionLabel="label"
          optionValue="value"
          filter
          emptyFilterMessage="Nenhum resultado encontrado"
          placeholder="Selecione"
          :invalid="obterValidacaoCampo('especialidade').invalido"
          @blur="marcarCampoTocado('especialidade')"
      />
      <small v-if="obterValidacaoCampo('especialidade').invalido" class="erro-label">
        {{ obterValidacaoCampo('especialidade').mensagem }}
      </small>
    </div>
  </div>

  <div v-if="abaAtiva === 1" class="grid-campos">
    <div class="campo">
      <label for="cep">CEP</label>
      <InputMask id="cep" v-model="formulario.endereco.cep" mask="99999-999"
                 :invalid="obterValidacaoCampo('endereco.cep').invalido"
                 @blur="marcarCampoTocado('endereco.cep')"/>
      <small v-if="obterValidacaoCampo('endereco.cep').invalido" class="erro-label">
        {{ obterValidacaoCampo('endereco.cep').mensagem }}
      </small>
    </div>
    <div class="campo">
      <label for="logradouro">Logradouro</label>
      <InputText id="logradouro" v-model="formulario.endereco.logradouro"
                 :invalid="obterValidacaoCampo('endereco.logradouro').invalido"
                 @blur="marcarCampoTocado('endereco.logradouro')"/>
      <small v-if="obterValidacaoCampo('endereco.logradouro').invalido" class="erro-label">
        {{ obterValidacaoCampo('endereco.logradouro').mensagem }}
      </small>
    </div>
    <div class="campo">
      <label for="bairro">Bairro</label>
      <InputText id="bairro" v-model="formulario.endereco.bairro"
                 :invalid="obterValidacaoCampo('endereco.bairro').invalido"
                 @blur="marcarCampoTocado('endereco.bairro')"/>
      <small v-if="obterValidacaoCampo('endereco.bairro').invalido" class="erro-label">
        {{ obterValidacaoCampo('endereco.bairro').mensagem }}
      </small>
    </div>
    <div class="campo">
      <label for="cidade">Cidade</label>
      <InputText id="cidade" v-model="formulario.endereco.cidade"
                 :invalid="obterValidacaoCampo('endereco.cidade').invalido"
                 @blur="marcarCampoTocado('endereco.cidade')"/>
      <small v-if="obterValidacaoCampo('endereco.cidade').invalido" class="erro-label">
        {{ obterValidacaoCampo('endereco.cidade').mensagem }}
      </small>
    </div>
    <div class="campo">
      <label for="uf">UF</label>
      <Select
          inputId="uf"
          v-model="formulario.endereco.uf"
          :options="ufsComSelecione"
          optionLabel="label"
          optionValue="value"
          filter
          emptyFilterMessage="Nenhum resultado encontrado"
          placeholder="Selecione"
          :invalid="obterValidacaoCampo('endereco.uf').invalido"
          @blur="marcarCampoTocado('endereco.uf')"
      />
      <small v-if="obterValidacaoCampo('endereco.uf').invalido" class="erro-label">
        {{ obterValidacaoCampo('endereco.uf').mensagem }}
      </small>
    </div>
    <div class="campo">
      <label for="numero">Número</label>
      <InputText id="numero" v-model="formulario.endereco.numero"
                 @input="tratarNumeroEnderecoInput"
                 @keydown="bloquearTeclaCampo('somenteNumeros', $event)"
                 @paste="bloquearColagemCampo('somenteNumeros', $event)"
                  @blur="marcarCampoTocado('endereco.numero')"/>
    </div>
    <div class="campo">
      <label for="complemento">Complemento</label>
      <InputText id="complemento" v-model="formulario.endereco.complemento"
                 @blur="marcarCampoTocado('endereco.complemento')"/>
    </div>
  </div>

  <div v-if="abaAtiva === 2" class="grid-campos">
    <div class="campo">
      <label for="numConta">Número da conta</label>
      <InputMask id="numConta" v-model="formulario.conta.numConta" mask="99999999-9"
                 :invalid="obterValidacaoCampo('conta.numConta').invalido"
                 @blur="marcarCampoTocado('conta.numConta')"/>
      <small v-if="obterValidacaoCampo('conta.numConta').invalido" class="erro-label">
        {{ obterValidacaoCampo('conta.numConta').mensagem }}
      </small>
    </div>
    <div class="campo">
      <label for="agencia">Agência</label>
      <InputMask id="agencia" v-model="formulario.conta.agencia" mask="9999"
                 :invalid="obterValidacaoCampo('conta.agencia').invalido"
                 @blur="marcarCampoTocado('conta.agencia')"/>
      <small v-if="obterValidacaoCampo('conta.agencia').invalido" class="erro-label">
        {{ obterValidacaoCampo('conta.agencia').mensagem }}
      </small>
    </div>
    <div class="campo">
      <label for="tipoConta">Tipo da conta</label>
      <Select id="tipoConta" v-model="formulario.conta.tipoConta" :options="tiposContaComSelecione" optionLabel="label"
              optionValue="value"
              placeholder="Selecione"
              :invalid="obterValidacaoCampo('conta.tipoConta').invalido"
              @blur="marcarCampoTocado('conta.tipoConta')"/>
      <small v-if="obterValidacaoCampo('conta.tipoConta').invalido" class="erro-label">
        {{ obterValidacaoCampo('conta.tipoConta').mensagem }}
      </small>
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
          locale="pt-BR"
          :invalid="obterValidacaoCampo('conta.salario').invalido"
          @blur="marcarCampoTocado('conta.salario')"
      />
      <small v-if="obterValidacaoCampo('conta.salario').invalido" class="erro-label">
        {{ obterValidacaoCampo('conta.salario').mensagem }}
      </small>
    </div>
  </div>

  <div class="acoes-form">
    <Button label="Confirmar" :loading="loading" :disabled="!todosCamposValidos" @click="confirmarCadastro"/>
    <Button label="Cancelar" severity="secondary" outlined @click="cancelarCadastro"/>
  </div>
</template>

<script setup>
import {nextTick, ref, watch, computed} from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import TabMenu from 'primevue/tabmenu';
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

// Computed para adicionar opção "Selecione" nas especialidades
const especialidadesComSelecione = computed(() => {
  const opcoes = props.especialidadesOptions || [];
  return [
    {label: 'Selecione', value: ''},
    ...opcoes
  ];
});

// Computed para adicionar opção "Selecione" nos tipos de conta
const tiposContaComSelecione = computed(() => [
  {label: 'Selecione', value: ''},
  ...tiposConta
]);

const ufsComSelecione = computed(() => [
  {label: 'Selecione', value: ''},
  ...ufsBrasil.map((uf) => ({label: uf, value: uf}))
]);

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

// Tracking de quais campos foram tocados (blur/changed)
const camposTocados = ref({
  cpf: false,
  nome: false,
  idade: false,
  email: false,
  especialidade: false,
  'endereco.cep': false,
  'endereco.logradouro': false,
  'endereco.bairro': false,
  'endereco.cidade': false,
  'endereco.uf': false,
  'conta.numConta': false,
  'conta.agencia': false,
  'conta.tipoConta': false,
  'conta.salario': false
});

// Campos obrigatórios
const camposObrigatorios = [
  'cpf', 'nome', 'idade', 'email', 'especialidade',
  'endereco.cep', 'endereco.logradouro', 'endereco.bairro',
  'endereco.cidade', 'endereco.uf',
  'conta.numConta', 'conta.agencia', 'conta.tipoConta', 'conta.salario'
];

// Verificar se um campo está vazio
const estaCampoVazio = (campo) => {
  if (campo === 'endereco.cep') return !formulario.value.endereco.cep?.trim();
  if (campo === 'endereco.logradouro') return !formulario.value.endereco.logradouro?.trim();
  if (campo === 'endereco.bairro') return !formulario.value.endereco.bairro?.trim();
  if (campo === 'endereco.cidade') return !formulario.value.endereco.cidade?.trim();
  if (campo === 'endereco.uf') return !formulario.value.endereco.uf?.trim();
  if (campo === 'conta.numConta') return !formulario.value.conta.numConta?.trim();
  if (campo === 'conta.agencia') return !formulario.value.conta.agencia?.trim();
  if (campo === 'conta.tipoConta') return !formulario.value.conta.tipoConta?.trim();
  if (campo === 'conta.salario') return !formulario.value.conta.salario;

  const valor = formulario.value[campo];
  if (typeof valor === 'string') return !valor?.trim();
  return !valor;
};

// Validações específicas por campo
const validarCampo = (campo) => {
  if (campo === 'idade') {
    if (estaCampoVazio('idade')) return {invalido: true, mensagem: 'Idade é obrigatória'};
    if (formulario.value.idade < 18) return {invalido: true, mensagem: 'O funcionário deve ser maior de 18 anos'};
    if (formulario.value.idade > 120) return {invalido: true, mensagem: 'Idade inválida'};
    return {invalido: false, mensagem: ''};
  }

  if (campo === 'cpf') {
    if (estaCampoVazio('cpf')) return {invalido: true, mensagem: 'CPF é obrigatório'};
    return {invalido: false, mensagem: ''};
  }

  if (campo === 'email') {
    if (estaCampoVazio('email')) return {invalido: true, mensagem: 'Email é obrigatório'};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(formulario.value.email || '').trim())) {
      return {invalido: true, mensagem: 'Email inválido'};
    }
    return {invalido: false, mensagem: ''};
  }

  if (campo === 'endereco.uf') {
    if (estaCampoVazio('endereco.uf')) return {invalido: true, mensagem: 'UF é obrigatória'};
    if (!ufsBrasil.includes(String(formulario.value.endereco.uf || '').trim().toUpperCase())) {
      return {invalido: true, mensagem: 'UF inválida'};
    }
    return {invalido: false, mensagem: ''};
  }

  if (campo === 'especialidade') {
    if (estaCampoVazio('especialidade')) return {invalido: true, mensagem: 'Especialidade é obrigatória'};
    return {invalido: false, mensagem: ''};
  }

  // Para campos de endereço e conta, apenas verifica se está vazio
  if (estaCampoVazio(campo)) {
    return {invalido: true, mensagem: extrairMensagemPorCampo(campo)};
  }
  return {invalido: false, mensagem: ''};
};

// Computed para validação geral
const todosCamposValidos = computed(() => {
  // Todos os campos obrigatórios devem ser válidos
  return camposObrigatorios.every(campo => {
    const validacao = validarCampo(campo);
    return !validacao.invalido;
  });
});

// Marcar campo como tocado
const marcarCampoTocado = (campo) => {
  camposTocados.value[campo] = true;
};

// Obter validação de campo com consideração de "tocado"
const obterValidacaoCampo = (campo) => {
  // Se vem erro do backend, sempre mostra como inválido
  if (props.camposComErro.includes(campo)) {
    return {
      invalido: true,
      mensagem: extrairMensagemPorCampo(campo)
    };
  }

  // Se o campo é obrigatório e foi tocado, valida
  if (camposObrigatorios.includes(campo) && camposTocados.value[campo]) {
    return validarCampo(campo);
  }

  return {invalido: false, mensagem: ''};
};

const numeroOuNulo = (valor) => {
  if (valor === '' || valor === null || valor === undefined) {
    return null;
  }

  const numero = Number(valor);
  return Number.isNaN(numero) ? null : numero;
};

const bloquearTeclaCampo = (tipo, event) => {
  const tecla = event?.key || '';
  const teclasLiberadas = [
    'Backspace',
    'Tab',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Delete',
    'Home',
    'End',
    'Escape'
  ];

  if (teclasLiberadas.includes(tecla) || event?.ctrlKey || event?.metaKey || event?.altKey) {
    return;
  }

  if (tecla.length !== 1) {
    return;
  }

  if (tipo === 'semNumeros' && /\d/.test(tecla)) {
    event.preventDefault();
  }

  if (tipo === 'somenteNumeros' && /\D/.test(tecla)) {
    event.preventDefault();
  }

  if (tipo === 'somenteLetras' && /\d/.test(tecla)) {
    event.preventDefault();
  }
};

const bloquearColagemCampo = (tipo, event) => {
  const texto = event?.clipboardData?.getData('text') || '';

  if (!texto) {
    return;
  }

  if (tipo === 'semNumeros' && /\d/.test(texto)) {
    event.preventDefault();
  }

  if (tipo === 'somenteNumeros' && /\D/.test(texto)) {
    event.preventDefault();
  }

  if (tipo === 'somenteLetras' && /\d/.test(texto)) {
    event.preventDefault();
  }
};

const tratarNomeInput = (event) => {
  formulario.value.nome = String(event?.target?.value || '').replace(/\d/g, '');
};

const tratarNumeroEnderecoInput = (event) => {
  formulario.value.endereco.numero = String(event?.target?.value || '').replace(/\D/g, '');
};

const montarPayload = () => ({
  ...formulario.value,
  cpf: String(formulario.value.cpf || '').replace(/\D/g, ''),
  idade: numeroOuNulo(formulario.value.idade),
  especialidade: (formulario.value.especialidade || '').trim(),
  conta: {
    ...formulario.value.conta,
    salario: numeroOuNulo(formulario.value.conta.salario)
  },
  endereco: {
    ...formulario.value.endereco,
    uf: String(formulario.value.endereco.uf || '').trim().toUpperCase()
  }
});

const confirmarCadastro = () => {
  emit('confirmar', montarPayload());
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
  // Reseta o rastreamento de campos tocados
  camposTocados.value = {
    cpf: false,
    nome: false,
    idade: false,
    email: false,
    especialidade: false,
    'endereco.cep': false,
    'endereco.logradouro': false,
    'endereco.bairro': false,
    'endereco.cidade': false,
    'endereco.uf': false,
    'conta.numConta': false,
    'conta.agencia': false,
    'conta.tipoConta': false,
    'conta.salario': false
  };
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

.erro-label {
  color: var(--app-danger);
  font-size: 0.9rem;
  line-height: 1.3;
  font-weight: 600;
}

.acoes-form {
  margin-top: 1.25rem;
  display: flex;
  gap: 0.75rem;
}
</style>
