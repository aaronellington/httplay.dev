import { Box, Content, FullPageMessage } from "@lunagic/prometheus";
import { Games } from "../games";
import { Link } from "../link";

export function PageGames() {
    return (
        <FullPageMessage>
            <Box>
                <Content>
                    <h1>
                        HTTPlay.dev
                    </h1>
                    <h2>
                        Games
                    </h2>
                    <ul>
                        {Games.map((game) => {
                            return <li>
                                <Link href={`/games/${game.Slug}`}>{game.Title}</Link>
                            </li>
                        })}
                    </ul>
                    <p>
                        <Link href="/">Go Home</Link>
                    </p>
                </Content>
            </Box>
        </FullPageMessage>
    )
}
