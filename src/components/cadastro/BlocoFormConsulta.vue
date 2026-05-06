<template>
  <ModalPesquisaFuncionario
      v-model:visible="modalPesquisaVisivel"
      :funcionarios="props.funcionariosPesquisa"
      :loading="props.carregandoPesquisa"
      :mensagem="props.mensagemPesquisa"
      @selecionar="emit('selecionar-pesquisa', $event)"
  />

  <div v-if="funcionarioLocal" class="consulta-conteudo">
    <h2>Detalhes do funcionário</h2>
    <TabMenu v-model:activeIndex="abaAtiva" :model="abasCadastro" class="abas-cadastro"/>

    <div v-if="abaAtiva === 0" class="grid-campos">
      <div class="campo">
        <label for="cpf">CPF</label>
        <InputMask id="cpf" v-model="formulario.cpf" mask="999.999.999-99"
                   :disabled="!editando"
                   :invalid="obterValidacaoCampo('cpf').invalido"
                   @blur="marcarCampoTocado('cpf')"/>
        <small v-if="obterValidacaoCampo('cpf').invalido" class="erro-label">
          {{ obterValidacaoCampo('cpf').mensagem }}
        </small>
      </div>
      <div class="campo">
        <label for="nome">Nome</label>
        <InputText id="nome" v-model="formulario.nome"
                   :disabled="!editando"
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
            :disabled="!editando"
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
                   :disabled="!editando"
                   :invalid="obterValidacaoCampo('email').invalido"
                   @blur="marcarCampoTocado('email')"/>
        <small v-if="obterValidacaoCampo('email').invalido" class="erro-label">
          {{ obterValidacaoCampo('email').mensagem }}
        </small>
      </div>
      <div class="campo">
        <label for="especialidade">Especialidade</label>
        <Select
            id="especialidade"
            v-model="formulario.especialidade"
            :options="especialidadesComSelecione"
            optionLabel="label"
            optionValue="value"
            filter
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
                   :disabled="!editando"
                   :invalid="obterValidacaoCampo('endereco.cep').invalido"
                   @blur="marcarCampoTocado('endereco.cep')"/>
        <small v-if="obterValidacaoCampo('endereco.cep').invalido" class="erro-label">
          {{ obterValidacaoCampo('endereco.cep').mensagem }}
        </small>
      </div>
      <div class="campo">
        <label for="logradouro">Logradouro</label>
        <InputText id="logradouro" v-model="formulario.endereco.logradouro"
                   :disabled="!editando"
                   :invalid="obterValidacaoCampo('endereco.logradouro').invalido"
                   @blur="marcarCampoTocado('endereco.logradouro')"/>
        <small v-if="obterValidacaoCampo('endereco.logradouro').invalido" class="erro-label">
          {{ obterValidacaoCampo('endereco.logradouro').mensagem }}
        </small>
      </div>
      <div class="campo">
        <label for="bairro">Bairro</label>
        <InputText id="bairro" v-model="formulario.endereco.bairro"
                   :disabled="!editando"
                   :invalid="obterValidacaoCampo('endereco.bairro').invalido"
                   @blur="marcarCampoTocado('endereco.bairro')"/>
        <small v-if="obterValidacaoCampo('endereco.bairro').invalido" class="erro-label">
          {{ obterValidacaoCampo('endereco.bairro').mensagem }}
        </small>
      </div>
      <div class="campo">
        <label for="cidade">Cidade</label>
        <InputText id="cidade" v-model="formulario.endereco.cidade"
                   :disabled="!editando"
                   :invalid="obterValidacaoCampo('endereco.cidade').invalido"
                   @blur="marcarCampoTocado('endereco.cidade')"/>
        <small v-if="obterValidacaoCampo('endereco.cidade').invalido" class="erro-label">
          {{ obterValidacaoCampo('endereco.cidade').mensagem }}
        </small>
      </div>
      <div class="campo">
        <label for="uf">UF</label>
        <InputText id="uf" v-model="formulario.endereco.uf" maxlength="2"
                   :disabled="!editando"
                   @input="normalizarUf"
                   :invalid="obterValidacaoCampo('endereco.uf').invalido"
                   @blur="marcarCampoTocado('endereco.uf')"/>
        <small v-if="obterValidacaoCampo('endereco.uf').invalido" class="erro-label">
          {{ obterValidacaoCampo('endereco.uf').mensagem }}
        </small>
      </div>
      <div class="campo">
        <label for="numero">Número</label>
        <InputText id="numero" v-model="formulario.endereco.numero"
                   :disabled="!editando"
                   @blur="marcarCampoTocado('endereco.numero')"/>
      </div>
      <div class="campo">
        <label for="complemento">Complemento</label>
        <InputText id="complemento" v-model="formulario.endereco.complemento"
                   :disabled="!editando"
                   @blur="marcarCampoTocado('endereco.complemento')"/>
      </div>
    </div>

    <div v-if="abaAtiva === 2" class="grid-campos">
      <div class="campo">
        <label for="numConta">Número da conta</label>
        <InputMask id="numConta" v-model="formulario.conta.numConta" mask="99999999-9"
                   :disabled="!editando"
                   :invalid="obterValidacaoCampo('conta.numConta').invalido"
                   @blur="marcarCampoTocado('conta.numConta')"/>
        <small v-if="obterValidacaoCampo('conta.numConta').invalido" class="erro-label">
          {{ obterValidacaoCampo('conta.numConta').mensagem }}
        </small>
      </div>
      <div class="campo">
        <label for="agencia">Agência</label>
        <InputMask id="agencia" v-model="formulario.conta.agencia" mask="9999"
                   :disabled="!editando"
                   :invalid="obterValidacaoCampo('conta.agencia').invalido"
                   @blur="marcarCampoTocado('conta.agencia')"/>
        <small v-if="obterValidacaoCampo('conta.agencia').invalido" class="erro-label">
          {{ obterValidacaoCampo('conta.agencia').mensagem }}
        </small>
      </div>
      <div class="campo">
        <label for="tipoConta">Tipo da conta</label>
        <Select
            id="tipoConta"
            v-model="formulario.conta.tipoConta"
            :options="tiposContaComSelecione"
            optionLabel="label"
            optionValue="value"
            placeholder="Selecione"
            :invalid="obterValidacaoCampo('conta.tipoConta').invalido"
            @blur="marcarCampoTocado('conta.tipoConta')"
        />
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
            :disabled="!editando"
            :invalid="obterValidacaoCampo('conta.salario').invalido"
            @blur="marcarCampoTocado('conta.salario')"
        />
        <small v-if="obterValidacaoCampo('conta.salario').invalido" class="erro-label">
          {{ obterValidacaoCampo('conta.salario').mensagem }}
        </small>
      </div>
    </div>

    <div class="acoes-form">
      <Button
          label="Salvar"
          :loading="loading"
          :disabled="!todosCamposValidos"
          @click="salvarAlteracoes"
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
import {extrairMensagemPorCampo} from '@/utils/msgErros.js';
import ModalPesquisaFuncionario from '@/components/cadastro/ModalPesquisaFuncionario.vue';

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

