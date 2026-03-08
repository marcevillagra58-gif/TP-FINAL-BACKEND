/**
 * ============================================================================
 * ARCHIVO DE DATOS: culturaData.js
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Datos culturales de Hurlingham: músicos/bandas locales y murales de la
 * ciudad. Incluye enlaces a información adicional e imágenes.
 * 
 * USADO POR:
 * - CulturaPage.jsx (importa musicians y murals)
 * - MusicianCard.jsx (recibe datos individuales de músicos)
 * - MuralGallery.jsx (recibe array de murals)
 * 
 * EXPORTS:
 * - musicians {Array}: 5 músicos/bandas emblemáticas
 *   - Sumo, Las Pelotas, Divididos, La Ruta de Sumo, Orquesta Típica José Massa
 * - murals {Array}: 8 murales de la ciudad
 * 
 * ESTRUCTURA:
 * - musicians: {id, name, imageUrl, link}
 * - murals: {id, imageUrl, alt}
 * ============================================================================
 */

/**
 * Data for musicians and bands from Hurlingham
 */
export const musicians = [
    {
        id: 1,
        name: 'Sumo',
        imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTuXaae0v5eCbuH3-yYp25ePYucAyRM8-iuVZ_DCXOepic1-JZ1_fC637AMfHXQJth4SsFmMREvRz4KBrv3zY9T5GBahTcuXBUkzqnCghvh',
        link: 'https://www.google.com/search?gs_ssp=eJzj4tTP1TcwtzA2Mzdg9GIpLs3NBwAkNQRh&q=sumo&oq=sumo&gs_lcrp=EgZjaHJvbWUqCggBEC4YsQMYgAQyBwgAEAAYjwIyCggBEC4YsQMYgAQyCggCEC4YsQMYgAQyBwgDEAAYgAQyBwgEEAAYgAQyBwgFEAAYgAQyBwgGEAAYgAQyBwgHEAAYgAQyBwgIEAAYgAQyBwgJEC4YgATSAQgyMzExajBqN6gCB7ACAfEFa-csmX9iM9s&sourceid=chrome&ie=UTF-8',
    },
    {
        id: 2,
        name: 'Las Pelotas',
        imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgsTPr7dr2z5T-QqEEZYcznmY12iDn7ghKkJ16fASDUAfElChvU8EzmMl96y4fvDysadmCJ9biPh9-8cGe1p8qP7HxUAWKWxSBwLcKkZnk8j-ieANu-NYnNLLCsAAszpZrM1xp4PdZ8wuo/s1600/LasPelotas5.jpg',
        link: 'https://www.google.com/search?q=las+pelotas&sca_esv=764700c983d0c1df&sxsrf=AE3TifN83S6g-c5i2G95fL53E5ig346y_w%3A1759272583358&ei=h17caKjUFc3a1sQP2M6nuQs&gs_ssp=eJzj4tLP1TcwLMgzNkwyYPTizkksVihIzckvSSwGAFuvB8M&oq=las+pelotas&gs_lp=Egxnd3Mtd2l6LXNlcnAiC2xhcyBwZWxvdGFzKgIIADINEC4YgAQYsQMYQxiKBTIFEAAYgAQyBRAAGIAEMgoQLhiABBhDGIoFMgUQABiABDIFEC4YgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMhwQLhiABBixAxhDGIoFGJcFGNwEGN4EGN8E2AEBSO0YUABY9g1wAHgBkAEAmAFsoAGICKoBAzguM7gBAcgBAPgBAZgCC6ACvgjCAgQQIxgnwgIKECMYgAQYJxiKBcICCxAAGIAEGLEDGIMBwgILEC4YgAQYsQMYgwHCAhMQLhiABBjHARgnGIoFGI4FGK8BwgIKEAAYgAQYQxiKBcICIBAuGIAEGMcBGIoFGI4FGK8BGJcFGNwEGN4EGOAE2AEBwgIIEC4YgAQYsQPCAggQABiABBixA8ICDhAuGIAEGLEDGMcBGK8BwgILEC4YgAQYxwEYrwHCAg4QLhiABBixAxjRAxjHAcICDhAAGIAEGLEDGIMBGIoFwgIOEC4YgAQYxwEYjgUYrwGYAwC6BgYIARABGBSSBwM3LjSgB_qAArIHAzcuNLgHvgjCBwQyLTExyAcr&sclient=gws-wiz-serp',
    },
    {
        id: 3,
        name: 'Divididos',
        imageUrl: 'https://cartelera.montevideo.com.uy/imagenes_espectaculos/musicdetail13/21132.jpg',
        link: 'https://www.google.com/search?q=divididos&sca_esv=764700c983d0c1df&biw=1920&bih=911&sxsrf=AE3TifP7k_XWX3ZIR59HSHLcyk4lTHAQvg%3A1759273367140&ei=l2HcaO6dCKuZ1sQPqffgwAk&gs_ssp=eJzj4tTP1TcwLzGpSDNg9OJMySzLTMlMyS8GAEoRBw8&oq=divididos&gs_lp=Egxnd3Mtd2l6LXNlcnAiCWRpdmlkaWRvcyoCCAAyCBAuGIAEGLEDMgoQABiABBhDGIoFMgUQABiABDIKEAAYgAQYQxiKBTIKEAAYgAQYQxiKBTIKEC4YgAQYQxiKBTIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyFxAuGIAEGLEDGJcFGNwEGN4EGN8E2AEBSPcjUABYtRFwAHgAkAEAmAFpoAHsBqoBAzUuNLgBAcgBAPgBAZgCCqACvBnCAgoQIxiABBgnGIoFwgINEAAYgAQYsQMYQxiKBcICCxAAGIAEGLEDGIMBwgIIEAAYgAQYsQPCAg4QLhiABBixAxjRAxjHAcICBBAjGCfCAhAQLhiABBjRAxjHARgnGIoFwgINEC4YgAQYsQMYQxiKBcICEBAAGIAEGLEDGEMYgwEYigXCAhwQLhiABBixAxhDGIoFGJcFGNwEGN4EGN8E2AEBmAMAugYGCAEQARgUkgcHNC41LjgtMaAHwYsBsgcDNC41uAeTB8IHBTAuMi44yAcf&sclient=gws-wiz-serp',
    },
    {
        id: 4,
        name: 'La Ruta de Sumo',
        imageUrl: 'https://www.hurlingham.gob.ar/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-17-at-11.52.59.jpeg',
        link: 'https://www.hurlingham.gob.ar/cultura/agenda/la-ruta-de-sumo/',
    },
    {
        id: 5,
        name: 'Orquesta Típica José Massa',
        imageUrl: 'https://www.hurlinghamaldia.com/wp-content/uploads/2025/09/2.jpg',
        link: 'https://www.hurlinghamaldia.com/la-orquesta-tipica-jose-massa-y-sus-elegantes-del-tango-la-elegancia-tanguera-que-vistio-el-oeste/',
    },
];

import { getAssetPath } from '../utils/assetPath.js';

/**
 * Data for murals
 */
export const murals = [
    { id: 1, imageUrl: getAssetPath('/assets/Murales/mural 1.jpg'), alt: 'Mural Paisano' },
    { id: 2, imageUrl: getAssetPath('/assets/Murales/mural 2.jpg'), alt: 'Mural mi lugar' },
    { id: 3, imageUrl: getAssetPath('/assets/Murales/mural 3.jpg'), alt: 'Mural dictadura' },
    { id: 4, imageUrl: getAssetPath('/assets/Murales/mural 4.jpg'), alt: 'Mural de trabajadores' },
    { id: 5, imageUrl: getAssetPath('/assets/Murales/mural 5.jpg'), alt: 'Mural de ave' },
    { id: 6, imageUrl: getAssetPath('/assets/Murales/mural 6.jpg'), alt: 'Mural de edificio' },
    { id: 7, imageUrl: getAssetPath('/assets/Murales/mural 7.webp'), alt: 'Mural mujer con flores' },
    { id: 8, imageUrl: getAssetPath('/assets/Murales/mural 8.jpg'), alt: 'Mural pareja' },
];

