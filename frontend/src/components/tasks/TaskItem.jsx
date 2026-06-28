import Button from '../common/Button.jsx'

const TaskItem = ({ task, onDelete, onToggleComplete }) => {
  // Helper to format the date nicely
  const formatDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className={`task-item priority-${task.priority}`}>
      <div className="task-header">
        <span className={`badge priority-badge priority-${task.priority}`}>
          {task.priority.toUpperCase()}
        </span>
        <span className={`badge status-badge status-${task.status}`}>
          {task.status}
        </span>
      </div>

      <div className="task-body">
        <h4 className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
          {task.title}
        </h4>
        {task.description && <p className="task-description">{task.description}</p>}
        {task.dueDate && (
          <p className="task-due">📅 Due: {formatDate(task.dueDate)}</p>
        )}
      </div>

      <div className="task-actions">
        <Button 
          variant={task.status === 'completed' ? 'secondary' : 'success'} 
          size="sm"
          onClick={() => onToggleComplete(task._id)}
        >
          {task.status === 'completed' ? 'Undo' : '✓ Complete'}
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(task._id)}>
          Delete
        </Button>
      </div>
    </div>
  )
}

export default TaskItem