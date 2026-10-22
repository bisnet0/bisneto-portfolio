import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      /**
       * Media dropped into public/ (or the local refs/ folder) locks files on Windows
       * while it is still being written, which makes chokidar throw EBUSY and kills the
       * dev server. None of it needs HMR, so keep the watcher away from it.
       */
      ignored: [
        '**/refs/**',
        '**/dist/**',
        '**/src/assets/audio/**',
        '**/public/**/*.{mp3,m4a,wav,ogg,flac,aac,mp4,mov,webm,mkv,pdf,zip}',
      ],
    },
  },
})
