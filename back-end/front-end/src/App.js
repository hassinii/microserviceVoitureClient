import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import Login from './components/Login';
import Create from './components/clients/Create';
import Index from './components/clients/Index';
import IndexCar from './components/voitures/Index'
import 'bootstrap/dist/css/bootstrap.min.css';
import ResponsiveAppBar from './components/navbar/ResponsiveAppBar';
import PrivateRoute from './routes/PrivateRoute';
import {AuthContext} from './context/AuthContext'
import CreateV from './components/voitures/CreateV';

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
    <ResponsiveAppBar isAuthenticated={isAuthenticated}/>
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/clients" element={<PrivateRoute Component={Index} />} />
          <Route path="/cars" element={<PrivateRoute Component={IndexCar} />} />
          <Route path="/client/create" element={<PrivateRoute Component={Create} />} />
          <Route path="/voiture/create" element={<PrivateRoute Component={CreateV} />} />
          

          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/clients/create" element={<Create />} />
          {/* <Route path="/clients" element={<Index />} /> */}
          {/* <Route path="/cars" element={<IndexCar />} /> */}
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
