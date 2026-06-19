<template>
  <ModalPesquisaFuncionario
      v-model:visible="modalPesquisaVisivel"
      :funcionarios="props.funcionariosPesquisa"
      :loading="props.carregandoPesquisa"
      :mensagem="props.mensagemPesquisa"
      @selecionar="emit('selecionar-pesquisa', $event)"
  />

  <div v-if="funcionarioLocal" class="consulta-conteudo">
    <Form
        v-slot="$form"
        :resolver="resolver"
        :initialValues="formulario"
        :validateOnValueUpdate="false"
        :validateOnBlur="true"
        @submit="onFormSubmit"
    >
      <h2>Detalhes do funcionário</h2>
      <TabMenu v-model:activeIndex="abaAtiva" :model="abasCadastro" class="abas-cadastro"/>

      <div v-if="abaAtiva === 0" class="grid-campos">
        <div class="campo">
          <label for="cpf">CPF</label>
          <InputMask id="cpf" name="cpf" v-model="formulario.cpf" mask="999.999.999-99"
                     :disabled="!editando"
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
                     :disabled="!editando"
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
              :disabled="!editando"
              :invalid="campoInvalido($form, 'idade')"
          />
          <Message v-if="campoInvalido($form, 'idade')" severity="error" size="small" variant="simple">
            {{ obterMensagemCampo($form, 'idade') }}
          </Message>
        </div>
        <div class="campo">
          <label for="email">Email</label>
          <InputText id="email" name="email" v-model="formulario.email"
                     :disabled="!editando"
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
              :disabled="!editando"
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
                     :disabled="!editando"
                     :invalid="campoInvalido($form, 'endereco.cep')"/>
          <Message v-if="campoInvalido($form, 'endereco.cep')" severity="error" size="small" variant="simple">
            {{ obterMensagemCampo($form, 'endereco.cep') }}
          </Message>
        </div>
        <div class="campo">
          <label for="logradouro">Logradouro</label>
          <InputText id="logradouro" name="endereco.logradouro" v-model="formulario.endereco.logradouro"
                     :disabled="!editando"
                     :invalid="campoInvalido($form, 'endereco.logradouro')"/>
          <Message v-if="campoInvalido($form, 'endereco.logradouro')" severity="error" size="small" variant="simple">
            {{ obterMensagemCampo($form, 'endereco.logradouro') }}
          </Message>
        </div>
        <div class="campo">
          <label for="bairro">Bairro</label>
          <InputText id="bairro" name="endereco.bairro" v-model="formulario.endereco.bairro"
                     :disabled="!editando"
                     :invalid="campoInvalido($form, 'endereco.bairro')"/>
          <Message v-if="campoInvalido($form, 'endereco.bairro')" severity="error" size="small" variant="simple">
            {{ obterMensagemCampo($form, 'endereco.bairro') }}
          </Message>
        </div>
        <div class="campo">
          <label for="cidade">Cidade</label>
          <InputText id="cidade" name="endereco.cidade" v-model="formulario.endereco.cidade"
                     :disabled="!editando"
                     :invalid="campoInvalido($form, 'endereco.cidade')"/>
          <Message v-if="campoInvalido($form, 'endereco.cidade')" severity="error" size="small" variant="simple">
            {{ obterMensagemCampo($form, 'endereco.cidade') }}
          </Message>
        </div>
        <div class="campo">
          <label for="uf">Estado - UF</label>
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
              :disabled="!editando"
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
                     @paste="bloquearColagemCampo('somenteNumeros', $event)"
                     :disabled="!editando"/>
        </div>
        <div class="campo">
          <label for="complemento">Complemento</label>
          <InputText id="complemento" name="endereco.complemento" v-model="formulario.endereco.complemento"
                     :disabled="!editando"/>
        </div>
      </div>

      <div v-if="abaAtiva === 2" class="grid-campos">
        <div class="campo">
          <label for="numConta">Número da conta</label>
          <InputMask id="numConta" name="conta.numConta" v-model="formulario.conta.numConta" mask="99999999-9"
                     :disabled="!editando"
                     :invalid="campoInvalido($form, 'conta.numConta')"/>
          <Message v-if="campoInvalido($form, 'conta.numConta')" severity="error" size="small" variant="simple">
            {{ obterMensagemCampo($form, 'conta.numConta') }}
          </Message>
        </div>
        <div class="campo">
          <label for="agencia">Agência</label>
          <InputMask id="agencia" name="conta.agencia" v-model="formulario.conta.agencia" mask="9999"
                     :disabled="!editando"
                     :invalid="campoInvalido($form, 'conta.agencia')"/>
          <Message v-if="campoInvalido($form, 'conta.agencia')" severity="error" size="small" variant="simple">
            {{ obterMensagemCampo($form, 'conta.agencia') }}
          </Message>
        </div>
        <div class="campo">
          <label for="tipoConta">Tipo da conta</label>
          <Select
              id="tipoConta"
              name="conta.tipoConta"
              v-model="formulario.conta.tipoConta"
              :options="tiposContaComSelecione"
              optionLabel="label"
              optionValue="value"
              placeholder="Selecione"
              :disabled="!editando"
              :invalid="campoInvalido($form, 'conta.tipoConta')"
          />
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
              :disabled="!editando"
              :invalid="campoInvalido($form, 'conta.salario')"
          />
          <Message v-if="campoInvalido($form, 'conta.salario')" severity="error" size="small" variant="simple">
            {{ obterMensagemCampo($form, 'conta.salario') }}
          </Message>
        </div>
      </div>

      <div class="acoes-form">
        <Button
            label="Editar"
            type="submit"
            :loading="loading"
        />
        <Button
            label="Excluir"
            severity="danger"
            outlined
            :disabled="!funcionarioLocal || loading"
            @click="excluirFuncionario"
        />
        <Button
            label="Cancelar"
            severity="secondary"
            outlined
            @click="cancelarConsulta"
        />
      </div>
    </Form>
  </div>
