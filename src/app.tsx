import { ErrorBoundary, LocationProvider, Route, Router, useRoute } from 'preact-iso'
import { PageNotFound } from './pages/PageNotFound'
import { PageGames } from './pages/PageGames'
import { PageGame } from './pages/PageGame'
import { Games } from './games'
import { PageHome } from './pages/PageHome'

export function App() {
  return <LocationProvider>
    <ErrorBoundary>
      <Router>
        <Route path="/" component={PageHome} />
        <Route path="/games" component={PageGames} />
        <Route path="/games/:slug" component={() => {
          const x = useRoute()
          const slug: string = x.params["slug"]
          const game = Games.find((game) => {
            return game.Slug === slug
          })
          if (!game) {
            return PageNotFound
          }

          return <PageGame Game={game}></PageGame>
        }} />
        <Route path="*" component={PageNotFound} />
      </Router>
    </ErrorBoundary>
  </LocationProvider >
}
