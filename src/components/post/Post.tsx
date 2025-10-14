import React from 'react';
import type { Post as PostType } from '../../types/post.types.ts'; // Importa o tipo
import './Post.css';

// As props que este componente espera receber
interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  // Formata a data para um formato mais legível (ex: 13/10/2025)
  const formattedDate = new Date(post.createdAt).toLocaleDateString('pt-BR');

  return (
    <article className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">{post.content}</p>
      <div className="post-meta">
        <span className="post-author">Por: {post.authorName}</span>
        <span className="post-date">{formattedDate}</span>
      </div>
    </article>
  );
};

export default Post;
