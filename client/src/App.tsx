
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/DashBoard';
import Leads from './pages/Leads';
import LandingPage from './components/LandingPage';
import CreateLead from './pages/CreateLead';

function App() {
 

  return (
    <><Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/createlead" element={<CreateLead />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} /> 
      
      </Routes>
      
    </Router>
    </>
  )
}

export default App
