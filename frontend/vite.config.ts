import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("src/", import.meta.url)),
        },
      ],
    },
  };
});
