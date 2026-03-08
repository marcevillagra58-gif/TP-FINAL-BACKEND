import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ============================================================================
 * COMPONENTE: UserCard
 * ============================================================================
 * 
 * DESCRIPCIÓN:
 * Tarjeta de usuario para la página de administración. Muestra información
 * del usuario y permite ver, bloquear/desbloquear y eliminar usuarios.
 * 
 * RECIBE DATOS DE:
 * - AdminPage.jsx (componente padre que pasa datos y handlers)
 * 
 * PROPORCIONA DATOS A:
 * - Ninguno (utiliza Link de react-router para navegación)
 * 
 * PROPS:
 * - user {Object}: Objeto con datos del usuario {id, name, avatar, state}
 * - onBlock {Function}: Handler para bloquear/desbloquear usuario
 * - onDelete {Function}: Handler para eliminar usuario
 * 
 * DEPENDENCIAS:
 * - react-router-dom: Link para navegación
 * ============================================================================
 */

/**
 * Reusable user card component
 * @param {Object} props
 * @param {Object} props.user - User data object
 * @param {Function} props.onBlock - Handler for block/unblock action
 * @param {Function} props.onDelete - Handler for delete action
 */
const UserCard = ({ user, onBlock, onDelete }) => {
    return (
        <div className={`user-card ${!user.state ? 'blocked' : ''}`}>
            <img src={user.avatar} alt={user.name} className="user-avatar" />
            <h3 className="user-name">{user.name}</h3>
            <p className={`user-state ${!user.state ? 'blocked' : 'active'}`}>
                {!user.state ? 'BLOQUEADO' : 'ACTIVO'}
            </p>
            <div className="card-actions">
                <Link to={`/mercadolingham/producer/${user.id}`} className="action-btn view-btn">
                    VER
                </Link>
                <button
                    className={`action-btn ${!user.state ? 'unblock-btn' : 'block-btn'}`}
                    onClick={() => onBlock(user)}
                >
                    {!user.state ? 'DESBLOQUEAR' : 'BLOQUEAR'}
                </button>
                <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete(user)}
                >
                    ELIMINAR
                </button>
            </div>
        </div>
    );
};

export default UserCard;
