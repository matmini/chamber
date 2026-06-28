import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'; 

// Import our tiny page files 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateListing  from './pages/CreateListing'; 
import ListingPage from './pages/ListingPage';
import ProtectedRoute from './ProtectedRoute';

import 'leaflet/dist/leaflet.css';
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/listings/:id" element={<ListingPage/>}/>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        } />
        <Route path="/listings/create" element={<CreateListing />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;