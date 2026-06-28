import Button from './components/common/Button.jsx'
import Input from './components/common/Input.jsx'
import Loader from './components/common/Loader.jsx'
import './App.css'

function App() {
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
        <Input label="Task Title" placeholder="Enter task title..." />
        <br />
        <Input label="With Error" error="This field is required" />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Loader:</h2>
        <Loader text="Loading tasks..." />
      </div>
    </div>
  )
}

export default App