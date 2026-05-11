# 💻 SCGF UI - Interface Web

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![PrimeVue](https://img.shields.io/badge/PrimeVue-4.x-49b048?style=for-the-badge&logo=primevue&logoColor=white)

---

O **SCGF (Sistema de Consultas e Gerenciamento de Funcionários)** é a interface web moderna e intuitiva do ecossistema SCGF. Desenvolvido para proporcionar uma gestão eficiente de recursos humanos, este projeto permite o controle completo do ciclo de vida dos colaboradores, integrando-se nativamente com a **[SCGF-API](https://github.com/kauavictorss/scgf-api)**.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend (UI Experience)**
* **Framework:** Vue 3 (Composition API)
* **Build Tool:** Vite
* **UI Components:** PrimeVue 4 & PrimeVue Forms
* **Design System:** Aura Theme
* **Icons:** PrimeIcons
* **HTTP Client:** Axios
* **Routing:** Vue Router

---

## ✨ Funcionalidades

### **✅ Já Implementado**
* **📦 Gestão de Funcionários:** CRUD completo com fluxos guiados em abas.
* **🔍 Consultas Avançadas:** Listagens paginadas de ativos e inativos com filtros dinâmicos.
* **🔐 Autenticação:** Sistema de login com interface modal, redirecionamento de rotas e validação avançada via **PrimeVue Forms**.
* **🏷️ Especialidades:** Consulta e filtragem por áreas de atuação.
* **🌓 Dark Mode:** Suporte a temas claro e escuro com persistência local.
* **📱 Responsividade:** Interface adaptada para diferentes dispositivos.
* **🔔 Notificações:** Sistema de Toast para feedback em tempo real.

### **🚀 Roadmap (Em breve)**
* **📊 Dashboards:** Gráficos de distribuição por especialidade e faixa salarial.
* **📄 Relatórios:** Exportação de dados em PDF e Excel.

---

## 📐 Arquitetura do Projeto

O projeto segue uma estrutura modular focada em componentes reutilizáveis e separação de responsabilidades:

```text
src/
├── components/          # Componentes reutilizáveis por contexto
│   ├── cadastro/        # Formulários e modais de gestão
│   ├── consultas/       # Tabelas e filtros de busca
│   └── layout/          # Menu, Tema e Notificações
├── views/               # Páginas principais da aplicação
├── service/             # Camada de comunicação com a API (Axios)
├── utils/               # Utilitários e tratamento de erros
└── assets/              # Estilos globais e recursos estáticos
```

---

## 🚀 Como Executar o Frontend

### **Pré-requisitos**
* Node.js (v18 ou superior)
* npm ou yarn

### **Passo a Passo**

1. **Clone e configure o Backend (Obrigatório):**
   Para que o sistema funcione, é necessário que a API esteja em execução.
   ```bash
   git clone https://github.com/kauavictorss/scgf-api.git
   # Siga as instruções de setup no README do repositório scgf-api
   ```

2. **Clone este repositório (Frontend):**
   ```bash
   git clone https://github.com/kauavictorss/scgf-ui.git
   cd scgf-ui
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Configuração da API:**
   Certifique-se de que o backend está rodando em `http://localhost:8080`. Se necessário, ajuste o `baseURL` em:
   `src/service/ApiService.js`

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

6. **Acesse no navegador:**
   `http://localhost:3000`

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

## 👨‍💻 Autor

<div align="center">
  <img src="https://github.com/kauavictorss.png" width="150px" style="border-radius: 50%;" alt="Kauã Victor"/>
  <br>
  <h1>Kauã Victor Silva dos Santos</h1>

[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kauavictorss)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kaua-victor-santos/)
</div>

