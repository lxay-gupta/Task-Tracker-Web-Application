import { useState, useEffect } from 'react'
import Header from './components/layout/Header.jsx'
import TaskForm from './components/tasks/TaskForm.jsx'
import TaskList from './components/tasks/TaskList.jsx'
import Button from './components/common/Button.jsx'
import { taskAPI } from './services/api.js'
import { useNotification } from './context/NotificationContext.jsx'
import './App.css'

function App() {
  const { notify } = useNotification()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  // 1. Fetch tasks when the app loads
  const fetchTasks = async () => {
    try {
      setLoading(true)
      const { data } = await taskAPI.getAll()
      setTasks(data)
    } catch (error) {
      notify(error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // 2. Create a new task
  const handleCreateTask = async (taskData) => {
    try {
      await taskAPI.create(taskData)
      notify('Task created successfully! ', 'success')
      setShowForm(false)
      fetchTasks() // Refresh the list
    } catch (error) {
      notify(error.message, 'error')
    }
  }

  // 3. Delete a task
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    
    try {
      await taskAPI.delete(id)
      notify('Task deleted', 'info')
      fetchTasks()
    } catch (error) {
      notify(error.message, 'error')
    }
  }

  // 4. Toggle task completion
  const handleToggleComplete = async (id) => {
    const task = tasks.find(t => t._id === id)
    const newStatus = task.status === 'completed' ? 'pending' : 'completed'
    
    try {
      await taskAPI.update(id, { ...task, status: newStatus })
      notify(newStatus === 'completed' ? 'Task completed! ' : 'Task reopened', 'success')
      fetchTasks()
    } catch (error) {
      notify(error.message, 'error')
    }
  }

  return (
    <div className="app">
      <Header />

      <main className="container">
        {!showForm && (
          <Button variant="primary" onClick={() => setShowForm(true)}>
            ➕ Add New Task
          </Button>
        )}

        {showForm && (
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
          />
        )}

        <TaskList 
          tasks={tasks} 
          loading={loading}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
        />
      </main>
    </div>
  )
}

export default App