import { render } from 'preact'
import { App } from './app.tsx'
import "../node_modules/@lunagic/prometheus/src/styles/index.scss"

render(<App />, document.getElementById('app')!)
