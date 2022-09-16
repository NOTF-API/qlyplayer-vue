import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "normalize.css/normalize.css";
import "@/assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCompress,
  faEllipsisV,
  faExpand,
  faHeart,
  faList,
  faListOl,
  faPause,
  faPlay,
  faRandom,
  faRecycle,
  faSpinner,
  faDownload,
  faStepBackward,
  faStepForward,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";

import {
  faHeart as faHeartRegular,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";

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
library.add(faHeart);
library.add(faHeartRegular);
library.add(faDownload);
library.add(faCommentDots);
library.add(faEllipsisV);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(createPinia());

app.use(router);

app.mount("#app");
