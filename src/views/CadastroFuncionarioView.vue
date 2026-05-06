<template>
  <div class="cabecalho">
    <h1>Cadastro de Funcionário</h1>
  </div>

  <div class="acoes">
    <Button label="Cadastrar dados" @click="abrirCadastro"/>
    <Button label="Pesquisar funcionário" outlined @click="abrirConsulta"/>
  </div>

  <div v-if="modoTela === 'cadastro'" class="bloco-cadastro">
    <h2>Detalhes do cadastro</h2>

    <BlocoFormCadastro
        ref="blocoCadastroRef"
        :loading="carregando"
        :especialidades-options="especialidades"
        :campos-com-erro="camposComErro"
        :focus-field="camposComErro[0] || null"
        @confirmar="confirmarCadastro"
        @cancelar="cancelarCadastro"
    />
  </div>

  <BlocoFormConsulta
      v-model:mostrar-modal-pesquisa="mostrarModalConsulta"
      :loading="carregandoConsulta"
      :funcionario="funcionarioConsulta"
      :especialidades-options="especialidades"
      :campos-com-erro="camposComErroConsulta"
      :funcionarios-pesquisa="funcionariosAtivosConsulta"
      :carregando-pesquisa="carregandoConsultaLista"
      :mensagem-pesquisa="mensagemConsultaErro"
      @salvar="salvarFuncionarioConsulta"
      @excluir="excluirFuncionarioConsulta"
      @cancelar="cancelarConsulta"
      @selecionar-pesquisa="selecionarFuncionarioConsulta"
  />
</template>

<script setup>
import {ref, inject} from 'vue';
import Button from 'primevue/button';
import ApiService from '@/service/ApiService.js';
import {extrairMensagemAmigavel, extrairMensagemPorCampo} from '@/utils/msgErros.js';
import BlocoFormCadastro from '@/components/cadastro/BlocoFormCadastro.vue';
import BlocoFormConsulta from '@/components/cadastro/BlocoFormConsulta.vue';

const modoTela = ref('');
const carregando = ref(false);
const camposComErro = ref([]);
const camposComErroConsulta = ref([]);
const blocoCadastroRef = ref(null);
const especialidades = ref([]);
const funcionarioConsulta = ref(null);
const mostrarModalConsulta = ref(false);
const mensagemConsultaErro = ref('');
const carregandoConsultaLista = ref(false);
const carregandoConsulta = ref(false);
const funcionariosAtivosConsulta = ref([]);
const toast = inject('toast');

const normalizarCpf = (cpf) => String(cpf || '').replace(/\D/g, '');

const limparMensagens = () => {
  camposComErro.value = [];
};

const limparMensagensConsulta = () => {
  camposComErroConsulta.value = [];
};

const extrairErros = (errorApi) => {
  const data = errorApi?.response?.data;
  if (!data) {
    return {
      mensagens: [],
      campos: []
    };
  }

  const campos = [];
  const mensagens = [];

  // Se é erro genérico (string)
  if (typeof data === 'string') {
    mensagens.push(data);
    return {mensagens, campos};
  }

  // Extrai campos com erro
  const adicionarCampo = (valor) => {
    if (typeof valor === 'string' && valor.trim()) {
      campos.push(valor.trim());
    }
  };

  if (Array.isArray(data.errors)) {
    data.errors.forEach((item) => {
      const nomeCampo = item?.field || item?.campo || item?.property || item?.path;
      if (nomeCampo) {
        adicionarCampo(nomeCampo);
        // Gera mensagem amigável para este campo
        const mensagemAmigavel = extrairMensagemPorCampo(nomeCampo);
        if (!mensagens.includes(mensagemAmigavel)) {
          mensagens.push(mensagemAmigavel);
        }
      }
    });
  }

  const camposSemDuplicados = [...new Set(campos)];

  return {
    mensagens,
    campos: camposSemDuplicados
  };
};

