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
    listarFuncionariosAtivos() {
        return api.get('/funcionarios/listar/ativos');
    },
    listarFuncionariosInativos() {
        return api.get('/funcionarios/listar/inativos');
    },
    listarEspecialidades() {
        return api.get('/funcionarios/listar/especialidades');
    },
    atualizarFuncionario(cpf, dados) {
        return api.put(`/funcionarios/${cpf}`, dados);
    },
    removerFuncionario(cpf) {
        return api.delete(`/funcionarios/${cpf}`);
    }
};

export default ApiService;
