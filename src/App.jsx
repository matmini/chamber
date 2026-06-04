import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'; 

// Import our tiny page files 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddDorm  from './pages/AddDorm'; 

import ProtectedRoute from './ProtectedRoute';

import 'leaflet/dist/leaflet.css';
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        } />
        <Route path="/add" element={<AddDorm />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;