const confirmarCadastro = async (payload) => {
  limparMensagens();
  carregando.value = true;

  try {
    await ApiService.cadastrarFuncionario(payload);
    toast.mostrar('Funcionário cadastrado com sucesso!', 'sucesso');
    blocoCadastroRef.value?.resetForm();
    setTimeout(() => {
      modoTela.value = '';
    }, 1000);
  } catch (errorApi) {
    const erroExtraido = extrairErros(errorApi);
    camposComErro.value = erroExtraido.campos;

    // Prioriza mensagens de campo extraídas
    let mensagemExibir = '';
    if (erroExtraido.mensagens && erroExtraido.mensagens.length > 0) {
      // Se houver múltiplas mensagens de campo, mostra a primeira + aviso
      mensagemExibir = erroExtraido.mensagens[0];
      if (erroExtraido.mensagens.length > 1) {
        mensagemExibir += ` (e mais ${erroExtraido.mensagens.length - 1} campo(s) com erro)`;
      }
    } else {
      // Fallback: tenta extrair mensagem geral
      mensagemExibir = extrairMensagemAmigavel(errorApi);
    }

    // Detecta tipo de erro
    const tipo = mensagemExibir.toLowerCase().includes('já está registrado') ? 'aviso' : 'erro';
    toast.mostrar(mensagemExibir, tipo);

    console.error('Erro ao cadastrar funcionário:', errorApi);
  } finally {
    carregando.value = false;
  }
};

const cancelarCadastro = () => {
  limparMensagens();
  modoTela.value = '';
};

const limparConsulta = () => {
  camposComErroConsulta.value = [];
  funcionarioConsulta.value = null;
  mensagemConsultaErro.value = '';
};

const carregarFuncionariosConsulta = async () => {
  carregandoConsultaLista.value = true;

  try {
    const primeiraResposta = await ApiService.listarFuncionariosAtivos({page: 0, size: 100});
    const dadosIniciais = primeiraResposta.data?.content || primeiraResposta.data || [];

    if (Array.isArray(primeiraResposta.data?.content)) {
      const totalRegistros = primeiraResposta.data?.totalElements ?? dadosIniciais.length;
      const tamanhoPagina = primeiraResposta.data?.size || primeiraResposta.data?.pageable?.pageSize || 100;
      const totalPaginas = primeiraResposta.data?.totalPages ?? Math.ceil(totalRegistros / tamanhoPagina);
      const funcionarios = [...dadosIniciais];

      for (let pagina = 1; pagina < totalPaginas; pagina += 1) {
        const respostaPagina = await ApiService.listarFuncionariosAtivos({page: pagina, size: tamanhoPagina});
        const dadosPagina = respostaPagina.data?.content || [];
        if (Array.isArray(dadosPagina)) {
          funcionarios.push(...dadosPagina);
        }
      }

      funcionariosAtivosConsulta.value = funcionarios;
      return;
    }

    funcionariosAtivosConsulta.value = Array.isArray(dadosIniciais) ? dadosIniciais : [];
  } catch (errorApi) {
    funcionariosAtivosConsulta.value = [];
    toast.mostrar('Não foi possível carregar os funcionários ativos.', 'erro');
    console.error('Erro ao listar funcionários ativos:', errorApi);
  } finally {
    carregandoConsultaLista.value = false;
  }
};

const selecionarFuncionarioConsulta = async (event) => {
  const cpf = normalizarCpf(event?.data?.cpf);
  if (!cpf) {
    return;
  }

  carregandoConsulta.value = true;
  limparMensagensConsulta();
  mensagemConsultaErro.value = '';

  try {
    const response = await ApiService.listarDetalhesFuncionario(cpf);
    const detalhes = Array.isArray(response.data) ? response.data[0] : response.data;
    if (!detalhes) {
      mensagemConsultaErro.value = 'Funcionário não encontrado';
      return;
    }
    funcionarioConsulta.value = detalhes;
    mostrarModalConsulta.value = false;
  } catch (errorApi) {
    funcionarioConsulta.value = null;
    mensagemConsultaErro.value = 'Funcionário não encontrado';
    console.error('Erro ao carregar detalhes do funcionário:', errorApi);
  } finally {
    carregandoConsulta.value = false;
  }
};

