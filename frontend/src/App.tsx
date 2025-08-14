// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Process from './pages/Process';
import Footer from './components/common/Footer';
import PortfolioPage from './pages/Portfolio';
import DifferentiationPage from './pages/Differentiation';
import ContactPage from './pages/Contact';
import LoginPage from './pages/Login';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/process" element={<Process />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/differentiation" element={<DifferentiationPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        
      </Routes>
      <Footer/>
    </Router>
  );
}
