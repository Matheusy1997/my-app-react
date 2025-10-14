import axios from "axios";

const api = axios.create({
  // Definimos a URL base para todas as requisições
  // O front-end (Vite) roda na porta 5173, e o back-end na 3000
  baseURL: "https://back-end-efpg.onrender.com",
});

api.interceptors.request.use(
  (config) => {
    // Pega o token do localStorage
    const token = localStorage.getItem("authToken");

    // Se o token existir, adiciona ao cabeçalho Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Em caso de erro na configuração da requisição
    return Promise.reject(error);
  }
);

export default api;
