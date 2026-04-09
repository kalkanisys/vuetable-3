import Vuetable from "./components/Vuetable.vue";
import VuetablePagination from "./components/VuetablePagination.vue";
import VuetablePaginationDropDown from "./components/VuetablePaginationDropdown.vue";
import VuetablePaginationInfo from "./components/VuetablePaginationInfo.vue";
import VuetablePaginationMixin from "./components/VuetablePaginationMixin.vue";
import VuetablePaginationInfoMixin from "./components/VuetablePaginationInfoMixin.vue";
function install(app) {
  app.component("vuetable", Vuetable);
  app.component("vuetable-pagination", VuetablePagination);
  app.component("vuetable-pagination-dropdown", VuetablePaginationDropDown);
  app.component("vuetable-pagination-info", VuetablePaginationInfo);
}
export {
  Vuetable,
  VuetablePagination,
  VuetablePaginationDropDown,
  VuetablePaginationInfo,
  VuetablePaginationMixin,
  VuetablePaginationInfoMixin,
  install,
};

export default Vuetable;
