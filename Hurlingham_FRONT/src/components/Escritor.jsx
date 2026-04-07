import TextoManuscrito from './TextoManuscrito';

/**
 * ============================================================================
 * COMPONENTE: Escritor
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Wrapper component para TextoManuscrito que simplifica su uso.
 * Pasa props directamente al componente de texto manuscrito animado.
 * 
 * RECIBE DATOS DE:
 * - EducacionPage.jsx, HistoriaPage.jsx y otras páginas con títulos
 * 
 * PROPORCIONA DATOS A:
 * - TextoManuscrito.jsx (pasa texto, tamaño, color)
 * 
 * PROPS:
 * - texto {string}: Texto a mostrar
 * - tamano {number}: Tamaño del texto
 * - color {string}: Color del texto
 * 
 * DEPENDENCIAS:
 * - TextoManuscrito: Componente de animación de escritura
 * ============================================================================
 */

function Escritor({
  texto = "",
  tamano = 0,
  color = ""
}) {
  return (
    <div>
      <TextoManuscrito
        texto={texto}
        tamano={tamano}
        color={color}
      />
    </div>
  );
}

export default Escritor;