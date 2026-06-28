const API_URL = 'https://task-tracker-web-application-ycq0.onrender.com/api'

const handleResponse = async (response) => {
  const data = await response.json()
  if (!response.ok) {
    let errorMessage = 'Something went wrong'
    if (data.errors && Array.isArray(data.errors)) {
      errorMessage = data.errors.map((e) => e.msg).join(', ')
    } else if (data.message) {
      errorMessage = data.message
    }
    throw new Error(errorMessage)
  }
  return data
}

export const taskAPI = {
  getAll: async (params = {}) => {

    // Convert the params object into a URL query string
    // e.g., { status: 'pending', priority: 'high' } becomes ?status=pending&priority=high
    const queryString = new URLSearchParams(params).toString()
    const url = `${API_URL}/tasks${queryString ? `?${queryString}` : ''}`
    
    const response = await fetch(url)
    return handleResponse(response)
    
  },

  create: async (taskData) => {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    })
    return handleResponse(response)
  },

  update: async (id, taskData) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    })
    return handleResponse(response)
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    })
    return handleResponse(response)
  },
}