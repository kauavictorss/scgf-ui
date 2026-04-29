import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';
import './assets/main.css';
import App from "@/App.vue";
import router from './router';

import Menubar from 'primevue/menubar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const savedTheme = localStorage.getItem('theme');
const initialTheme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light';
document.documentElement.setAttribute('data-theme', initialTheme);

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '[data-theme="dark"]'
        }
    }
});
app.component('Menubar', Menubar);
app.component(DataTable.name, DataTable);
app.component(Column.name, Column);
app.use(router);
app.mount('#app');
