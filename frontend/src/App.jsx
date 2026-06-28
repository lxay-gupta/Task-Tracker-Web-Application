import Button from './components/common/Button.jsx'
import { useNotification } from './context/NotificationContext.jsx'
import './App.css'

function App() {
  const { notify } = useNotification()

  return (
    <div className="app">
      <h1>📋 Task Tracker</h1>
      <p>Testing our reusable components!</p>

      <div style={{ marginTop: '2rem' }}>
        <h2>Buttons:</h2>
        <Button variant="primary">Primary Button</Button>
        {' '}
        <Button variant="secondary">Secondary</Button>
        {' '}
        <Button variant="success">Success</Button>
        {' '}
        <Button variant="danger">Danger</Button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Input:</h2>
        <Button variant="primary" onClick={() => {
          notify('Task created successfully!', 'success')
        }}>
          Show Success Toast
        </Button>
        {' '}
        <Button variant="danger" onClick={() => {
          notify('Failed to delete task', 'error')
        }}>
          Show Error Toast
        </Button>
        {' '}
        <Button variant="secondary" onClick={() => {
          notify('Please check your input', 'info')
        }}>
          Show Info Toast
        </Button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Loader:</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '200px' }}>
            {/* We'll just show the loader text here for now */}
            <p style={{ color: 'var(--text-muted)' }}>Loader component works! ✓</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App