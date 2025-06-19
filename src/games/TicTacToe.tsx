import { Content } from "@lunagic/prometheus";
import type { Actor, Game, Result } from "../games";


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

    public ApplyUpdate(actor: Actor, state: State, step: Update): Result<State> {
        if (state[step.X][step.Y] !== " ") {
            throw "invalid move"
        }


        let icon = "×"
        if (actor === "Computer") {
            icon = "○"
        }

        state[step.X][step.Y] = icon

        let emptySpots = 0
        state.forEach((row) => {
            row.forEach((cell) => {
                if (cell === " ") {
                    emptySpots++
                }
            })
        })
        if (emptySpots === 0) {
            return {
                Success: false,
                Message: "a cat (tie/no winner)",
                State: state,
            }
        }

        let success: boolean | null = null
        let message: string = ""

        { // check for win conditions
            const winConditions: Update[][] = [
                [{ X: 0, Y: 0 }, { X: 0, Y: 1 }, { X: 0, Y: 2 }], // Down left
                [{ X: 1, Y: 0 }, { X: 1, Y: 1 }, { X: 1, Y: 2 }], // Down Center
                [{ X: 2, Y: 0 }, { X: 2, Y: 1 }, { X: 2, Y: 2 }], // Down Right
                [{ X: 0, Y: 0 }, { X: 1, Y: 0 }, { X: 2, Y: 0 }], // Across Top
                [{ X: 0, Y: 1 }, { X: 1, Y: 1 }, { X: 2, Y: 1 }], // Across Middle
                [{ X: 0, Y: 2 }, { X: 1, Y: 2 }, { X: 2, Y: 2 }], // Across Bottom
                [{ X: 0, Y: 0 }, { X: 1, Y: 1 }, { X: 2, Y: 2 }], // Diagonal Down
                [{ X: 0, Y: 2 }, { X: 1, Y: 1 }, { X: 2, Y: 0 }], // Diagonal Up
            ]

            const actorIcons: string[] = ["×", "○"]

            actorIcons.forEach((actorIcon) => {
                winConditions.forEach(winCondition => {
                    let iconCount = 0
                    winCondition.forEach(cell => {
                        if (state[cell.X][cell.Y] === actorIcon) {
                            iconCount++
                        }

                    })

                    if (iconCount === 3) {
                        if (actorIcon == "×") {
                            success = true
                            message = "you win"
                        } else {
                            success = false
                            message = "you lose"
                        }
                    }
                })
            })
        }

        return {
            Success: success,
            Message: message,
            State: state,
        }
    }

    public Response(state: State): Update | null {
        const possibleMoves: Update[] = [];
        Array.from({ length: 3 }, (_, x) => {
            Array.from({ length: 3 }, (_, y) => {
                if (state[x][y] !== " ") {
                    return;
                }

                possibleMoves.push({
                    X: x,
                    Y: y,
                })
            })
        })

        if (!possibleMoves.length) {
            return null
        }

        return possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
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
            [" ", " ", " "],
            [" ", " ", " "],
        ]
    }
}
