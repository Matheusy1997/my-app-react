// import "./App.css";
// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from './components/protected/ProtectedRoute';
import HomePage from './pages/HomePage';

// Imagine que você tenha outras páginas
// import DashboardPage from './pages/DashboardPage';
// import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<LoginPage />} />
        {/* Nova rota para a página de Registro */}
        <Route path="/register" element={<RegisterPage />} />

        {/* ROTA PROTEGIDA */}
        <Route element={<ProtectedRoute />}>
          <Route path="home" element={<HomePage />} />
          {/* Outras rotas protegidas podem ir aqui */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;