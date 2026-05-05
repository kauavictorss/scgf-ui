<template>
  <div class="cabecalho">
    <h1>Cadastro de Funcionário</h1>
  </div>

  <div class="acoes">
    <Button label="Cadastrar dados" @click="abrirCadastro"/>
    <Button label="Consultar funcionário" outlined @click="abrirConsulta"/>
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

  <p v-if="modoTela === 'consulta'" class="info">A ação de consultar funcionário será implementada no próximo passo.</p>
</template>

<script setup>
import {ref, inject} from 'vue';
import Button from 'primevue/button';
import ApiService from '@/service/ApiService.js';
import {extrairMensagemAmigavel, extrairMensagemPorCampo} from '@/utils/msgErros.js';
import BlocoFormCadastro from '@/components/cadastro/BlocoFormCadastro.vue';

const modoTela = ref('');
const carregando = ref(false);
const camposComErro = ref([]);
const blocoCadastroRef = ref(null);
const especialidades = ref([]);
const toast = inject('toast');

const limparMensagens = () => {
  camposComErro.value = [];
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
    return { mensagens, campos };
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

const carregarEspecialidades = async () => {
  try {
    const response = await ApiService.listarEspecialidades();
    especialidades.value = response.data?.map((item) => ({
      label: item.descricao || item.nome,
      value: item.codigo || item.id
    })) || [];
  } catch (error) {
    console.error('Erro ao carregar especialidades:', error);
    especialidades.value = [];
  }
};

const abrirCadastro = async () => {
  await carregarEspecialidades();
  modoTela.value = 'cadastro';
};

const abrirConsulta = () => {
  modoTela.value = 'consulta';
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
  color: #b91c1c;
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
