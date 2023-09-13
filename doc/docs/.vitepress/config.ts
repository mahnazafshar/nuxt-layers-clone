import { defineConfigWithTheme } from "vitepress";
import baseConfig from "@vue/theme/config";
import type { Config as ThemeConfig } from "@vue/theme";
export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  title: "VitePress",
  description: "Just playing around.",
  markdown: {
    config(md) {
      return md.use(require("markdown-it-plantuml"));
    },
  },
  themeConfig: {
    siteTitle: "Core Project Document",
    outlineTitle: "On this page",
    nav: [
      {
        text: "Components",
        items: [
          {
            text: "Base Components",
            link: "/guide/components/base/TCarousel",
          },
          {
            text: "Base DaisyUI Components",
            link: "/guide/components/base-daisy-ui/DAccordion",
          },
          {
            text: "Base Form Components",
            link: "/guide/components/daisy-form/VCheckbox",
          },
        ],
      },
      {
        text: "renderClasses",
        link: "/guide/renderClasses/",
      },
      {
        text: "Installation",
        link: "/guide/installation/",
      },
      {
        text: "Git Repo",
        link: "https://git.abrsa.ir/mobit/frontend/mobit-nuxt3",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "installation",
          link: "/guide/installation/",
        },
        {
          text: "Components",
          collapsed: false,
          items: [
            {
              text: "Base components",
              collapsed: true,
              items: [
                {
                  text: "TCarousel",
                  link: "/guide/components/base/TCarousel",
                },
                {
                  text: "TCollapsible",
                  link: "/guide/components/base/TCollapsible",
                },
                {
                  text: "TPagination",
                  link: "/guide/components/base/TPagination",
                },
                {
                  text: "TRangeInput",
                  link: "/guide/components/base/TRangeInput",
                },
                {
                  text: "TRangeSlider",
                  link: "/guide/components/base/TRangeSlider",
                },
                {
                  text: "TSkeleton",
                  link: "/guide/components/base/TSkeleton",
                },
                {
                  text: "TTable",
                  link: "/guide/components/base/TTable",
                },
                {
                  text: "TTabs",
                  link: "/guide/components/base/TTabs",
                },
                {
                  text: "TToast",
                  link: "/guide/components/base/TToast",
                },
              ],
            },
            {
              text: "daisyUI components",
              collapsed: true,
              items: [
                {
                  text: "DAccordion",
                  link: "/guide/components/base-daisy-ui/DAccordion",
                },
                {
                  text: "DAlert",
                  link: "/guide/components/base-daisy-ui/DAlert",
                },
                {
                  text: "DButton",
                  link: "/guide/components/base-daisy-ui/DButton",
                },
                {
                  text: "DCollapse",
                  link: "/guide/components/base-daisy-ui/DCollapse",
                },
                {
                  text: "DDropdown",
                  link: "/guide/components/base-daisy-ui/DDropdown",
                },
                {
                  text: "DModal",
                  link: "/guide/components/base-daisy-ui/DModal",
                },
                {
                  text: "DRating",
                  link: "/guide/components/base-daisy-ui/DRating",
                },
              ],
            },
            {
              text: "daisy form components",
              collapsed: true,
              items: [
                {
                  text: "VCheckbox",
                  link: "/guide/components/daisy-form/VCheckbox",
                },
                {
                  text: "VForm",
                  link: "/guide/components/daisy-form/VForm",
                },
                {
                  text: "VRadio",
                  link: "/guide/components/daisy-form/VRadio",
                },
                {
                  text: "VSelect",
                  link: "/guide/components/daisy-form/VSelect",
                },
                {
                  text: "VTextInput",
                  link: "/guide/components/daisy-form/VTextInput",
                },
              ],
            },
          ],
        },
        {
          text: "renderClasses",
          link: "/guide/renderClasses/",
        },
        {
          text: "base-api layer",
          link: "/guide/base-api/",
        },
      ],
    },
  },
});
