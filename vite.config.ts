// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // 如果你用的是 React
// import vue from '@vitejs/plugin-vue';     // 如果你用的是 Vue

export default defineConfig({
  plugins: [
    // 根据你的项目选择对应的插件
    react(), 
    // 或者 vue()
  ],
  // 关键：由于你的仓库名是特殊的 `<username>.github.io`，它会部署到根路径
  base: '/',
  build: {
    outDir: 'dist',
  }
});