import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyload from "vue-lazyload";
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
Vue.use(VueLazyload);
import {
  Input,
  Icon,
  Avatar,
  Menu,
  Row,
  Col,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Carousel,
  CarouselItem,
  Progress,
  Table,
  TableColumn,
  Slider,
  Button,
  Descriptions,
  DescriptionsItem,
  Pagination,
  Select,
  Option,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Tabs,
  TabPane,
  Notification
} from "element-ui";
// import 'index.css';
Vue.config.productionTip = false;
Vue.use(Icon);
Vue.use(Input);
Vue.use(Avatar);
Vue.use(Menu);
Vue.use(Row);
Vue.use(Col);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Progress);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Slider);
Vue.use(Button);
Vue.use(Descriptions);
Vue.use(DescriptionsItem);
Vue.use(Pagination)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Notification)

// Notification
Vue.prototype.$notify = Notification;
Vue.prototype.$bus=new Vue()

new Vue({
  router,
  store,
  Notification,
  render: (h) => h(App),
}).$mount("#app");

export default Vue;
