import { useNotification } from "./NotificationContext";

/**
 * Componente Toast para mostrar notificaciones
 * Responsabilidad única: renderizar las notificaciones visuales
 * 
 * Este componente muestra todas las notificaciones activas en un contenedor
 * posicionado de forma fija en la pantalla
 */
const Toast = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="toast-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`toast toast-${notification.type}`}
          role="alert"
          aria-live="polite"
        >
          <div className="toast-content">
            <span className="toast-icon">
              {notification.type === "success" && "✓"}
              {notification.type === "error" && "✕"}
              {notification.type === "info" && "ℹ"}
              {notification.type === "warning" && "⚠"}
            </span>
            <span className="toast-message">{notification.message}</span>
          </div>
          <button
            className="toast-close"
            onClick={() => removeNotification(notification.id)}
            aria-label="Cerrar notificación"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
