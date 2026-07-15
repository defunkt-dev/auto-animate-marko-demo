import { defineConfig } from "vite";
import marko from "@marko/run/vite";

export default defineConfig({
  plugins: [marko()],
  optimizeDeps: {
    // Required: @formkit/auto-animate ships a .marko taglib file whose
    // relative, extensionless import ("../index") cannot be resolved by
    // Vite 8's rolldown-based dependency optimizer (strict ESM resolution
    // inside a type:module package). Excluding the package from
    // prebundling lets the Marko plugin compile it instead.
    exclude: ["@formkit/auto-animate"],
  },
});
