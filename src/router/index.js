import { createRouter, createWebHistory } from 'vue-router';
import ConsFuncAtivosView from '@/views/ConsFuncAtivosView.vue';
import ConsFuncInativosView from '@/views/ConsFuncInativosView.vue';
import CadastroFuncionarioView from "@/views/CadastroFuncionarioView.vue";
import HomeView from "@/views/HomeView.vue";
import ConsEspecialidadesView from "@/views/ConsEspecialidadesView.vue";
import SobreView from "@/views/SobreView.vue";

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: { title: 'SCGF – Home' }
  },
  {
    path: '/cadastrar-funcionario',
    name: 'CadastrarFuncionario',
    component: CadastroFuncionarioView,
    meta: { title: 'SCGF – Cadastrar Funcionário' }
  },
  {
    path: '/consultar-funcionarios-ativos',
    name: 'FuncionariosAtivos',
    component: ConsFuncAtivosView,
    meta: { title: 'SCGF – Funcionários Ativos' }
  },
  {
    path: '/consultar-funcionarios-inativos',
    name: 'FuncionariosInativos',
    component: ConsFuncInativosView,
    meta: { title: 'SCGF – Funcionários Inativos' }
  },
  {
    path: '/especialidades',
    name: 'Especialidades',
    component: ConsEspecialidadesView,
    meta: { title: 'SCGF – Especialidades' }
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: SobreView,
    meta: { title: 'SCGF – Sobre' }
  }
];

const router = createRouter({
  history: createWebHistory(), routes
});

router.afterEach((to) => {
  document.title = to.meta?.title ?? 'SCGF';
});

export default router;
