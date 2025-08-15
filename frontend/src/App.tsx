// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Process from './pages/Process';
import PortfolioPage from './pages/Portfolio';
import DifferentiationPage from './pages/Differentiation';
import ContactPage from './pages/Contact';
import LoginPage from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import PortfolioAdmin from './pages/admin/PortfolioAdmin';
import ContactsAdmin from './pages/admin/ContactsAdmin';
import MediaAdmin from './pages/admin/MediaAdmin';

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import ScrollToTop from "./components/common/ScrollToTop";


export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route  element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/process" element={<Process />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/differentiation" element={<DifferentiationPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="portfolio" element={<PortfolioAdmin />} />
          <Route path="contacts" element={<ContactsAdmin />} />
          <Route path="media" element={<MediaAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}
