import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './css/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PrincipalPage from './pages/PrincipalPage';
import HistoriaPage from './pages/HistoriaPage';
import EducacionPage from './pages/EducacionPage';
import CulturaPage from './pages/CulturaPage';
import ImagenesPage from './pages/ImagenesPage';
import MercadolinghamPage from './pages/MercadolinghamPage';
import ProducerDetailsPage from './pages/ProducerDetailsPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import NotificationBanner from './components/NotificationBanner';
import ResetPasswordPage from './pages/ResetPasswordPage';

// Layout with Header and Footer
const MainLayout = () => (
  <div className="main-layout">
    <Header />
    <NotificationBanner />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

// Layout for Header only
const HeaderOnlyLayout = () => (
  <>
    <Header />
    <NotificationBanner />
    <Outlet />
  </>
);


function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Route for homepage with Header only */}
        <Route element={<HeaderOnlyLayout />}>
          <Route path="/homepage" element={<HomePage />} />
        </Route>

        {/* Routes with Header and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/principal" element={<PrincipalPage />} />
          <Route path="/historia" element={<HistoriaPage />} />
          <Route path="/educacion" element={<EducacionPage />} />
          <Route path="/cultura" element={<CulturaPage />} />
          <Route path="/imagenes" element={<ImagenesPage />} />
          <Route path="/mercadolingham" element={<MercadolinghamPage />} />
          <Route path="/mercadolingham/producer/:id" element={<ProducerDetailsPage />} />

          {/* Ruta protegida para Administrador */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          {/* Ruta 404 */}
          <Route path="/404" element={<NotFoundPage />} />

          {/* Ruta pública: reset de contraseña */}
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Redirige la ruta raíz "/" a "/homepage" */}
        <Route path="/" element={<Navigate to="/homepage" replace />} />

        {/* Catch-all para rutas no existentes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;