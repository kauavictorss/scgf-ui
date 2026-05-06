import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // URL base do backend
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
    listarFuncionariosAtivos(params = {}) {
        return api.get('/funcionarios/listar/ativos', {params});
    },
    listarFuncionariosInativos(params = {}) {
        return api.get('/funcionarios/listar/inativos', {params});
    },
    listarEspecialidades() {
        return api.get('/funcionarios/listar/especialidades');
    },
    atualizarFuncionario(dados) {
        return api.put('/funcionarios/atualizar', dados);
    },
    removerFuncionario(cpf) {
        return api.delete(`/funcionarios/remover/${cpf}`);
    }
};

export default ApiService;
