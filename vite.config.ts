import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  // The tsconfigPaths() plugin automatically reads your tsconfig.json
  // and makes the '@/' path shortcut work correctly.
  plugins: [react(), tsconfigPaths()],
})