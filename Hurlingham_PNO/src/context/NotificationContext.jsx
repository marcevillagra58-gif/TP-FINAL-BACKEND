import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

/**
 * ============================================================================
 * CONTEXT: NotificationContext
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Maneja la comunicación en tiempo real vía Socket.io.
 * Escucha eventos del servidor y gestiona notificaciones locales (toasts/alertas).
 * ============================================================================
 */

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Solo conectar si el usuario es Admin (para esta fase)
        if (isAuthenticated && user?.role === 'admin') {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
            const socketUrl = baseUrl.replace('/api', ''); // Quitar /api para la URL base del servidor

            const newSocket = io(socketUrl, {
                withCredentials: true,
                reconnectionAttempts: 5
            });

            newSocket.on('connect', () => {
                console.log('📡 Conectado al servidor de tiempo real (Socket.io)');
            });

            // Escuchar notificaciones de administración
            newSocket.on('admin:notification', (data) => {
                console.log('🔔 Nueva notificación:', data);
                setNotifications(prev => [data, ...prev].slice(0, 10)); // Guardar las últimas 10
                
                // Opcional: Sonido o alerta visual específica
                if (Notification.permission === 'granted') {
                    new Error("Este navegador soporta notificaciones de escritorio");
                }
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
                console.log('🔌 Desconectado de Socket.io');
            };
        }
    }, [isAuthenticated, user]);

    const clearNotifications = () => setNotifications([]);

    return (
        <NotificationContext.Provider value={{ notifications, clearNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
