/**
 * ============================================================================
 * ARCHIVO DE DATOS: historiaData.js
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Datos históricos de Hurlingham y sus localidades (Hurlingham, Villa Tesei,
 * William Morris). Incluye descripciones, imágenes y coordenadas de hotspots
 * para el mapa interactivo.
 * 
 * USADO POR:
 * - HistoriaPage.jsx (importa y usa para renderizar mapa y modales)
 * - HistoriaMap.jsx (recibe mapImage y localities)
 * - HistoriaModal.jsx (recibe locality individual)
 * 
 * ESTRUCTURA DE DATOS:
 * - title {string}: Título principal de la sección
 * - description {string}: Descripción general de Hurlingham
 * - mapImage {string}: Ruta de imagen del mapa
 * - localities {Array}: Array de 3 localidades
 *   - id, title, description, images[], hotspot{top, left, width, height}
 * 
 * LOCALIDADES:
 * - Hurlingham (centro)
 * - Villa Tesei (sur)
 * - William Morris (noroeste)
 * ============================================================================
 */

import { getAssetPath } from '../utils/assetPath.js';

export const historiaData = {
    title: "HURLINGHAM: Su Historia",
    description: "La Historia de Hurlingham se centra en su creación a fines del siglo XIX, ligada al Hurlingham Club fundado por la comunidad anglo-argentina y el crecimiento de asentamientos como Villa Tesei. El nombre Hurlingham proviene del club, mientras que la ciudad se formalizó como municipio en 1994 por la Ley Provincial N.º 11.610, integrando las localidades de Hurlingham, Villa Tesei y William Morris.",
    mapImage: getAssetPath("/assets/mapa.jpg"),
    localities: [
        {
            id: 'hurlingham',
            title: 'Hurlingham',
            description: "La Historia de Hurlingham se origina a mediados del siglo XIX con el desarrollo de un molino y un almacén, pero su nombre proviene del Hurlingham Club, fundado por británicos en 1888, que homenajea a un club homónimo en Londres. El partido se creó formalmente en 1994, pero ya existía una comunidad con aportes de inmigrantes británicos, alemanes, italianos y españoles. Hoy, Hurlingham se caracteriza por sus espacios verdes y es una de las localidades más jóvenes de la provincia de Buenos Aires.",
            images: [
                getAssetPath("/assets/Historia/hist-hurl-1.jpg"),
                getAssetPath("/assets/Historia/hist-hurl-2.jpg")
            ],
            hotspot: { top: '33%', left: '54%', width: '24%', height: '24%' }
        },
        {
            id: 'tesei',
            title: 'Villa Tesei',
            description: "Villa Tesei tiene sus orígenes en las tierras cercanas al arroyo de Morón, donde el inmigrante italiano Santos Tesei se estableció en 1909 y se convirtió en un pionero local. La zona, que antiguamente pertenecía al Partido de Morón, fue declarada ciudad el 13 de noviembre de 1974, en homenaje a Don Santos. Posteriormente, con la creación del Municipio de Hurlingham en 1994, Villa Tesei pasó a formar parte de este nuevo partido como una de sus principales localidades.",
            images: [
                getAssetPath("/assets/Historia/hist-tes-1.jpg"),
                getAssetPath("/assets/Historia/hist-tes-2.jpg")
            ],
            hotspot: { top: '62%', left: '51%', width: '22%', height: '22%' }
        },
        {
            id: 'morris',
            title: 'William Morris',
            description: "La Historia de William Morris se centra en la instalación de una estación ferroviaria en 1958 en el Barrio Roca, anteriormente una zona rural de Morón. El nombre de la localidad honra a William Case Morris, un misionero y educador británico conocido por su labor filantrópica y educativa en Argentina a finales del siglo XIX y principios del XX.",
            images: [
                getAssetPath("/assets/Historia/hist-morr-1.jpg"),
                getAssetPath("/assets/Historia/hist-morr-2.jpg")
            ],
            hotspot: { top: '30%', left: '20%', width: '22%', height: '22%' }
        }
    ]
};
