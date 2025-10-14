import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Login.css"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token } = response.data;

      if(token) {
        // Salva o token no localStorage
        localStorage.setItem('authToken', token)
        navigate('/home');
      } else {
        setError(response.data)
        throw new Error('Token não recebido do servidor.')
      }

    } catch (err) {
      if(err instanceof Error) {
        setError(err.message)
      }
      // setError("Email ou senha inválidos");
      console.error(err);
    } finally {
      if(error) {
        alert(error)
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Acessar Conta</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>

        <button type="submit" className="login-button">
          Entrar
        </button>

        <div className="form-footer">
          <a href="/forgot-password">Esqueceu a senha?</a>
          <span>|</span>
          <a href="/register">Criar conta</a>
        </div>
      </form>
    </div>
  );
};

export default Login;