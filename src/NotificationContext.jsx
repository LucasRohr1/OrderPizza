import { createContext, useState, useContext } from "react";

/**
 * Contexto para manejar notificaciones globales
 * Sigue el principio de Responsabilidad Única: solo maneja el estado de notificaciones
 */
const NotificationContext = createContext();

/**
 * Hook personalizado para acceder al contexto de notificaciones
 * Encapsula la lógica de acceso al contexto
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification debe usarse dentro de un NotificationProvider");
  }
  return context;
};

/**
 * Provider que maneja el estado de las notificaciones
 * 
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes hijos
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  /**
   * Agrega una nueva notificación al stack
   * Genera un ID único basado en timestamp
   * 
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - Tipo de notificación (success, error, info, warning)
   * @param {number} duration - Duración en milisegundos (default: 5000)
   */
  const addNotification = (message, type = "success", duration = 5000) => {
    const id = Date.now();
    const newNotification = {
      id,
      message,
      type,
    };

    setNotifications((prev) => [...prev, newNotification]);

    // Auto-remover después del tiempo especificado
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  };

  /**
   * Remueve una notificación del stack por su ID
   * 
   * @param {number} id - ID de la notificación a remover
   */
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
