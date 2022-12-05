import { VueConstructor } from "vue";
import Vant from "vant";
import Waves from "vue-waves-effect";

import "vant/lib/index.css";
import "vue-waves-effect/dist/vueWavesEffect.css";

export default (Vue: VueConstructor) => {
  Vue.use(Vant);
  Vue.use(Waves);
};
