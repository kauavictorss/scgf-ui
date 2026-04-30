import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // URL base do seu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

const ApiService = {
    cadastrarFuncionario(dados) {
        return api.post('/funcionarios', dados);
    },
    listarDetalhesFuncionario(cpf) {
        return api.get(`/funcionarios/listar/detalhes/${cpf}`);
    },
    listarFuncionariosAtivos() {
        return api.get('/funcionarios/listar/ativos');
    },
    listarFuncionariosInativos() {
        return api.get('/funcionarios/listar/inativos');
    },
    buscarFuncionarioPorCpf(cpf) {
        return api.get(`/funcionarios/cpf/${cpf}`);
    },
    buscarDadosContaFuncionario(cpf) {
        return api.get(`/funcionarios/dados-conta/${cpf}`);
    },
    listarEspecialidades() {
        return api.get('/funcionarios/listar/especialidades');
    },
    listarFuncionariosPorEspecialidade(especialidade) {
        return api.get(`/funcionarios/listar/especialidade/${especialidade}`);
    },
    listarFuncionariosPorTipoDeConta(tpConta) {
        return api.get(`/funcionarios/listar/tipo-conta/${tpConta}`);
    },
    atualizarFuncionario(cpf, dados) {
        return api.put(`/funcionarios/${cpf}`, dados);
    },
    removerFuncionario(cpf) {
        return api.delete(`/funcionarios/${cpf}`);
    }
};

export default ApiService;
