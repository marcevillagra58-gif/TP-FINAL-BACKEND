import React from 'react';
import '../css/cultura.css';
import Escritor from '../components/Escritor';
import MusicianCard from '../components/MusicianCard';
import MuralGallery from '../components/MuralGallery';
import { musicians, murals } from '../data/culturaData';

/**
 * ============================================================================
 * PÁGINA: CulturaPage
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Página de cultura con músicos/bandas locales y murales de la ciudad.
 * Exhibe el patrimonio cultural y artístico de Hurlingham.
 * 
 * RUTA:
 * - /cultura
 * 
 * FUNCIONALIDADES:
 * - Título animado "Cultura"
 * - Sección de músicos/bandas emblemáticas (5 artistas)
 * - Links clicables a información de cada artista
 * - Galería grid de murales de la ciudad (8 murales)
 * 
 * SECCIONES:
 * 1. Músicos: Sumo, Las Pelotas, Divididos, La Ruta de Sumo, Orquesta Típica José Massa
 * 2. Murales: Grid responsive con imágenes de murales callejeros
 * 
 * DATOS:
 * - musicians desde src/data/culturaData.js
 * - murals desde src/data/culturaData.js
 * 
 * COMPONENTES:
 * - Escritor: Título animado
 * - MusicianCard: Tarjetas de músicos con imagen y link
 * - MuralGallery: Galería grid de murales
 * ============================================================================
 */

const CulturaPage = () => {
    return (
        <div>
            <div className="container">
                <Escritor texto="Cultura" tamano={50} color="red" />

                <h2 className="title-culture-h2">
                    Estos son algunos de los grandes exponentes de la musica en Hurlingham
                </h2>

                <div className="links">
                    {musicians.map(musician => (
                        <MusicianCard
                            key={musician.id}
                            name={musician.name}
                            imageUrl={musician.imageUrl}
                            link={musician.link}
                        />
                    ))}
                </div>

                <h1 className="title-murales">Murales por las ciudades</h1>
                <h2 className="title-culture-h2">
                    Si recorres las calles del partido, podés apreciar obras como estas
                </h2>

                <MuralGallery murals={murals} />
            </div>
        </div>
    );
};

export default CulturaPage;