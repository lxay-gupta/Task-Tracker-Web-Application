import { useState, useEffect } from 'react'
import Header from './components/layout/Header.jsx'
import TaskForm from './components/tasks/TaskForm.jsx'
import TaskList from './components/tasks/TaskList.jsx'
import TaskFilters from './components/tasks/TaskFilters.jsx'
import Button from './components/common/Button.jsx'
import { taskAPI } from './services/api.js'
import { useNotification } from './context/NotificationContext.jsx'
import './App.css'

function App() {
  const { notify } = useNotification()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    sortBy: 'createdAt'
  })

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const params = {}
      if (filters.status !== 'all') params.status = filters.status
      if (filters.priority !== 'all') params.priority = filters.priority
      params.sortBy = filters.sortBy

      const { data } = await taskAPI.getAll(params)
      setTasks(data)
    } catch (error) {
      notify(error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [filters])

  const handleCreateTask = async (taskData) => {
    try {
      await taskAPI.create(taskData)
      notify('Task created successfully! 🎉', 'success')
      setShowForm(false)
      fetchTasks()
    } catch (error) {
      notify(error.message, 'error')
    }
  }

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

    const handleStatusChange = async (id, newStatus) => {
    // Find the full task object from our state
    const task = tasks.find(t => t._id === id)
    
    try {
      // Send the ENTIRE task object, but with the updated status
      await taskAPI.update(id, { ...task, status: newStatus })
      notify(`Task updated!`, 'success')
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

        <TaskFilters filters={filters} setFilters={setFilters} />

        <TaskList 
          tasks={tasks} 
          loading={loading}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </main>
    </div>
  )
}

export default App