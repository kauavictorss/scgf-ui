<template>
  <Dialog
      v-model:visible="visible"
      modal
      header="Acesso ao Sistema"
      :closable="false"
      :draggable="false"
      :style="{ width: '25rem' }"
      appendTo="body"
  >
    <!-- O componente Form gerencia o estado e a validação automaticamente -->
    <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="login-form">
      <div class="campo">
        <label for="usuario">Usuário</label>
        <InputText name="usuario" type="text" placeholder="Digite seu usuário" autofocus/>
        <Message v-if="$form.usuario?.invalid" severity="error" size="small" variant="simple">
          {{ $form.usuario.error?.message }}
        </Message>
      </div>

      <div class="campo">
        <label for="senha">Senha</label>
        <Password name="senha" placeholder="Digite sua senha" :feedback="false" toggleMask/>
        <Message v-if="$form.senha?.invalid" severity="error" size="small" variant="simple">
          {{ $form.senha.error?.message }}
        </Message>
      </div>

      <div class="acoes-login">
        <Button type="submit" label="Entrar" icon="pi pi-sign-in" :loading="loading"/>
      </div>
    </Form>
  </Dialog>
</template>

<script setup>
import {ref, reactive} from 'vue';
import {useRouter} from 'vue-router';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Message from 'primevue/message';
import {Form} from '@primevue/forms';

const router = useRouter();
const visible = ref(true);
const loading = ref(false);

const initialValues = reactive({
  usuario: '',
  senha: ''
});

// O Resolver define as regras de validação do formulário (padrão PrimeVue)
const resolver = ({values}) => {
  const errors = {};

  if (!values.usuario) {
    errors.usuario = [{message: 'O usuário é obrigatório.'}];
  }

  if (!values.senha) {
    errors.senha = [{message: 'A senha é obrigatória.'}];
  }

  return {
    errors
  };
};

const onFormSubmit = ({valid}) => {
  if (!valid) {
    return;
  }

  loading.value = true;

  // Simulação de delay de rede
  setTimeout(() => {
    loading.value = false;
    router.push('/home');
  }, 800);
};
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-top: 0.5rem;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.acoes-login {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

:deep(.p-password),
:deep(.p-password input),
:deep(.p-inputtext) {
  width: 100%;
}
</style>