const salvarFuncionarioConsulta = async (payload) => {
  limparMensagensConsulta();
  carregandoConsulta.value = true;

  const cpfFuncionario = normalizarCpf(payload?.cpf || funcionarioConsulta.value?.cpf);

  try {
    await ApiService.atualizarFuncionario(payload);
    toast.mostrar('Funcionário atualizado com sucesso!', 'sucesso');
    await carregarFuncionariosConsulta();
    const response = await ApiService.listarDetalhesFuncionario(cpfFuncionario);
    funcionarioConsulta.value = Array.isArray(response.data) ? response.data[0] : response.data;
  } catch (errorApi) {
    const erroExtraido = extrairErros(errorApi);
    camposComErroConsulta.value = erroExtraido.campos;

    let mensagemExibir = '';
    if (erroExtraido.mensagens && erroExtraido.mensagens.length > 0) {
      mensagemExibir = erroExtraido.mensagens[0];
      if (erroExtraido.mensagens.length > 1) {
        mensagemExibir += ` (e mais ${erroExtraido.mensagens.length - 1} campo(s) com erro)`;
      }
    } else {
      mensagemExibir = extrairMensagemAmigavel(errorApi);
    }

    const tipo = mensagemExibir.toLowerCase().includes('já está registrado') ? 'aviso' : 'erro';
    toast.mostrar(mensagemExibir, tipo);
    console.error('Erro ao atualizar funcionário:', errorApi);
  } finally {
    carregandoConsulta.value = false;
  }
};

const excluirFuncionarioConsulta = async (cpf) => {
  const cpfNormalizado = normalizarCpf(cpf);
  if (!cpfNormalizado) {
    toast.mostrar('Funcionário inválido para exclusão.', 'erro');
    return;
  }

  if (!window.confirm('Tem certeza que deseja inativar este funcionário?')) {
    return;
  }

  carregandoConsulta.value = true;
  limparMensagensConsulta();

  try {
    await ApiService.removerFuncionario(cpfNormalizado);
    toast.mostrar('Funcionário inativado com sucesso!', 'sucesso');
    await carregarFuncionariosConsulta();
    limparConsulta();
  } catch (errorApi) {
    const mensagem = extrairMensagemAmigavel(errorApi);
    toast.mostrar(mensagem, 'erro');
    console.error('Erro ao inativar funcionário:', errorApi);
  } finally {
    carregandoConsulta.value = false;
  }
};

const cancelarConsulta = () => {
  limparConsulta();
  mostrarModalConsulta.value = false;
};

const carregarEspecialidades = async () => {
  try {
    const response = await ApiService.listarEspecialidades();
    const dados = response.data?.content || response.data || [];
    especialidades.value = Array.isArray(dados) ? dados.map((item) => ({
      label: item.descricao || item.nome,
      value: item.codigo || item.id
    })) : [];
  } catch (error) {
    console.error('Erro ao carregar especialidades:', error);
    especialidades.value = [];
  }
};

const abrirCadastro = async () => {
  cancelarConsulta();
  await carregarEspecialidades();
  modoTela.value = 'cadastro';
};

const abrirConsulta = async () => {
  modoTela.value = '';
  mensagemConsultaErro.value = '';
  await carregarFuncionariosConsulta();
  await carregarEspecialidades();
  mostrarModalConsulta.value = true;
};
</script>

<style scoped>
.cabecalho {
  margin-top: 1.9rem;
  margin-bottom: 0.75rem;
}

.cabecalho h1 {
  margin: 0;
}

.acoes {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.filtros-consulta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.consulta-detalhe {
  margin-top: 1rem;
}

.bloco-cadastro {
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.bloco-cadastro h2 {
  margin: 0 0 1rem;
}

.erro {
  color: var(--app-danger);
  margin-bottom: 0.75rem;
}

.erro p {
  margin: 0 0 0.35rem;
  font-weight: 600;
}

.erro ul {
  margin: 0;
  padding-left: 1.2rem;
}

.sucesso {
  color: #15803d;
  margin-bottom: 0.75rem;
}

.info {
  margin-top: 1rem;
  color: var(--app-muted);
}
</style>
