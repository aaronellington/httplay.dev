import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'

export function App() {
  const [serverAddress, setServerAddress] = useState('http://localhost:2291')
  const [serverResult, setServerResult] = useState('')

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} class="logo preact" alt="Preact logo" />
        </a>
      </div>
      <h1>Vite + Preact</h1>
      <div class="card">
        <div>

          <label >
            Server Address:
            <input onChange={(e) => {
              setServerAddress((e.target as any).value ?? '')
            }} value={serverAddress} />
          </label>
        </div>
        <button onClick={() => {
          fetch(serverAddress).then((response) => {
            return response.text()
          }).then(text => {
            setServerResult(text)
          }).catch(e => {
            setServerResult('error, check the web console')
            console.error(e)
          })
        }
        }>
          Server Result: {serverResult}
        </button>
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>
      <p>
        Check out{' '}
        <a
          href="https://preactjs.com/guide/v10/getting-started#create-a-vite-powered-preact-app"
          target="_blank"
        >
          create-preact
        </a>
        , the official Preact + Vite starter
      </p>
      <p class="read-the-docs">
        Click on the Vite and Preact logos to learn more
      </p>
    </>
  )
}
