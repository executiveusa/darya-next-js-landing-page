import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  define: {
    __CLOUD_CODE_ENDPOINT__: JSON.stringify(process.env.CLOUD_CODE_ENDPOINT || "/api/claude"),
    __CLOUDFLOW_ENDPOINT__: JSON.stringify(process.env.CLOUDFLOW_ENDPOINT || "/api/cloudflow"),
    __RUBE_ENDPOINT__: JSON.stringify(process.env.RUBE_ENDPOINT || "/api/rube"),
    __MODEL_ROUTER_ENDPOINT__: JSON.stringify(process.env.MODEL_ROUTER_ENDPOINT || "/api/router")
  }
});
