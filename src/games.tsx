import { TicTacToe } from "./games/TicTacToe"
import { TowerOfHanoi } from "./games/TowerOfHanoi"

export type Result<State> = {
    State: State
    Success: boolean | null
    Message: string
}

export type History<State, Step> = {
    Steps: (Turn<Step> | string)[]
    Result: Result<State>
}

export type Actor = "Player" | "Computer"

export type Turn<Step> = {
    Actor: Actor
    TimeStamp: string
    Step: Step
}

export interface Game<State, Step> {
    Title: string,
    Slug: string,
    ApplyUpdate(actor: Actor, state: State, step: Step): Result<State>
    DisplayState(state: State): preact.VNode
    InitialState(): State
    ExampleUpdate(): Step
    Response(state: State): Step | null
}

export const Games: Game<any, any>[] = [
    new TicTacToe,
    new TowerOfHanoi,
]
