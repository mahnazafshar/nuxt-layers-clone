import DefaultTheme from "vitepress/theme";
// import './assets/css/custom.css'
import MyLayout from "./MyLayout.vue";

export default {
  ...DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: MyLayout,
};
