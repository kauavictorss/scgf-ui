import { createRouter, createWebHistory } from 'vue-router';
import ConsFuncAtivos from '@/components/dataTables/ConsFuncAtivos.vue';
import ConsFuncInativos from '@/components/dataTables/ConsFuncInativos.vue';
import CadastrarFunc from '@/components/dataTables/CadastrarFunc.vue';

const routes = [
  {
    path: '/funcionarios-ativos',
    name: 'FuncionariosAtivos',
    component: ConsFuncAtivos
  },
  {
    path: '/funcionarios-inativos',
    name: 'FuncionariosInativos',
    component: ConsFuncInativos
  },
  {
    path: '/cadastrar-funcionario',
    name: 'CadastrarFuncionario',
    component: CadastrarFunc
  },
  {
    path: '/consultar-cpf',
    name: 'ConsultarFuncionarioCpf',
    component: CadastrarFunc
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
