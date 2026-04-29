import { createRouter, createWebHistory } from 'vue-router';
import ConsFuncAtivosView from '@/views/ConsFuncAtivosView.vue';
import ConsFuncInativosView from '@/views/ConsFuncInativosView.vue';
import ConsFuncCpfView from '@/views/ConsFuncCpfView.vue';
import CadastrarFuncView from "@/views/CadastrarFuncView.vue";
import HomeView from "@/views/HomeView.vue";
import ConsTipoContaView from "@/views/ConsTipoContaView.vue";
import ConsDadosContaView from "@/views/ConsDadosContaView.vue";
import ConsProfissoesView from "@/views/ConsProfissoesView.vue";

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/cadastrar-funcionario',
    name: 'CadastrarFuncionario',
    component: CadastrarFuncView
  },
  {
    path: '/consultar-funcionarios-ativos',
    name: 'FuncionariosAtivos',
    component: ConsFuncAtivosView
  },
  {
    path: '/consultar-funcionarios-inativos',
    name: 'FuncionariosInativos',
    component: ConsFuncInativosView
  },
  {
    path: '/consultar-cpf',
    name: 'ConsultarFuncionarioCpf',
    component: ConsFuncCpfView
  },
  {
    path: '/consultar-dados-conta',
    name: 'ConsultarDadosConta',
    component: ConsDadosContaView
  },
  {
    path: '/consultar-tipo-conta',
    name: 'ConsultarTipoConta',
    component: ConsTipoContaView
  },
  {
    path: '/profissoes',
    name: 'Profissoes',
    component: ConsProfissoesView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
