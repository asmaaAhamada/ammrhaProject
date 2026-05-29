import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
     visualizer({
      open: true,        // يفتح الخريطة تلقائياً بعد البناء
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
}),
    svgr(),
  ],test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/test/setupTests.jsx',
  alias: {
    '\\.(svg)$': '/src/test/__mocks__/svgMock.jsx'
  }

}
});
