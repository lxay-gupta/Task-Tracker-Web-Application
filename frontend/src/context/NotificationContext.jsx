import { createContext, useContext, useState, useCallback } from 'react'
import Toast from '../components/notifications/Toast.jsx'

const NotificationContext = createContext()

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const notify = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setNotifications((prev) => [...prev, { id, message, type }])
    
    // Automatically remove the notification after 3.5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 3500)
  }, [])

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="toast-container">
        {notifications.map((n) => (
          <Toast
            key={n.id}
            message={n.message}
            type={n.type}
            onClose={() => removeNotification(n.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  )
}