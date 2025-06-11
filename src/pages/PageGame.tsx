import { Box, Content, FullPageMessage } from "@lunagic/prometheus"
import type { Game } from "../games"
import { Link } from "../link"

export type GameProps = {
    Game: Game
}

export function PageGame(props: GameProps) {
    return (
        <FullPageMessage>
            <Box>
                <Content>
                    <h1>
                        HTTPlay.dev
                    </h1>
                    <h2>
                        {props.Game.Slug}
                    </h2>
                    <p>
                        <Link href="/games">Go Back</Link>
                    </p>
                </Content>
            </Box>
        </FullPageMessage>
    )
}
