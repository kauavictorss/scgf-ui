<template>
  <div class="sobre-page">
    <section class="hero">
      <p class="eyebrow">Sistema SCGF</p>
      <h1>Sistema de Consultas e Gerenciamento de Funcionários</h1>
      <p class="subtitulo">
        O SCGF centraliza cadastro, consulta e manutenção de funcionários em uma experiência
        visual organizada, pensada para uso profissional no dia a dia.
      </p>
    </section>

    <section class="grade">
      <article class="card destaque">
        <i class="pi pi-users"></i>
        <h2>Cadastro e manutenção</h2>
        <p>
          Fluxos guiados para cadastrar, consultar, editar e inativar funcionários com menos
          retrabalho e menos risco de inconsistência.
        </p>
      </article>

      <article class="card">
        <i class="pi pi-search"></i>
        <h2>Consulta objetiva</h2>
        <p>
          Listagens e buscas organizadas para localizar registros rapidamente e trabalhar com
          dados de forma mais prática.
        </p>
      </article>

      <article class="card">
        <i class="pi pi-shield"></i>
        <h2>Validação e confiança</h2>
        <p>
          Campos com validação visual, mensagens claras e regras consistentes para manter
          os dados organizados.
        </p>
      </article>

      <article class="card">
        <i class="pi pi-palette"></i>
        <h2>Experiência visual</h2>
        <p>
          Interface responsiva com suporte a tema claro e escuro, componentes consistentes
          em todas as telas e navegação fluida entre as funcionalidades.
        </p>
      </article>
    </section>

    <section class="apresentacao">
      <div class="texto">
        <h2>O que este sistema entrega</h2>
        <p>
          Uma base completa para administrar funcionários com separação clara entre cadastro,
          consulta e atualização de informações, priorizando usabilidade e leitura.
        </p>
      </div>

      <ul class="lista-destaques">
        <li>Cadastro com campos organizados por contexto</li>
        <li>Consulta de ativos e inativos com navegação simples</li>
        <li>Mensagens amigáveis para orientar o usuário</li>
        <li>Estrutura pronta para expansão futura</li>
      </ul>
    </section>

    <section class="contatos">
      <h2>Contatos</h2>
      <p class="descricao-contato">
        Canais profissionais para falar comigo:
      </p>

      <div class="contatos-grid">
        <a class="contato-item" href="https://github.com/kauavictorss" target="_blank" rel="noopener noreferrer">
          <div class="contato-cabecalho">
            <i class="pi pi-github"></i>
            <span>GitHub</span>
          </div>
          <strong>kauavictorss</strong>
        </a>
        <a class="contato-item" href="https://www.linkedin.com/in/kaua-victor-santos/" target="_blank"
           rel="noopener noreferrer">
          <div class="contato-cabecalho">
            <i class="pi pi-linkedin"></i>
            <span>LinkedIn</span>
          </div>
          <strong>Kaua V. Silva dos Santos</strong>
        </a>
        <a class="contato-item" href="mailto:kaua15321@gmail.com">
          <div class="contato-cabecalho">
            <i class="pi pi-envelope"></i>
            <span>E-mail</span>
          </div>
          <strong>kaua15321@gmail.com</strong>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
.sobre-page {
  display: grid;
  gap: 1.25rem;
  margin-top: 2rem;
  padding-bottom: 1rem;
}

.hero,
.apresentacao,
.contatos {
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 0.9rem;
  padding: 1.25rem;
}

.eyebrow {
  margin: 0 0 0.35rem;
  color: var(--app-primary, #2563eb);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.8rem;
}

.hero h1 {
  margin: 0;
  font-size: clamp(1.7rem, 3vw, 2.6rem);
  line-height: 1.1;
}

.subtitulo {
  margin: 0.85rem 0 0;
  max-width: 70ch;
  color: var(--app-muted);
}

.grade {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.card {
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 0.9rem;
  padding: 1.1rem;
}

.card i {
  font-size: 1.35rem;
  color: var(--app-primary, #2563eb);
}

.card h2,
.apresentacao h2,
.contatos h2 {
  margin: 0.7rem 0 0.55rem;
  font-size: 1.05rem;
}

.card p,
.apresentacao p,
.descricao-contato {
  margin: 0;
  color: var(--app-muted);
}

.destaque {
  border-color: color-mix(in srgb, var(--app-primary, #2563eb) 26%, var(--app-border));
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
}

.apresentacao {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1rem;
  align-items: start;
}

.lista-destaques {
  margin: 0;
  padding-left: 1.15rem;
  color: var(--app-text);
}

.lista-destaques li + li {
  margin-top: 0.6rem;
}

.contatos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.contato-item {
  border: 1px dashed var(--app-border);
  border-radius: 0.8rem;
  padding: 0.9rem;
  display: grid;
  gap: 0.5rem;
  color: inherit;
}

.contato-cabecalho {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.contato-item i {
  font-size: 1.1rem;
  color: var(--app-primary, #2563eb);
}

.contato-item span {
  color: var(--app-muted);
  font-size: 0.9rem;
}

.contato-item strong {
  word-break: break-word;
}

@media (max-width: 768px) {
  .apresentacao {
    grid-template-columns: 1fr;
  }
}
</style>
