import { createRouter, createWebHistory } from 'vue-router';
import ConsFuncAtivosView from '@/views/ConsFuncAtivosView.vue';
import ConsFuncInativosView from '@/views/ConsFuncInativosView.vue';
import CadastrarFuncView from "@/views/CadastrarFuncView.vue";
import HomeView from "@/views/HomeView.vue";
import ConsEspecialidadesView from "@/views/ConsEspecialidadesView.vue";

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
    path: '/especialidades',
    name: 'Especialidades',
    component: ConsEspecialidadesView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
