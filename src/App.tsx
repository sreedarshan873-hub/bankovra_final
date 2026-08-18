import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import BankDirectory from './pages/BankDirectory'
import BankDetail from './pages/BankDetail'
import FindBank from './pages/FindBank'
import Compare from './pages/Compare'
import MinimumBalanceFinder from './pages/MinimumBalanceFinder'
import ChargesFinder from './pages/ChargesFinder'
import Loans from './pages/Loans'
import Calculators from './pages/Calculators'
import Investments from './pages/Investments'
import Insurance from './pages/Insurance'
import AIAssistant from './pages/AIAssistant'
import Dashboard from './pages/Dashboard'
import Safety from './pages/Safety'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/banks" element={<BankDirectory />} />
          <Route path="/banks/:id" element={<BankDetail />} />
          <Route path="/find-bank" element={<FindBank />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/minimum-balance" element={<MinimumBalanceFinder />} />
          <Route path="/charges" element={<ChargesFinder />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
