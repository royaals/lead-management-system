
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Dashboard from './pages/DashBoard';
import Leads from './pages/Leads';
function App() {
 

  return (
    <><Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} /> 
      
      </Routes>
      
    </Router>
    </>
  )
}

export default App
