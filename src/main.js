import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";

import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faSun,
  faMoon,
  faHouse,
  faKeyboard,
  faFileArrowDown,
  faTrashCan,
  faRotateRight,
  faRotateLeft,
  faPlus,
  faMinus,
  faDesktop,
  faMobileScreenButton,
  faDice,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faSun,
  faMoon,
  faHouse,
  faKeyboard,
  faFileArrowDown,
  faTrashCan,
  faRotateRight,
  faRotateLeft,
  faPlus,
  faMinus,
  faDesktop,
  faMobileScreenButton,
  faDice,
  faArrowRight
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .directive("visibility", (el, binding) => {
    el.style.visibility = binding.value === true ? "visible" : "hidden";
  })
  .mount("#app");
