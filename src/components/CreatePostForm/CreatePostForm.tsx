import React, { useState } from 'react';
import api from '../../services/api';
import type { Post as PostType } from '../../types/post.types'; // Importa o tipo
import './CreatePostForm.css';

// Props que este componente espera, incluindo a função para atualizar o feed
interface CreatePostFormProps {
  onPostCreated: (newPost: PostType) => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    // Validação simples
    if (!title.trim() || !content.trim()) {
      setError('O título e o conteúdo são obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Faz a requisição POST para a sua API
      const published: boolean = true;
      const response = await api.post(
        'http://localhost:3000/api/posts',
        { title, content, published },
      );

      // Limpa o formulário
      setTitle('');
      setContent('');
      
      // Chama a função do componente pai para adicionar o novo post ao feed
      onPostCreated(response.data);

    } catch (err) {
      console.error("Erro ao criar o post:", err);
      setError('Não foi possível criar o post. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post-container">
      <h3>Criar Novo Post</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do seu post"
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Conteúdo</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="O que você está pensando?"
            rows={5}
            disabled={isSubmitting}
          />
        </div>
        {error && <p className="error-message-form">{error}</p>}
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Publicando...' : 'Publicar'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;