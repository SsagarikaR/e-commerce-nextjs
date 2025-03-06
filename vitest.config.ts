import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import magicalSvg from "vite-plugin-magical-svg";

export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    magicalSvg({
      target: "react",
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
  },
});
