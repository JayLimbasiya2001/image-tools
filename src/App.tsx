import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { ContactPage } from "./pages/ContactPage";
import { SeoProvider } from "./seo/SeoProvider";
import { routes } from "./router";

export default function App() {
  return (
    <SeoProvider>
      <MainLayout>
        <Suspense fallback={<div className="p-6">Loading tools…</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {routes.map((r) => (
              <Route key={r.path} path={r.path} element={<r.Component />} />
            ))}
          </Routes>
        </Suspense>
      </MainLayout>
    </SeoProvider>
  );
}

