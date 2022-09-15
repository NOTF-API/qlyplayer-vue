import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "normalize.css/normalize.css";
import "@/assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCompress,
  faExpand,
  faList,
  faListOl,
  faPause,
  faPlay,
  faRandom,
  faRecycle,
  faSpinner,
  faStepBackward,
  faStepForward,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faExpand);
library.add(faCompress);
library.add(faListOl);
library.add(faRandom);
library.add(faRecycle);
library.add(faList);
library.add(faStepForward);
library.add(faStepBackward);
library.add(faPause);
library.add(faPlay);
library.add(faWarning);
library.add(faSpinner);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(createPinia());

app.use(router);

app.mount("#app");
