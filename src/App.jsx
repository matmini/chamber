import { BrowserRouter, Routes, Route  } from 'react-router-dom'; 

// Import our tiny page files 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddDorm  from './pages/AddDorm'; 

import 'leaflet/dist/leaflet.css';
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<AddDorm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;