// Mapeia mensagens técnicas do backend para mensagens amigáveis
const mensagensAmigaveis = {
  'duplicate cpf': 'Este CPF já está registrado no sistema',
  'duplicate email': 'Este email já está registrado no sistema',
  'invalid cpf': 'CPF inválido',
  'invalid email': 'Email inválido',
  'invalid cep': 'CEP inválido',
  'invalid especialidade': 'Especialidade inválida',
  'especialidade inválida': 'Especialidade é obrigatória',
  'invalid idade': 'Idade deve ser entre 18 e 120 anos',
  'invalid age': 'Idade deve ser entre 18 e 120 anos',
  'cpf already exists': 'Este CPF já está registrado no sistema',
  'email already exists': 'Este email já está registrado no sistema',
  'user already exists': 'Este funcionário já está registrado no sistema',
  'not found': 'Registro não encontrado',
  'unauthorized': 'Você não tem permissão para acessar este recurso',
  'forbidden': 'Acesso negado',
  'conflict': 'Conflito: este registro já existe',
  'unprocessable entity': 'Os dados enviados estão incompletos ou inválidos'
};

// Mapeia nomes de campos técnicos para mensagens amigáveis
const mensagensComPorCampo = {
  'cpf': 'CPF é obrigatório e deve ser válido',
  'nome': 'Nome é obrigatório',
  'idade': 'Idade é obrigatória e deve ser maior que 18 anos',
  'email': 'Email é obrigatório e deve ser válido',
  'especialidade': 'Especialidade é obrigatória',
  'endereco.cep': 'CEP é obrigatório e deve ser válido',
  'endereco.logradouro': 'Logradouro (rua/avenida) é obrigatório',
  'endereco.bairro': 'Bairro é obrigatório',
  'endereco.cidade': 'Cidade é obrigatória',
  'endereco.uf': 'UF (estado) é obrigatório',
  'conta.numConta': 'Número da conta é obrigatório',
  'conta.agencia': 'Agência é obrigatória',
  'conta.tipoConta': 'Tipo de conta é obrigatório',
  'conta.salario': 'Salário é obrigatório e deve ser maior que zero'
};

export const extrairMensagemAmigavel = (erro) => {
  const data = erro?.response?.data;
  
  if (!data) {
    return 'Não foi possível processar sua solicitação';
  }

  // Se é uma string, retorna diretamente
  if (typeof data === 'string') {
    return normalizarMensagem(data);
  }

  // Tenta extrair mensagem dos campos conhecidos
  const mensagem = data.message || data.erro || data.error || data.detail;
  
  if (mensagem) {
    return normalizarMensagem(mensagem);
  }

  // Se tem errors[], tenta extrair a primeira mensagem
  if (Array.isArray(data.errors) && data.errors.length > 0) {
    const primeiroErro = data.errors[0];
    if (typeof primeiroErro === 'string') {
      return normalizarMensagem(primeiroErro);
    }
    if (primeiroErro?.message || primeiroErro?.defaultMessage) {
      return normalizarMensagem(primeiroErro.message || primeiroErro.defaultMessage);
    }
  }

  return 'Não foi possível processar sua solicitação';
};

// Converte nomes de campos técnicos em nomes amigáveis
const normalizarNomeCampo = (nomeCampo) => {
  const mapa = {
    'numconta': 'Número da conta',
    'agencia': 'Agência',
    'tipoconta': 'Tipo de conta',
    'salario': 'Salário',
    'cep': 'CEP',
    'logradouro': 'Logradouro',
    'bairro': 'Bairro',
    'cidade': 'Cidade',
    'uf': 'UF',
    'numero': 'Número',
    'complemento': 'Complemento',
    'cpf': 'CPF',
    'nome': 'Nome',
    'idade': 'Idade',
    'email': 'Email',
    'especialidade': 'Especialidade'
  };

  const lower = nomeCampo.toLowerCase().replace(/[._-]/g, '');
  
  for (const [chave, valor] of Object.entries(mapa)) {
    if (lower.includes(chave)) {
      return valor;
    }
  }
  
  return nomeCampo;
};

// Extrai mensagem amigável baseada no nome do campo
export const extrairMensagemPorCampo = (nomeCampo) => {
  if (!nomeCampo || typeof nomeCampo !== 'string') {
    return 'Campo inválido';
  }

  // Procura correspondência exata ou parcial
  const campoLower = nomeCampo.toLowerCase().trim();
  
  // Procura exata primeiro
  if (mensagensComPorCampo[campoLower]) {
    return mensagensComPorCampo[campoLower];
  }

  // Procura parcial (case-insensitive)
  for (const [campo, mensagem] of Object.entries(mensagensComPorCampo)) {
    if (campoLower.includes(campo) || campo.includes(campoLower)) {
      return mensagem;
    }
  }

  // Fallback: retorna com nome amigável
  const nomAmigavel = normalizarNomeCampo(nomeCampo);
  return `${nomAmigavel} é obrigatório`;
};

// Normaliza a mensagem: procura na tabela de amigáveis, senão retorna como está
const normalizarMensagem = (mensagem) => {
  if (!mensagem || typeof mensagem !== 'string') {
    return 'Não foi possível processar sua solicitação';
  }

  const lower = mensagem.toLowerCase();

  // Procura por chaves conhecidas no dicionário
  for (const [chave, amigavel] of Object.entries(mensagensAmigaveis)) {
    if (lower.includes(chave)) {
      return amigavel;
    }
  }

  // Se não encontrou na tabela, retorna a mensagem original (sem detalhes HTTP)
  // Remove prefixos comuns de erro HTTP e JSON parsing
  return mensagem
    .replace(/^(bad request|error:|erro:|json parse error:)\s*/i, '')
    .replace(/problem:\s*/i, '')
    .replace(/cannot construct instance.*?$/i, 'Dados inválidos')
    .replace(/\s+\[.*\]\s*$/i, '') // Remove partes entre colchetes no final
    .trim() || 'Não foi possível processar sua solicitação';
};

export default {
  extrairMensagemAmigavel
};
