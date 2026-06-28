import TaskItem from './TaskItem.jsx'
import Loader from '../common/Loader.jsx'

const TaskList = ({ tasks, loading, onDelete, onStatusChange }) => {
  if (loading) return <Loader text="Loading tasks..." />

  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h3>No tasks found</h3>
        <p>Create your first task to get started!</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  )
}

export default TaskList