import { useState } from 'preact/hooks'
import './app.css'

export function App() {
  const [serverAddress, setServerAddress] = useState('http://localhost:2291')
  const [serverResult, setServerResult] = useState<string | null>(null)

  return (
    <>
      <div class="card">
        <h1>HTTPlay.dev</h1>
        <div>
          <label >
            Server Address:
          </label>
          <div>

            <input onChange={(e) => {
              setServerAddress((e.target as any).value ?? '')
            }} value={serverAddress} />
          </div>
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
          Refresh
        </button>
        <div>
          Server Result:
          <pre>
            {JSON.stringify(serverResult)}
          </pre>
        </div>
      </div>
    </>
  )
}
