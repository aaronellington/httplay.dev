import { Box, Button, Content, FormInput, Panel } from "@lunagic/prometheus"
import type { Game, History } from "../games"
import { Link } from "../link"
import classes from "./PageGame.module.scss"
import { useState, type Dispatch, type StateUpdater } from "preact/hooks"

export type GameProps<State, Update> = {
    Game: Game<State, Update>
}

export function PageGame<State, Update>(props: GameProps<State, Update>) {
    const [endpoint, setEndpoint] = useState(`http://127.0.0.1:2690/${props.Game.Slug}`)

    const [history, setHistory] = useState<History<State, Update>>({
        Result: {
            Success: null,
            Message: "",
            State: props.Game.InitialState(),
        },
        Steps: [],
    })

    const subProps: SubProps<State, Update> = {
        Game: props.Game,
        endpoint: endpoint,
        setEndpoint: setEndpoint,
        history: history,
        setHistory: setHistory,
    }

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
                <div className={classes.left} >
                    <Box>
                        <SectionConfig {...subProps} />
                    </Box >
                    <Box className={classes.scrollChild}>
                        <SectionFeed {...subProps} />
                    </Box >
                </div>
                <div className={classes.center}>
                    <Box>
                        <SectionVisualization {...subProps} />
                    </Box>
                    <Box >
                        <SectionGameState {...subProps} />
                    </Box>
                    <Box className={classes.scrollChild}>
                        <SectionInstructions {...subProps} />
                    </Box>
                </div>
            </div>
            <div className={classes.bottom}>
                <Box className={classes.right}>
                    <Link href="/games">Go Back</Link>
                </Box>
            </div>
        </div>
    )
}

type SubProps<State, Update> = GameProps<State, Update> & {
    history: History<State, Update>
    setHistory: Dispatch<StateUpdater<History<State, Update>>>
    endpoint: string
    setEndpoint: Dispatch<StateUpdater<string>>
}

function SectionInstructions<State, Update>(props: SubProps<State, Update>) {
    return <Content>
        <p>
            Example Response
        </p>
        <hr />
        <pre>
            {JSON.stringify(props.Game.ExampleUpdate(), null, 4)}
        </pre>
    </Content>
}

function SectionConfig<State, Update>(props: SubProps<State, Update>) {
    const runStep = async function () {
        try {
            const response = await fetch(props.endpoint, {
                method: "POST",
                body: JSON.stringify(props.history.Result.State),
            })
            try {
                const update = await response.json() as Update
                const tmpHistory = JSON.parse(JSON.stringify(props.history)) as History<State, Update>
                const result = props.Game.ApplyUpdate(tmpHistory.Result.State, update)
                tmpHistory.Steps.unshift({
                    Actor: "Player",
                    TimeStamp: new Date().toISOString(),
                    Step: update,
                })
                tmpHistory.Result = result
                props.setHistory(tmpHistory)
                return tmpHistory

            } catch (e) {
                console.error(e)
            }
        } catch (e: any) {
            console.error(e)
        }
    }
    return <Content>
        <p>Config:</p>
        <hr />
        <FormInput type="text" value={props.endpoint} setValue={props.setEndpoint}>App Endpoint</FormInput>
        <Panel centered>
            <Button onClick={() => {
                runStep()
            }}>Step</Button>
            <Button onClick={() => {
                props.setHistory({
                    Result: {
                        Success: null,
                        Message: "",
                        State: props.Game.InitialState(),
                    },
                    Steps: [],
                })
            }}>Reset</Button>
        </Panel>
    </Content>
}

function SectionGameState<State, Update>(props: SubProps<State, Update>) {
    return <Content>
        <p>
            Current Game State
        </p>
        <hr />
        <textarea style="font-family: monospace; field-sizing: content;width: 100%;" value={JSON.stringify(props.history.Result.State, null, 4)} onChange={(event: any) => {
            const x = JSON.parse(JSON.stringify(props.history)) as History<State, Update>
            x.Result.State = JSON.parse(event?.target.value)
            props.setHistory(x)
        }} />
    </Content>
}

function SectionFeed<State, Update>(props: SubProps<State, Update>) {
    return <Content>
        <p>Event Feed:</p>
        <hr />
        {props.history.Steps.map((x) => {
            return <pre>
                {JSON.stringify(x, null, 4)}
            </pre>
        })}
    </Content>
}

function SectionVisualization<State, Update>(props: SubProps<State, Update>) {
    return <Content>
        <p>
            State Visualization
        </p>
        <hr />
        {props.Game.DisplayState(props.history.Result.State)}
    </Content>
}
