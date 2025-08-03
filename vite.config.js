import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '');
  console.log('\n')
  console.log('System:', env.VITE_SYSTEM_NAME);
  console.log('Version:', env.VITE_SYSTEM_VERSION);
  console.log('Current mode:', mode);

  const allowed_host_str = env.VITE_HOST_ALLOWED

  return {
    plugins: [react()],
    server: {
      host: env.VITE_HOST_ADDRESS,
      port: env.VITE_HOST_PORT,
      allowedHosts: allowed_host_str.split(',').map(host => host.trim()).filter(host => host),
      proxy: {
        '/api': {
          target: env.VITE_HOST_TARGET_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    }
  }
}
)
