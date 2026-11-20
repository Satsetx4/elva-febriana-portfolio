import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Navbar } from './components/layout/Navbar';
import { PageCurtain } from './components/layout/PageCurtain';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { FloatingWhatsApp } from './components/ui/FloatingWhatsApp';
import { ThemeProvider } from './context/ThemeContext';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { EducationPage } from './pages/EducationPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Elva Febriana — Barista, Koordinator Acara & Lulusan SMAN 3 Probolinggo',
  '/tentang': 'Profil & Karakter Kerja — Elva Febriana',
  '/pengalaman': 'Pengalaman Kerja — Elva Febriana',
  '/pendidikan': 'Pendidikan & Organisasi — Elva Febriana',
  '/kontak': 'Hubungi Langsung — Elva Febriana',
};

function AppShell() {
  const location = useLocation();

  useEffect(() => {
    document.title =
      ROUTE_TITLES[location.pathname] ??
      'Halaman Tidak Ditemukan — Elva Febriana';
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-ink">
      <Navbar />

      <main className="flex-1 pb-20 md:pb-0">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageCurtain>
                  <HomePage />
                </PageCurtain>
              }
            />
            <Route
              path="/tentang"
              element={
                <PageCurtain>
                  <AboutPage />
                </PageCurtain>
              }
            />
            <Route
              path="/pengalaman"
              element={
                <PageCurtain>
                  <ExperiencePage />
                </PageCurtain>
              }
            />
            <Route
              path="/pendidikan"
              element={
                <PageCurtain>
                  <EducationPage />
                </PageCurtain>
              }
            />
            <Route
              path="/kontak"
              element={
                <PageCurtain>
                  <ContactPage />
                </PageCurtain>
              }
            />
            <Route
              path="*"
              element={
                <PageCurtain>
                  <NotFoundPage />
                </PageCurtain>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <MobileBottomNav />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
