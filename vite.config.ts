import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// Configure Vite for GitHub Pages deployment
// - Set base to repo name so assets resolve under /Link-Dick/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/Link-Dick/',
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
