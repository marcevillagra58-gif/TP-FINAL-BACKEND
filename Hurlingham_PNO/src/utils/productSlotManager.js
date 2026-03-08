/**
 * ============================================================================
 * MÓDULO DE UTILIDADES: productSlotManager.js
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Funciones de utilidad para gestionar los 20 slots de productos en objetos
 * de productor. Cada productor tiene campos name1-20, description1-20, imagen1-20.
 * 
 * EXPORTS:
 * - getUsedSlots(producer): Retorna array de índices en uso
 * - getNextAvailableSlot(producer): Retorna siguiente slot disponible (1-20) o -1
 * - buildProductsArray(producer, includeNewProductIndex): Construye array de productos
 * 
 * ESTRUCTURA DE DATOS DEL PRODUCTOR:
 * - name, description, contact1, contact2, avatar (info del productor)
 * - name1-20, description1-20, imagen1-20 (hasta 20 productos)
 * 
 * LÓGICA DE SLOTS:
 * - Slot ocupado: tiene imagen Y nombre
 * - Slot vacío: falta imagen O nombre
 * - Máximo: 20 productos por productor
 * 
 * FUNCIÓN getUsedSlots:
 * - Parámetros: producer object
 * - Retorna: Array [1, 3, 5, ...] índices ocupados
 * - Validación: producer[`imagen${i}`] && producer[`name${i}`]
 * 
 * FUNCIÓN getNextAvailableSlot:
 * - Parámetros: producer object
 * - Retorna: number (1-20) o -1 si lleno
 * - Busca primer slot no usado
 * 
 * FUNCIÓN buildProductsArray:
 * - Parámetros: producer, includeNewProductIndex (opcional)
 * - Retorna: Array de {originalIndex, image, name, description, isNew?}
 * - Si includeNewProductIndex: agrega slot vacío con isNew=true
 * - Usado para construir datos del ProductCarousel
 * 
 * USADO POR:
 * - useProductManager.js (CRUD de productos)
 * - ProducerDetailsPage.jsx (via useProductManager)
 * 
 * PATRÓN DE DISEÑO:
 * - Utilidades puras (sin side effects)
 * - Validación de null
 * - Abstracción de lógica de slots
 * ============================================================================
 */

/**
 * Funciones de utilidad para gestionar los espacios de productos (1-20) en objetos de productor
 */

/**
 * Obtener array de índices de espacios usados de un objeto productor
 * @param {Object} producer - Objeto productor con propiedades imagen1-20, name1-20
 * @returns {Array<number>} Array de índices de espacios que están actualmente en uso
 */
export const getUsedSlots = (producer) => {
    if (!producer) return [];

    const usedSlots = [];
    for (let i = 1; i <= 20; i++) {
        if (producer[`imagen${i}`] && producer[`name${i}`]) {
            usedSlots.push(i);
        }
    }
    return usedSlots;
};

/**
 * Obtener el siguiente índice de espacio disponible para un nuevo producto
 * @param {Object} producer - Objeto productor con propiedades imagen1-20, name1-20
 * @returns {number} Siguiente índice de espacio disponible (1-20) o -1 si todos los espacios están llenos
 */
export const getNextAvailableSlot = (producer) => {
    if (!producer) return -1;

    const usedSlots = getUsedSlots(producer);

    for (let i = 1; i <= 20; i++) {
        if (!usedSlots.includes(i)) {
            return i;
        }
    }

    return -1; // No hay espacios disponibles
};

/**
 * Construir un array de objetos de producto a partir de un objeto productor
 * @param {Object} producer - Objeto productor con propiedades imagen1-20, name1-20, description1-20
 * @param {number|null} includeNewProductIndex - Índice opcional para un nuevo espacio de producto vacío
 * @returns {Array<Object>} Array de objetos de producto con originalIndex, image, name, description, isNew
 */
export const buildProductsArray = (producer, includeNewProductIndex = null) => {
    if (!producer) return [];

    const products = [];

    // Agregar productos existentes
    for (let i = 1; i <= 20; i++) {
        if (producer[`imagen${i}`] && producer[`name${i}`]) {
            products.push({
                originalIndex: i,
                image: producer[`imagen${i}`],
                name: producer[`name${i}`],
                description: producer[`description${i}`]
            });
        }
    }

    // Agregar nuevo espacio de producto si se especifica
    if (includeNewProductIndex !== null) {
        products.push({
            originalIndex: includeNewProductIndex,
            image: '',
            name: '',
            description: '',
            isNew: true
        });
    }

    return products;
};
