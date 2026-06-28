const TaskFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="task-filters">
      <div className="filter-group">
        <label htmlFor="status" className="filter-label">Status:</label>
        <select 
          id="status" 
          name="status" 
          value={filters.status} 
          onChange={handleChange}
          className="form-control filter-select"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="priority" className="filter-label">Priority:</label>
        <select 
          id="priority" 
          name="priority" 
          value={filters.priority} 
          onChange={handleChange}
          className="form-control filter-select"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sortBy" className="filter-label">Sort By:</label>
        <select 
          id="sortBy" 
          name="sortBy" 
          value={filters.sortBy} 
          onChange={handleChange}
          className="form-control filter-select"
        >
          <option value="createdAt">Newest First</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>
    </div>
  )
}

export default TaskFilters