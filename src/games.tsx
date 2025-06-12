import { TicTacToe } from "./games/TicTacToe"
import { TowerOfHanoi } from "./games/TowerOfHanoi"

export interface Game<State, Step> {
    Title: string,
    Slug: string,
    ApplyUpdate(state: State, step: Step): State
    DisplayState(state: State): preact.VNode
    InitialState(): State
}

export const Games: Game<any, any>[] = [
    new TicTacToe,
    new TowerOfHanoi,
]
