import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Lắng nghe trên mọi IP cục bộ
    port: 3000, // Bạn có thể đổi port nếu muốn
  }
})
