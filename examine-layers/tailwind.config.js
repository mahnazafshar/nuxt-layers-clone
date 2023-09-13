/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../base-diasy-ui/components/**/*.{js,vue,ts}",
    "../diasy-forms/components/**/*.{js,vue,ts}",
    "../base/components/**/*.{js,vue,ts}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("tailwindcss-flip")],
  daisyui: {
    rtl: true, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
  },
}

