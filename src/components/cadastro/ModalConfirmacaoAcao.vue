<template>
  <Dialog
      v-model:visible="visivelLocal"
      modal
      :position="'center'"
      :closable="false"
      :draggable="false"
      :style="{ width: '32rem', maxWidth: '92vw' }"
      :header="title"
  >
    <p class="mensagem-modal">{{ message }}</p>

    <template #footer>
      <div class="modal-acoes">
        <Button
            :label="confirmLabel"
            :severity="confirmSeverity || undefined"
            :loading="loading"
            @click="emit('confirm')"
        />
        <Button
            label="Cancelar"
            severity="secondary"
            outlined
            :disabled="loading"
            @click="emit('cancel')"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import {computed} from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: 'Confirmar ação'
  },
  confirmLabel: {
    type: String,
    default: 'Confirmar'
  },
  confirmSeverity: {
    type: String,
    default: 'success'
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:visible', 'confirm', 'cancel']);

const visivelLocal = computed({
  get: () => props.visible,
  set: (valor) => emit('update:visible', valor)
});
</script>

<style scoped>
.mensagem-modal {
  margin: 0;
  line-height: 1.5;
}

.modal-acoes {
  display: flex;
  gap: 0.75rem;
  padding-top: 1.5rem;
}

:deep(.p-dialog-footer) {
  padding-top: 0 !important;
}
</style>
