import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import '../css/NotificationBanner.css';

/**
 * ============================================================================
 * COMPONENTE: NotificationBanner
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Muestra una lista de notificaciones flotantes en tiempo real.
 * Solo visible para administradores.
 * ============================================================================
 */

const NotificationBanner = () => {
    const { notifications, clearNotifications } = useNotifications();

    if (notifications.length === 0) return null;

    return (
        <div className="notification-container">
            <div className="notification-header">
                <span>🔔 Notificaciones ({notifications.length})</span>
                <button onClick={clearNotifications} className="clear-btn">Limpiar</button>
            </div>
            <div className="notification-list">
                {notifications.map((notif, index) => (
                    <div key={index} className={`notification-item ${notif.type}`}>
                        <div className="notif-message">{notif.message}</div>
                        <div className="notif-time">{new Date(notif.timestamp).toLocaleTimeString()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationBanner;
