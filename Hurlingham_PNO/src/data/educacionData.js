/**
 * ============================================================================
 * ARCHIVO DE DATOS: educacionData.js
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Objeto de configuración para la visualización atómica de instituciones
 * educativas. Define la institución central (UNaHur) y tres órbitas con
 * instituciones educativas de Hurlingham.
 * 
 * USADO POR:
 * - EducacionPage.jsx (importa y pasa a AtomicVisualization)
 * - AtomicVisualization.jsx (recibe via props)
 * - AtomOrbit.jsx (recibe órbitas individuales)
 * 
 * ESTRUCTURA DE DATOS:
 * - center {Object}: Institución central
 *   - id, name, image, link
 * - orbits {Array}: Array de 3 órbitas
 *   - id, radius, institutions[]
 * 
 * CONFIGURACIÓN:
 * - Radio órbita 1: 120px (3 instituciones)
 * - Radio órbita 2: 210px (5 instituciones)
 * - Radio órbita 3: 300px (9 instituciones)
 * ============================================================================
 */

import { getAssetPath } from '../utils/assetPath.js';

/**
 * Datos de instituciones educativas para la visualización atómica
 */
export const educationData = {
    center: {
        id: 'unahur',
        name: 'UNaHur',
        image: getAssetPath('/assets/Educacion/Unahur.jpg'),
        link: 'https://unahur.edu.ar/',
    },
    orbits: [
        {
            id: 1,
            radius: 120,
            institutions: [
                {
                    id: 'eest2',
                    name: 'EEST N°2 República del Perú',
                    image: getAssetPath('/assets/Educacion/EEST N°2 República del Perú.jpg'),
                    link: 'https://eestn2rp.com.ar/',
                },
                {
                    id: 'san-jose',
                    name: 'San José de Calasanz',
                    image: getAssetPath('/assets/Educacion/San Jose de Calazans.jpg'),
                    link: 'https://sjdecalasanz.edu.ar/',
                },
            ],
        },
        {
            id: 2,
            radius: 210, // Aumentado a 210 (Brecha 90px)
            institutions: [
                {
                    id: 'echeverria',
                    name: 'Secundaria Esteban Echeverría',
                    image: getAssetPath('/assets/Educacion/Secundaria Esteban Echeverría.webp'),
                    link: 'https://www.hurlinghamaldia.com/el-echeverria-cumplio-50-anos/',
                },
                {
                    id: 'moreno',
                    name: 'Secundaria Mariano Moreno',
                    image: getAssetPath('/assets/Educacion/Secundaria Mariano Moreno.jpg'),
                    link: 'https://www.immhurlingham.com.ar/',
                },
            ],
        },
        {
            id: 3,
            radius: 300, // Aumentado a 300 (Brecha 90px)
            institutions: [
                {
                    id: 'sagrado-corazon',
                    name: 'Secundaria Sagrado Corazón de Jesús',
                    image: getAssetPath('/assets/Educacion/Secundaria Sagrado Corazon de Jesus.jpg'),
                    link: 'https://sagradocorazon.edu.ar/',
                },
                {
                    id: 'st-hildas',
                    name: "St.Hilda's College",
                    image: getAssetPath("/assets/Educacion/St.Hilda's College.jpg"),
                    link: 'https://www.sthildas.esc.edu.ar/',
                },
                {
                    id: 'stepinac',
                    name: 'Instituto Cardenal Stepinac',
                    image: getAssetPath('/assets/Educacion/Cardenal Stepinac.webp'),
                    link: 'https://www.stepinac.edu.ar/',
                },
            ],
        },
    ],
};
