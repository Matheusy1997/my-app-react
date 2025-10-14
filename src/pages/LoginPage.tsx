// import React from 'react';
import Login from "../components/login/Login"; // Importando o componente de formulário
import Navbar from "../components/navbar/Navbar";

const LoginPage = () => {
  return (
    // No futuro, você poderia adicionar um Header, Footer ou um layout específico aqui
    <div>
      <Navbar />
      <Login />
    </div>
  );
};

export default LoginPage;
