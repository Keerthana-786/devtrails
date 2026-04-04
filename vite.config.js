import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,

    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor';
            if (id.includes('leaflet') || id.includes('react-leaflet')) return 'ui';
            if (id.includes('axios') || id.includes('jwt-decode') || id.includes('html2canvas') || id.includes('jspdf')) return 'utils';
          }
        },
      },
    },

    // Enable source maps for debugging
    sourcemap: false,

    // Minification options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'axios', 'leaflet'],
  },
})
