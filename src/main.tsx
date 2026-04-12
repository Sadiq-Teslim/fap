import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import { Analytics } from "@vercel/analytics/react";
import { LoadingScreen } from "./shared/components/LoadingScreen";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingScreen />
    <App />
    <Analytics />
  </StrictMode>,
);
