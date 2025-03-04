import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RelaxClock from './RelaxClock'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <RelaxClock/>
    </div>
    </>
  )
}

export default App
