import type { RouterConfig } from "@nuxt/schema";
import qs from "qs";

export default <RouterConfig>{
  parseQuery(query: any) {
    return qs.parse(query);
  },
  stringifyQuery(query: any) {
    const result = qs.stringify(query);
    // return result ? "?" + result : "";
    return result ? result : "";
  },
};