</template>

<script setup>
import {computed, ref, watch} from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import TabMenu from 'primevue/tabmenu';
import Message from 'primevue/message';
import {Form} from '@primevue/forms';
import {extrairMensagemPorCampo} from '@/utils/msgErros.js';
import ModalPesquisaFuncionario from '@/components/cadastro/ModalPesquisaFuncionario.vue';

const ufsBrasil = [
  {nome: 'Acre', uf: 'AC'},
  {nome: 'Alagoas', uf: 'AL'},
  {nome: 'Amapá', uf: 'AP'},
  {nome: 'Amazonas', uf: 'AM'},
  {nome: 'Bahia', uf: 'BA'},
  {nome: 'Ceará', uf: 'CE'},
  {nome: 'Distrito Federal', uf: 'DF'},
  {nome: 'Espírito Santo', uf: 'ES'},
  {nome: 'Goiás', uf: 'GO'},
  {nome: 'Maranhão', uf: 'MA'},
  {nome: 'Mato Grosso', uf: 'MT'},
  {nome: 'Mato Grosso do Sul', uf: 'MS'},
  {nome: 'Minas Gerais', uf: 'MG'},
  {nome: 'Pará', uf: 'PA'},
  {nome: 'Paraíba', uf: 'PB'},
  {nome: 'Paraná', uf: 'PR'},
  {nome: 'Pernambuco', uf: 'PE'},
  {nome: 'Piauí', uf: 'PI'},
  {nome: 'Rio de Janeiro', uf: 'RJ'},
  {nome: 'Rio Grande do Norte', uf: 'RN'},
  {nome: 'Rio Grande do Sul', uf: 'RS'},
  {nome: 'Rondônia', uf: 'RO'},
  {nome: 'Roraima', uf: 'RR'},
  {nome: 'Santa Catarina', uf: 'SC'},
  {nome: 'São Paulo', uf: 'SP'},
  {nome: 'Sergipe', uf: 'SE'},
  {nome: 'Tocantins', uf: 'TO'}
];

const ufsComSelecione = [
  {label: 'Selecione', value: ''},
  ...ufsBrasil.map((item) => ({label: `${item.nome} - ${item.uf}`, value: item.uf}))
];

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  funcionario: {
    type: Object,
    default: null
  },
  especialidadesOptions: {
    type: Array,
    default: () => []
  },
  camposComErro: {
    type: Array,
    default: () => []
  },
  mostrarModalPesquisa: {
    type: Boolean,
    default: false
  },
  funcionariosPesquisa: {
    type: Array,
    default: () => []
  },
  carregandoPesquisa: {
    type: Boolean,
    default: false
  },
  mensagemPesquisa: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['salvar', 'excluir', 'cancelar', 'selecionar-pesquisa', 'update:mostrarModalPesquisa']);

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

const tiposContaComSelecione = computed(() => [
  {label: 'Selecione', value: ''},
  ...tiposConta
]);

const especialidadesComSelecione = computed(() => [
  {label: 'Selecione', value: ''},
  ...(props.especialidadesOptions || [])
]);

