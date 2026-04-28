<template>
  <Menubar :model="items" />
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => router.push('/home')
  },
  {
    label: 'Cadastrar',
    icon: 'pi pi-plus',
    command: () => router.push('/cadastrar-funcionario')
  },
  {
    label: 'Recursos',
    icon: 'pi pi-cog',
    items: [
      {
        label: 'Atualizar',
        icon: 'pi pi-user-edit',
      },
      {
        label: 'Remover',
        icon: 'pi pi-trash',
      },
      {
        label: 'Consultar',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Ativos',
            icon: 'pi pi-check',
            command: () => router.push('/funcionarios-ativos')
          },
          {
            label: 'Inativos',
            icon: 'pi pi-times',
            command: () => router.push('/funcionarios-inativos')
          },
          {
            label: 'Cpf',
            icon: 'pi pi-id-card',
            command: () => router.push('/consultar-cpf')
          },
          {
            label: 'Dados da Conta',
            icon: 'pi pi-wallet',
            command: () => router.push('/consultar-dados-conta')
          },
          {
            label: 'Tipo de Conta',
            icon: 'pi pi-credit-card',
            command: () => router.push('/consultar-tipo-conta')
          },
          {
            label: 'Especialidade',
            icon: 'pi pi-briefcase',
            to: '/consulta-funcionarios-ativos'
          }
        ]
      }
    ]
  },
  {
    label: 'Contact',
    icon: 'pi pi-envelope'
  }
]);
</script>
