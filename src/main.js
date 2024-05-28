import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMapMarkerAlt,
  faUser,
  faTrashCan,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import BaseSpinner from "./components/BaseSpinner.vue";
import BaseButton from "./components/BaseButton.vue";
import BaseDialog from "./components/BaseDialog.vue";

library.add(faUser, faMapMarkerAlt, faTrashCan, faX);

const app = createApp(App);

app.use(router);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("base-button", BaseButton);
app.component("base-spinner", BaseSpinner);
app.component("base-dialog", BaseDialog);
app.mount("#app");