const obterCodigoEspecialidade = (valor) => {
  if (!valor) return '';
  const valorNormalizado = String(valor).trim().toLowerCase();
  const encontrado = (props.especialidadesOptions || []).find((item) => {
    const codigo = String(item?.value ?? '').trim().toLowerCase();
    const descricao = String(item?.label ?? '').trim().toLowerCase();
    return valorNormalizado === codigo || valorNormalizado === descricao;
  });
  return encontrado?.value || String(valor).trim();
};

const obterCodigoTipoConta = (valor) => {
  const encontrado = tiposConta.find((item) => item.value === valor || item.label === valor);
  return encontrado?.value || String(valor || '');
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
const funcionarioLocal = ref(null);
const editando = ref(true);
const abaAtiva = ref(0);
const modalPesquisaVisivel = computed({
  get: () => props.mostrarModalPesquisa,
  set: (valor) => emit('update:mostrarModalPesquisa', valor)
});

// --- Lógica de Validação PrimeVue Forms ---

const resolver = ({values}) => {
  const errors = {};
  const addError = (field, message) => {
    errors[field] = [{message}];
  };

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

  if (!values.endereco?.cep) addError('endereco.cep', 'CEP é obrigatório');
  if (!values.endereco?.logradouro?.trim()) addError('endereco.logradouro', 'Logradouro é obrigatório');
  if (!values.endereco?.bairro?.trim()) addError('endereco.bairro', 'Bairro é obrigatório');
  if (!values.endereco?.cidade?.trim()) addError('endereco.cidade', 'Cidade é obrigatória');
  if (!values.endereco?.uf) addError('endereco.uf', 'UF é obrigatória');

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

const normalizarCpf = (valor) => String(valor || '').replace(/\D/g, '');

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

const clonarFuncionario = (funcionario) => ({
  cpf: funcionario?.cpf || '',
  nome: funcionario?.nome || '',
  idade: funcionario?.idade ?? '',
  email: funcionario?.email || '',
  especialidade: obterCodigoEspecialidade(
      typeof funcionario?.especialidade === 'string'
          ? funcionario.especialidade
          : funcionario?.especialidade?.descricao || funcionario?.especialidade?.label || funcionario?.especialidade?.nome || funcionario?.especialidade?.codigo || funcionario?.especialidade?.value || funcionario?.especialidade?.id
  ),
  conta: {
    numConta: funcionario?.conta?.numConta || '',
    agencia: funcionario?.conta?.agencia || '',
    tipoConta: obterCodigoTipoConta(funcionario?.conta?.tipoConta),
    salario: funcionario?.conta?.salario ?? ''
  },
  endereco: {
    cep: funcionario?.endereco?.cep || '',
    logradouro: funcionario?.endereco?.logradouro || '',
    bairro: funcionario?.endereco?.bairro || '',
    cidade: funcionario?.endereco?.cidade || '',
    uf: funcionario?.endereco?.uf || '',
    numero: funcionario?.endereco?.numero || '',
    complemento: funcionario?.endereco?.complemento || ''
  }
});

const normalizarPayload = () => {
  const values = formulario.value;
  return {
    ...values,
    cpf: normalizarCpf(values.cpf),
    idade: values.idade === '' || values.idade === null ? null : Number(values.idade),
    especialidade: obterCodigoEspecialidade(values.especialidade),
    conta: {
      ...values.conta,
      salario: values.conta.salario === '' || values.conta.salario === null ? null : Number(values.conta.salario)
    },
    endereco: {
      ...values.endereco,
      uf: String(values.endereco.uf || '').trim().toUpperCase()
    }
  };
};

const onFormSubmit = ({valid}) => {
  if (valid) {
    emit('salvar', normalizarPayload());
  }
};

const excluirFuncionario = () => {
  emit('excluir', normalizarCpf(formulario.value.cpf));
};

const cancelarConsulta = () => {
  emit('cancelar');
};

watch(
    () => props.funcionario,
    (novoFuncionario) => {
      funcionarioLocal.value = novoFuncionario;
      formulario.value = novoFuncionario ? clonarFuncionario(novoFuncionario) : formularioInicial();
      editando.value = true;
      abaAtiva.value = 0;
    },
    {immediate: true, deep: true}
);
</script>

<style scoped>
.consulta-conteudo {
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 0.75rem;
  padding: 1rem;
}

.consulta-conteudo h2 {
  margin: 0 0 1rem;
}

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
  flex-wrap: wrap;
}
</style>