const obterDescricaoEspecialidade = (valor) => {
  if (!valor) {
    return '';
  }

  const valorNormalizado = String(valor).trim().toLowerCase();
  const encontrado = (props.especialidadesOptions || []).find((item) => {
    const codigo = String(item?.value ?? '').trim().toLowerCase();
    const descricao = String(item?.label ?? '').trim().toLowerCase();
    return valorNormalizado === codigo || valorNormalizado === descricao;
  });

  return encontrado?.label || String(valor).trim();
};

const obterCodigoEspecialidade = (valor) => {
  if (!valor) {
    return '';
  }

  const valorNormalizado = String(valor).trim().toLowerCase();
  const encontrado = (props.especialidadesOptions || []).find((item) => {
    const codigo = String(item?.value ?? '').trim().toLowerCase();
    const descricao = String(item?.label ?? '').trim().toLowerCase();
    return valorNormalizado === codigo || valorNormalizado === descricao;
  });

  return encontrado?.value || String(valor).trim();
};

const obterDescricaoTipoConta = (valor) => {
  const encontrado = tiposConta.find((item) => item.value === valor);
  return encontrado?.label || String(valor || '');
};

const obterCodigoTipoConta = (valor) => {
  const encontrado = tiposConta.find((item) => item.value === valor || item.label === valor);
  return encontrado?.value || String(valor || '');
};

