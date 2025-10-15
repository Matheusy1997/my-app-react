import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePostForm from '../components/CreatePostForm/CreatePostForm';
import api from '../services/api';

// Importando os novos componentes e tipos
import PostComponent from '../components/post/Post';
import type { Post as PostType } from '../types/post.types';

// Estilos para o container da home
import "./HomePage.css"

const HomePage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostType[]>([]); // Estado para armazenar os posts
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await api.get('/posts');

        setPosts(response.data); // Salva os posts recebidos no estado

      } catch (err) {
        if (err) {
          console.error("Sessão inválida ou expirada.");
          localStorage.removeItem('authToken');
          navigate('/');
        } else {
          console.error("Erro ao buscar posts:", err);
          setError("Não foi possível carregar os posts. Tente novamente mais tarde.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [navigate]);

  const handlePostCreated = (newPost: PostType) => {
    setPosts([newPost, ...posts]);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  if (isLoading) {
    return <div className="loading-message">Carregando posts...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Feed de Posts</h1>
        <button onClick={handleLogout} className="logout-button">
          Sair
        </button>
      </header>

      <main className="posts-feed">
        <CreatePostForm onPostCreated={handlePostCreated} />
        {posts.length > 0 ? (
          posts.map(post => (
            // Usa o PostComponent para cada item do array de posts
            <PostComponent key={post.id} post={post} />
          ))
        ) : (
          <p>Ainda não há posts para exibir.</p>
        )}
      </main>
    </div>
  );
};

export default HomePage;