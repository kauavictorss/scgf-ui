<template>
  <div class="cabecalho-menu">
    <Menubar :model="items">
      <template #start>
        <div class="marca-sistema" aria-label="SCGF">
          <img src="/logo.png" alt="Logo do SCGF" class="marca-logo"/>
          <span class="marca-texto">SCGF</span>
        </div>
      </template>
      <template #end>
        <div class="acoes-menu">
          <ThemeToggle/>
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
  </div>
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
    items: [
      {
        label: 'Cadastrar Funcionário',
        command: () => router.push('/cadastrar-funcionario')
      }
    ]
  },
  {
    label: 'Consultas',
    icon: 'pi pi-search',
    items: [
      {
        label: 'Funcionários Ativos',
        icon: 'pi pi-check',
        command: () => router.push('/consultar-funcionarios-ativos')
      },
      {
        label: 'Funcionários Inativos',
        icon: 'pi pi-times',
        command: () => router.push('/consultar-funcionarios-inativos')
      }
    ]
  },
  {
    label: 'Especialidades',
    icon: 'pi pi-briefcase',
    items: [
      {
        label: 'Especialidades',
        command: () => router.push('/especialidades')
      }
    ]
  },
  {
    label: 'Sobre',
    icon: 'pi pi-info-circle',
    items: [
      {
        label: 'Sobre o sistema',
        command: () => router.push('/sobre')
      }
    ]
  },
]);
</script>

<style scoped>
.cabecalho-menu {
  display: flex;
  flex-direction: column;
}

.marca-sistema {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding-right: 1rem;
  margin-right: 1.25rem;
  border-right: 1px solid var(--app-border);
  user-select: none;
}

.marca-logo {
  width: 2rem;
  height: 2rem;
  object-fit: contain;
  flex: 0 0 auto;
}

.marca-texto {
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--app-text);
}

:deep(.p-menubar) {
  margin: 0;
  border: 1px solid var(--app-border);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

:deep(.p-menubar .p-menubar-root-list) {
  transform: translateX(-0.35rem);
}

.acoes-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
