<template>
  <h1 class="titulo">Sistema de Consultas e Gerenciamento de Funcionários</h1>
  <Menubar :model="items">
    <template #end>
      <div class="acoes-menu">
        <ThemeToggle />
        <Button
          icon="pi pi-sign-out"
          label="Sair"
          text
          severity="secondary"
          @click="logout"
        />
      </div>
    </template>
  </Menubar>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from 'vue-router';
import Button from 'primevue/button';
import ThemeToggle from '@/components/layout/ThemeToggle.vue';

const router = useRouter();

const logout = () => {
  router.push('/home');
};

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => router.push('/home')
  },
  {
    label: 'Cadastro',
    icon: 'pi pi-plus',
    command: () => router.push('/cadastrar-funcionario')
  },
  {
    label: 'Consultas',
    icon: 'pi pi-search',
    items: [
      {
        label: 'Ativos',
        icon: 'pi pi-check',
        command: () => router.push('/consultar-funcionarios-ativos')
      },
      {
        label: 'Inativos',
        icon: 'pi pi-times',
        command: () => router.push('/consultar-funcionarios-inativos')
      }
    ]
  },
  {
    label: 'Especialidades',
    icon: 'pi pi-briefcase',
    command: () => router.push('/especialidades')
  },
  {
    label: 'Contato',
    icon: 'pi pi-envelope'
  },
]);
</script>

<style scoped>
.titulo {
  margin: 0 0 0.85rem;
}

:deep(.p-menubar) {
  margin-top: 0.35rem;
  margin-bottom: 1.35rem;
}

.acoes-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
