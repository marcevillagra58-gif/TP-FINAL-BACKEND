import React from 'react';
import { useExternalData } from '../hooks/useExternalData';
import NewsCard from './NewsCard';
import '../css/NewsSection.css';

/**
 * ============================================================================
 * COMPONENTE: NewsSection
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Muestra una grilla de noticias de actualidad.
 * ============================================================================
 */

const NewsSection = () => {
    const { news, loading, error } = useExternalData();

    if (loading.news) {
        return (
            <section className="news-section loading">
                <div className="section-title-container">
                    <h2 className="section-title">🗞️ Actualidad</h2>
                </div>
                <div className="news-grid">
                    {[1, 2, 3].map(i => <div key={i} className="news-card skeleton"></div>)}
                </div>
            </section>
        );
    }

    if (error.news && news.length === 0) return null;

    return (
        <section className="news-section">
            <div className="section-title-container">
                <h2 className="section-title">🗞️ Actualidad y Noticias</h2>
                <div className="section-subtitle">Lo que está pasando en Hurlingham y el país</div>
            </div>
            
            <div className="news-grid">
                {news.map((article, index) => (
                    <NewsCard key={index} article={article} />
                ))}
            </div>
        </section>
    );
};

export default NewsSection;
