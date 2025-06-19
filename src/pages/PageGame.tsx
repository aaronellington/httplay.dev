import { Box, Button, Content, FormInput, Panel } from "@lunagic/prometheus"
import type { Game, History } from "../games"
import { Link } from "../link"
import classes from "./PageGame.module.scss"
import { useCallback, useEffect, useRef, useState, type Dispatch, type StateUpdater } from "preact/hooks"

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

    useEffect(() => {
        setHistory({
            Result: {
                Success: null,
                Message: "",
                State: props.Game.InitialState(),
            },
            Steps: [],
        })
    }, [])

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
                <div className={classes.right}>
                    <Box>
                        <SectionVisualization {...subProps} />
                    </Box>
                    <Box className={classes.scrollChild}>
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
                let result = props.Game.ApplyUpdate("Player", tmpHistory.Result.State, update)
                tmpHistory.Steps.unshift({
                    Actor: "Player",
                    TimeStamp: new Date().toISOString(),
                    Step: update,
                })

                if (result.Success === null) {
                    const computerMove = props.Game.Response(result.State)
                    if (computerMove) {
                        result = props.Game.ApplyUpdate("Computer", tmpHistory.Result.State, computerMove)
                        tmpHistory.Steps.unshift({
                            Actor: "Computer",
                            TimeStamp: new Date().toISOString(),
                            Step: computerMove,
                        })
                    }
                }
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
            <Button disabled={props.history.Result.Success !== null} onClick={() => {
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
            <p>
                {props.history.Result.Message}
            </p>
        </Panel>
    </Content>
}

const useAutosizeTextArea = (
    textAreaRef: HTMLTextAreaElement | null,
    value: string
) => {
    const x = useCallback((textAreaRef: HTMLTextAreaElement | null) => {
        if (textAreaRef !== null) {
            textAreaRef.style.height = "0px";
            const scrollHeight = textAreaRef.scrollHeight;
            textAreaRef.style.height = scrollHeight + "px";
        }
    }, []);

    useEffect(() => {
        x(textAreaRef)
    }, [textAreaRef, value]);
};

function SectionGameState<State, Update>(props: SubProps<State, Update>) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useAutosizeTextArea(textAreaRef.current, JSON.stringify(props.history.Result, null, 4));

    return <Content>
        <p>
            Current Game State
        </p>
        <hr />
        <textarea
            ref={textAreaRef}

            style="font-family: monospace;padding: 1rem;" value={JSON.stringify(props.history.Result.State, null, 4)} onKeyUp={(event: any) => {

                try {
                    const x = JSON.parse(JSON.stringify(props.history)) as History<State, Update>
                    x.Result.State = JSON.parse(event?.target.value)
                    props.setHistory(x)
                } catch { }
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
