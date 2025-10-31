import { lazy, startTransition, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TemplatesHub from "./pages/templates/TemplatesHub";
import { I18nProvider } from "./lib/i18n";

const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const main = document.querySelector("main");
    startTransition(() => {
      main?.focus();
    });
  }, [location.pathname]);

  return (
    <I18nProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/templates" element={<TemplatesHub />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </I18nProvider>
  );
}
