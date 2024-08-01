import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { WsClient } from './service/websocket'

function App() {
  const [count, setCount] = useState(0)


  const websockeConnect = () => {
    const liveId = "asfdsfsf5sf5s5f5sd5fs5f"
    const socket = new WsClient("http://localhost:9000/ws", liveId)
    socket.connect(update)
  }

  const update = (message: any) => {
    console.log('Message received: ' + message?.body);
  }

  websockeConnect()



  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