const especialidadeExibicao = computed(() => obterDescricaoEspecialidade(formulario.value.especialidade));
const tipoContaExibicao = computed(() => obterDescricaoTipoConta(formulario.value.conta.tipoConta));

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
const camposTocados = ref({});
const modalPesquisaVisivel = computed({
  get: () => props.mostrarModalPesquisa,
  set: (valor) => emit('update:mostrarModalPesquisa', valor)
});

const camposObrigatorios = [
  'cpf', 'nome', 'idade', 'email', 'especialidade',
  'endereco.cep', 'endereco.logradouro', 'endereco.bairro',
  'endereco.cidade', 'endereco.uf',
  'conta.numConta', 'conta.agencia', 'conta.tipoConta', 'conta.salario'
];

const estadoCamposTocadosInicial = () => camposObrigatorios.reduce((acc, campo) => {
  acc[campo] = false;
  return acc;
}, {});

const normalizarCpf = (valor) => String(valor || '').replace(/\D/g, '');

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
    return {invalido: false, mensagem: ''};
  }

  if (campo === 'especialidade') {
    if (estaCampoVazio('especialidade')) return {invalido: true, mensagem: 'Especialidade é obrigatória'};
    return {invalido: false, mensagem: ''};
  }

  if (estaCampoVazio(campo)) {
    return {invalido: true, mensagem: extrairMensagemPorCampo(campo)};
  }

  return {invalido: false, mensagem: ''};
};

const todosCamposValidos = computed(() => camposObrigatorios.every((campo) => !validarCampo(campo).invalido));

const marcarCampoTocado = (campo) => {
  camposTocados.value[campo] = true;
};

const obterValidacaoCampo = (campo) => {
  if (props.camposComErro.includes(campo)) {
    return {
      invalido: true,
      mensagem: extrairMensagemPorCampo(campo)
    };
  }

  if (!editando.value) {
    return {invalido: false, mensagem: ''};
  }

  if (camposObrigatorios.includes(campo) && camposTocados.value[campo]) {
    return validarCampo(campo);
  }

  return {invalido: false, mensagem: ''};
};

const clonarFuncionario = (funcionario) => ({
  cpf: funcionario?.cpf || '',
  nome: funcionario?.nome || '',
  idade: funcionario?.idade ?? '',
  email: funcionario?.email || '',
  especialidade: obterCodigoEspecialidade(
      typeof funcionario?.especialidade === 'string'
          ? funcionario.especialidade
          : funcionario?.especialidade?.descricao
          || funcionario?.especialidade?.label
          || funcionario?.especialidade?.nome
          || funcionario?.especialidade?.codigo
          || funcionario?.especialidade?.value
          || funcionario?.especialidade?.id
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

const normalizarUf = () => {
  formulario.value.endereco.uf = String(formulario.value.endereco.uf || '').replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 2);
};

const normalizarPayload = () => ({
  ...formulario.value,
  cpf: normalizarCpf(formulario.value.cpf),
  idade: formulario.value.idade === '' || formulario.value.idade === null ? null : Number(formulario.value.idade),
  especialidade: obterCodigoEspecialidade(formulario.value.especialidade),
  conta: {
    ...formulario.value.conta,
    salario: formulario.value.conta.salario === '' || formulario.value.conta.salario === null
        ? null
        : Number(formulario.value.conta.salario)
  },
  endereco: {
    ...formulario.value.endereco,
    uf: String(formulario.value.endereco.uf || '').replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 2)
  }
});

const ativarEdicao = () => {
  editando.value = true;
  camposTocados.value = estadoCamposTocadosInicial();
};

const salvarAlteracoes = () => {
  emit('salvar', normalizarPayload());
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
      camposTocados.value = estadoCamposTocadosInicial();
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
