<template>
  <div class="home-view">
    <h1>Seja Bem-vindo ao SCGF</h1>
    <img
        class="home-view__logo"
        src="/logo.png"
        alt="Logo do SCGF"
        loading="eager"
        decoding="async"
    />
    <div class="home-view__texto">
      <p class="home-view__subtitulo">Sistema de Consultas e Gerenciamento de Funcionários</p>
      <p class="home-view__versao">Versão 1.0.2</p>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.75rem;
  padding-top: 1.75rem;
}

.home-view__logo {
  width: min(275px, 70vw);
  height: auto;
  object-fit: contain;
}

.home-view__texto {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
}

.home-view__subtitulo {
  font-size: 1.25rem;
  color: var(--app-text);
}

.home-view__versao {
  font-size: 0.85rem;
  color: var(--app-muted);
}

:global([data-theme='light']) .home-view__subtitulo {
  color: color-mix(in srgb, var(--app-text) 90%, #000);
}

:global([data-theme='light']) .home-view__versao {
  color: color-mix(in srgb, var(--app-muted) 80%, #000);
}
</style>
