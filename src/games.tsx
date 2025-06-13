import { TicTacToe } from "./games/TicTacToe"
import { TowerOfHanoi } from "./games/TowerOfHanoi"

export type Result<State> = {
    State: State
    Success: boolean | null
    Message: string
}

export type History<State, Step> = {
    Steps: Turn<Step>[]
    Result: Result<State>
}

export type Turn<Step> = {
    Actor: "Player" | "Computer"
    TimeStamp: string
    Step: Step
}

export interface Game<State, Step> {
    Title: string,
    Slug: string,
    ApplyUpdate(state: State, step: Step): Result<State>
    DisplayState(state: State): preact.VNode
    InitialState(): State
    ExampleUpdate(): Step
}

export const Games: Game<any, any>[] = [
    new TicTacToe,
    new TowerOfHanoi,
]
