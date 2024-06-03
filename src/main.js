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
  faEdit,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import BaseSpinner from "./components/BaseSpinner.vue";
import BaseButton from "./components/BaseButton.vue";
import BaseDialog from "./components/BaseDialog.vue";
import BaseCard from "./components/BaseCard.vue";
import ProfileCard from "./components/ProfileCard.vue";

library.add(
  faUser,
  faMapMarkerAlt,
  faTrashCan,
  faX,
  faEdit,
  faPhone,
  faEnvelope
);

const app = createApp(App);

app.use(router);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("base-button", BaseButton);
app.component("base-spinner", BaseSpinner);
app.component("base-dialog", BaseDialog);
app.component("base-card", BaseCard);
app.component("profile-card", ProfileCard);
app.mount("#app");
