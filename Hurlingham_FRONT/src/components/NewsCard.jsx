import React from 'react';

/**
 * ============================================================================
 * COMPONENTE: NewsCard
 * ============================================================================
 */

const NewsCard = ({ article }) => {
    // Si no hay imagen, usamos un placeholder genérico
    const imageUrl = article.urlToImage || 'https://images.unsplash.com/photo-1504711432869-efd597cdd04d?auto=format&fit=crop&q=80&w=400';

    return (
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-card">
            <div className="news-card-image">
                <img src={imageUrl} alt={article.title} loading="lazy" />
                <div className="news-card-source">{article.source.name}</div>
            </div>
            <div className="news-card-content">
                <h3 className="news-card-title">{article.title}</h3>
                <p className="news-card-description">{article.description?.substring(0, 100)}...</p>
                <div className="news-card-footer">
                    <span className="news-card-date">
                        {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                    <span className="news-card-more">Leer más →</span>
                </div>
            </div>
        </a>
    );
};

export default NewsCard;
