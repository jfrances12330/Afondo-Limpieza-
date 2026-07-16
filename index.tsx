
import React, { useEffect, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import App from './App';
import './assets/main.css';

const CertificateGenerator = lazy(() => import('./components/CertificateGenerator'));
const AvisoLegal = lazy(() => import('./components/legal/AvisoLegal'));
const Privacidad = lazy(() => import('./components/legal/Privacidad'));
const Cookies = lazy(() => import('./components/legal/Cookies'));
const Calculadora = lazy(() => import('./components/Calculadora'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const LimpiezaConductos = lazy(() => import('./pages/LimpiezaConductos'));

// Compatibilidad con URLs con hash previas (#/certificado, #/aviso-legal, etc.)
// Al montar, si la URL trae hash tipo "#/algo", redirige a "/algo" preservando historial.
const HashRedirect: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const h = window.location.hash;
    if (h && h.startsWith('#/')) {
      navigate(h.slice(1), { replace: true });
    }
  }, [navigate]);
  return null;
};

// Wrapper genérico para páginas cuyo prop `onBack` era el navigateTo interno:
// al pasar a ruta propia, "atrás" navega a "/" con react-router.
const RoutedBack: React.FC<{ Page: React.ComponentType<{ onBack: () => void }> }> = ({ Page }) => {
  const navigate = useNavigate();
  return <Page onBack={() => navigate('/')} />;
};

const Loading: React.FC = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui' }}>Cargando…</div>
);

const Root: React.FC = () => (
  <BrowserRouter>
    <HashRedirect />
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/certificado" element={<CertificateGenerator />} />
        <Route path="/aviso-legal" element={<RoutedBack Page={AvisoLegal} />} />
        <Route path="/privacidad" element={<RoutedBack Page={Privacidad} />} />
        <Route path="/cookies" element={<RoutedBack Page={Cookies} />} />
        <Route path="/calculadora" element={<RoutedBack Page={Calculadora} />} />
        <Route path="/contacto" element={<RoutedBack Page={ContactPage} />} />
        <Route path="/limpieza-conductos-extraccion-alicante" element={<LimpiezaConductos />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
