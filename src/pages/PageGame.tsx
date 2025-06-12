import { Box, Button, Content, FormInput, Panel } from "@lunagic/prometheus"
import type { Game } from "../games"
import { Link } from "../link"
import classes from "./PageGame.module.scss"
import { useState } from "preact/hooks"

export type GameProps = {
    Game: Game<any, any>
}

export function PageGame(props: GameProps) {
    const [output, setOutput] = useState<string | null>(null)
    const [gameState, setGameState] = useState(props.Game.InitialState());
    const [endpoint, setEndpoint] = useState(`http://127.0.0.1:2690/${props.Game.Slug}`)

    return (
        <div className={classes.main}>
            <div className={classes.top}>
                <Box>
                    <Content>
                        <h1>HTTPlay.dev - {props.Game.Title}</h1>
                    </Content>
                </Box>
            </div>
            <div className={classes.middle}>
                <Box className={classes.left}>
                    <Content>
                        <FormInput type="text" value={endpoint} setValue={setEndpoint}>App Endpoint</FormInput>
                        <Panel centered>
                            <Button onClick={async () => {
                                try {
                                    const response = await fetch(endpoint, {
                                        method: "POST",
                                        body: JSON.stringify(gameState),
                                    })
                                    try {
                                        const update = await response.json()
                                        setOutput(JSON.stringify(update, null, 4))
                                        try {
                                            const newState = props.Game.ApplyUpdate(JSON.parse(JSON.stringify(gameState)), update)
                                            setGameState(newState)
                                        } catch (e: any) {
                                            setOutput(e)
                                        }
                                    } catch (e) {
                                        setOutput("json parse failed")
                                    }
                                } catch (e: any) {
                                    setOutput("Failed to connect")
                                }
                            }}>Run</Button>
                            <Button onClick={() => { }}>Step</Button>
                            <Button onClick={() => {
                                setGameState(props.Game.InitialState())
                                setOutput(null)
                            }}>Reset</Button>
                        </Panel>
                        <Content>
                            <h1>Output:</h1>
                            <pre>
                                {output}
                            </pre>
                        </Content>
                    </Content>
                </Box>
                {/* <Box className={classes.right}> */}
                <Panel direction="vertical" className={classes.right}>
                    <Box>
                        <Content>
                            <p>
                                Game
                            </p>
                            <hr />
                            {props.Game.DisplayState(gameState)}

                        </Content>
                    </Box>
                    <Box>
                        <Content>
                            <p>
                                Game State
                            </p>
                            <hr />
                            <pre>
                                {JSON.stringify(gameState, null, 4)}
                            </pre>
                        </Content>
                    </Box>
                </Panel>
                {/* </Box> */}
            </div>
            <div className={classes.bottom}>
                <Box className={classes.right}>
                    <Link href="/games">Go Back</Link>

                </Box>
            </div>
        </div>
    )
}
