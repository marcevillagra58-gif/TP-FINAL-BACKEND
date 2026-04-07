import { useState } from 'react';
import '../css/Footer.css';
import ContactForm from './ContactForm'; // Importar el nuevo componente

/**
 * ============================================================================
 * COMPONENTE: Footer
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Pie de página de la aplicación con información de contacto, redes sociales
 * y acceso al formulario de contacto. Presente en todas las páginas.
 * 
 * RECIBE DATOS DE:
 * - App.jsx (renderizado globalmente en todas las páginas)
 * 
 * PROPORCIONA DATOS A:
 * - ContactForm.jsx (pasa onClose handler)
 * 
 * PROPS:
 * - Ninguna
 * 
 * DEPENDENCIAS:
 * - ContactForm: Formulario de contacto modal
 * - Font Awesome: Iconos de redes sociales
 * ============================================================================
 */

function Footer() {

  const [isContactFormVisible, setContactFormVisible] = useState(false);

  const toggleContactForm = () => {
    setContactFormVisible(!isContactFormVisible);
  };

  return (
    <>
      <footer className="page-footer">
        <div className="container-footer">
          <p>&copy; 2025 Municipalidad de Hurlingham</p>
          <div><p>Pagina no-oficial del partido de HURLINGHAM</p></div>
          <p>Contacto:
            <a href="https://www.facebook.com/culturahur" target="_blank" rel="noopener noreferrer" title="Facebook"><i className="fa-brands fa-facebook icon-footer"></i></a>
            <a href="https://www.instagram.com/MuniHurlingham/" target="_blank" rel="noopener noreferrer" title="Instagram"><i className="fa-brands fa-instagram icon-footer"></i></a>
            <a href="https://www.discord.com/MuniHurlingham/" target="_blank" rel="noopener noreferrer" title="Discord"><i className="fa-brands fa-discord icon-footer"></i></a>
            <a href="https://mail.google.com/mail/?view=cm&to=hurlingham_pno@gmail.com" target="_blank" rel="noopener noreferrer" title="Email"><i className="fa-solid fa-envelope icon-footer"></i></a>
            <a href="#" onClick={(e) => { e.preventDefault(); toggleContactForm(); }} title="Formulario de contacto"><i className="fas fa-edit icon-footer"></i></a>
          </p>
          <p>by MaV</p>
        </div>
      </footer>
      {isContactFormVisible && <ContactForm onClose={toggleContactForm} />}
    </>
  );
}

export default Footer;