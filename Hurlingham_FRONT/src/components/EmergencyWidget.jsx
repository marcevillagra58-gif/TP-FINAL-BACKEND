import React from 'react';

/**
 * ============================================================================
 * COMPONENTE: EmergencyWidget
 * ============================================================================
 *
 * DESCRIPCIÓN:
 * Muestra los teléfonos de emergencia de Hurlingham con el mismo
 * estilo visual del WeatherWidget. Se posiciona fijo en la esquina
 * superior izquierda del home.
 * ============================================================================
 */

const emergencies = [
  { icon: '🚔', label: 'Policía',              number: '911' },
  { icon: '🚒', label: 'Bomberos',             number: '100' },
  { icon: '🚑', label: 'SAME',                 number: '107' },
  { icon: '💜', label: 'Violencia de Género',  number: '144' },
];

const EmergencyWidget = () => {
  return (
    <div className="emergency-widget">
      <div className="emergency-header">
        <span>🆘</span>
        <span className="emergency-title">Emergencias</span>
      </div>
      <ul className="emergency-list">
        {emergencies.map(({ icon, label, number }) => (
          <li key={number} className="emergency-item">
            <span className="emergency-icon">{icon}</span>
            <span className="emergency-label">{label}</span>
            <a href={`tel:${number}`} className="emergency-number">{number}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmergencyWidget;
