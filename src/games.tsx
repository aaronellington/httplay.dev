import { TicTacToe } from "./games/TicTacToe"
import { TowersOfHanoi } from "./games/TowersOfHanoi"

export interface Game {
    Slug: string,
}

export const Games: Game[] = [
    new TicTacToe,
    new TowersOfHanoi,
]
