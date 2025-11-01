import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/user/Home';
import Register from './pages/user/Register';
import NotFound from './pages/user/notFound';   // or ./pages/user/NotFound if you renamed
import Login from './pages/user/Login';
import BankLoanPage from './pages/user/BankLoanPage';   // fixed here
import Navbar from './components/Navbar';
import About from './components/About';
import EligibilityFormPage from './pages/user/EligibilityFormPage';
import LoanPage from './pages/user/LoanPage';
import ApprovedProjects from './pages/user/ApprovedProjects';
import HomeLoanEMICalculator from './components/HomeLoanEMICalculator';
import Accordion from './components/faq';
import CompareLoan from './pages/user/ComparedLoan';
import CheckRates from './pages/user/CheckRates';
import ApplyNow from './pages/user/ApplyNow';
import HelpCenter from './pages/user/HelpCenter';

// admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./layouts/admin/AdminLayout";
import Seo from './pages/admin/Seo';
import Eligibility from './pages/admin/Eligibility';


function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/admin') || location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/calculator/:bank" element={<BankLoanPage />} />
        <Route path="/eligibility-form" element={<EligibilityFormPage />} />
        <Route path="/emi-calculator" element={<HomeLoanEMICalculator />} />
        <Route path="/faqs" element={<Accordion />} />
  <Route path="/about" element={<About />} />
        <Route path="/compare-loans" element={<CompareLoan />} />
        <Route path="/check-rates" element={<CheckRates />} />
        <Route path="/apply-now" element={<ApplyNow />} />
        <Route path="/help-center" element={<HelpCenter />} />

      {/* <Route path="/loan/:bankSlug" element={<LoanPage />} /> */}
      <Route path="/loan/:bankSlug/projects/:cityName" element={<ApprovedProjects />} />

      <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="Seo" element={<Seo />} />
          <Route path="Eligibility" element={<Eligibility />} />
          {/* Add more nested routes here */}
        </Route>

         </Routes>
    </>
  );
}

function App() {
  return (
    <Router>

      <AppContent />
    </Router>

  );
}

export default App;
