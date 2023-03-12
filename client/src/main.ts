import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "./assets/tailwind.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import Image from "primevue/image";
import ProgressSpinner from "primevue/progressspinner";
import Fieldset from "primevue/fieldset";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Checkbox from "primevue/checkbox";
import Sidebar from "primevue/sidebar";
import DataTable from "primevue/datatable";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import FileUpload from "primevue/fileupload";
import Column from "primevue/column";
import PrimeVue from "primevue/config";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import InputNumber from "primevue/inputnumber";
import Tag from "primevue/tag";

const app = createApp(App);

app.component("Button", Button);
app.component("Toolbar", Toolbar);
app.component("Image", Image);
app.component("ProgressSpinner", ProgressSpinner);
app.component("InputText", InputText);
app.component("Fieldset", Fieldset);
app.component("Password", Password);
app.component("Checkbox", Checkbox);
app.component("Sidebar", Sidebar);
app.component("DataTable", DataTable);
app.component("Dialog", Dialog);
app.component("Toast", Toast);
app.component("FileUpload", FileUpload);
app.component("Column", Column);
app.component("Dropdown", Dropdown);
app.component("Calendar", Calendar);
app.component("InputNumber", InputNumber);
app.component("Tag", Tag);

app.use(ToastService);

app.use(PrimeVue);

app.use(router);

app.mount("#app");
