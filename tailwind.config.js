/** @type {import('tailwindcss').Config} */
import undefinedPlugins from './lib/plugins';

export default {
  content: [
    './index.html',
    './lib/**/*.{html,js,jsx}',
    './src/**/*.{html,js,jsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [undefinedPlugins]
};
