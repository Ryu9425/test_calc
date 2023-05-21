import './bootstrap';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import Primevue from "primevue/config";
import InputNumber from 'primevue/inputnumber';
import Checkbox from 'primevue/checkbox';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';     
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import Card from 'primevue/card';
import "primevue/resources/themes/lara-light-teal/theme.css";    
import "primevue/resources/primevue.min.css";
const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}.vue`),
    setup({ el, app, props, plugin }) {
        return createApp({ render: () => h(app, props) })
            .use(plugin)
            .use(Primevue, InputNumber, Checkbox,DataTable,Column,Row,Dropdown,Dialog, Card)
            .component("InputNumber", InputNumber)
            .component("Checkbox", Checkbox)
            .component("DataTable", DataTable)
            .component("Column", Column)
            .component("Row", Row)
            .component("Dropdown", Dropdown)
            .component("Dialog", Dialog)
            .component("Card", Card)
            .mixin({ methods: { route } })
            .mount(el);
    },
});

InertiaProgress.init({ color: '#4B5563' });
