import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/layout/Navbar';
import AdminLayout from './components/layout/AdminLayout';
import HomePage from './pages/public/HomePage';
import ReceitasPage from './pages/public/ReceitasPage';
import DashboardPage from './pages/admin/DashboardPage';
import ReceitasAdminPage from './pages/admin/ReceitasAdminPage';
import PacientesAdminPage from './pages/admin/PacientesAdminPage';
import './styles/global.css';

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={
            <PublicLayout><HomePage /></PublicLayout>
          } />
          <Route path="/receitas" element={
            <PublicLayout><ReceitasPage /></PublicLayout>
          } />

          {/* Rotas admin */}
          <Route path="/admin" element={
            <>
              <Navbar />
              <AdminLayout />
            </>
          }>
            <Route index          element={<DashboardPage />} />
            <Route path="receitas"   element={<ReceitasAdminPage />} />
            <Route path="pacientes"  element={<PacientesAdminPage />} />
          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
