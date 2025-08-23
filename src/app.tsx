import {
	ErrorBoundary,
	LocationProvider,
	Route,
	Router,
	useRoute,
} from "preact-iso"
import { Games } from "./games"
import { PageGame } from "./pages/PageGame"
import { PageGames } from "./pages/PageGames"
import { PageHome } from "./pages/PageHome"
import { PageNotFound } from "./pages/PageNotFound"

export function App() {
	return (
		<LocationProvider>
			<ErrorBoundary>
				<Router>
					<Route component={PageHome} path="/" />
					<Route component={PageGames} path="/games" />
					<Route
						component={() => {
							const x = useRoute()
							const slug: string = x.params.slug
							const game = Games.find((game) => {
								return game.Slug === slug
							})
							if (!game) {
								return PageNotFound
							}

							return <PageGame Game={game}></PageGame>
						}}
						path="/games/:slug"
					/>
					<Route component={PageNotFound} path="*" />
				</Router>
			</ErrorBoundary>
		</LocationProvider>
	)
}
