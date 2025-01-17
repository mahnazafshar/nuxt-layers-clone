import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/, // .md
            ],
            dirs: [
                "./components",
                "./utils",
                "./composables",
                "../global-composables/composables",
                "../global-composables/utils",
            ],
            imports: ["vue", "vue-router"],
        }),
    ],
    test: {
        globals: true,
        environment: "jsdom",
    },
});
