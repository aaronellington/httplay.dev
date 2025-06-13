import { Content } from "@lunagic/prometheus";
import type { Game, Result } from "../games";


type State = string[][]

type Update = {
    X: number
    Y: number
}


export class TicTacToe implements Game<State, Update> {
    Title = "Tic Tac Toe"
    Slug = "tic-tac-toe"

    public ExampleUpdate(): Update {
        return {
            X: 0,
            Y: 2,
        }
    }

    public ApplyUpdate(state: State, step: Update): Result<State> {
        if (state[step.X][step.Y] !== " ") {
            throw "invalid move"
        }

        state[step.X][step.Y] = "○"

        return {
            Success: null,
            Message: "",
            State: state,
        }
    }

    public DisplayState(state: State): preact.VNode {
        let ascii = ""

        state.forEach((columns, row) => {
            if (row !== 0) {
                ascii += "\n━━━╋━━━╋━━━\n"
            } else {
            }

            columns.forEach((value, index) => {
                if (index !== 0) {
                    ascii += ` ┃ ${value}`
                } else {
                    ascii += ` ${value}`
                }
            })

        })
        return <Content>
            <pre
                style={"font-size: 2rem;"}
            >
                {ascii}
            </pre>
        </Content>
    }

    public InitialState(): State {
        return [
            [" ", " ", " "],
            [" ", "×", " "],
            [" ", " ", " "],
        ]
    }
}
