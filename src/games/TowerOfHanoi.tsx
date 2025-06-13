import { Content } from "@lunagic/prometheus";
import type { Game, Result } from "../games";

type State = number[][]

type Update = {
    SourceTower: number
    TargetTower: number
}

export class TowerOfHanoi implements Game<State, Update> {
    Title = "Tower of Hanoi"
    Slug = "tower-of-hanoi"

    public ExampleUpdate(): Update {
        return {
            SourceTower: 0,
            TargetTower: 1,
        }
    }

    public ApplyUpdate(state: State, step: Update): Result<State> {
        const diskToMove = state[step.SourceTower].shift()
        if (!diskToMove) {
            return {
                State: state,
                Message: "No disks on tower",
                Success: false,
            }
        }
        state[step.TargetTower].unshift(diskToMove)

        return {
            State: state,
            Message: "",
            Success: null,
        }
    }

    public DisplayState(state: State): preact.VNode {
        const biggestDisk = function () {
            let count = 0;
            state.forEach((tower) => {
                count += tower.length
            })

            return count
        }()

        const towerHeight = biggestDisk

        const towerWidth = function (): number {
            if (biggestDisk % 2 === 0) {
                return biggestDisk + 1 + 2
            }

            return biggestDisk + 2
        }()


        let ascii = ""
        Array.from({ length: towerHeight }).forEach((_, rowNumber) => {
            let row = ""
            state.forEach((tower) => {
                const disks: number[] = (JSON.parse(JSON.stringify(tower))).reverse()
                let disk = ``
                if (disks.length >= rowNumber + 1) {

                    let diskWidth = disks[rowNumber]
                    if (diskWidth % 2 === 0) {
                        disk += `▐${"█".repeat(diskWidth - 1)}▌`
                    } else {
                        disk += "█".repeat(diskWidth)
                    }

                    const actualDiskWidth = disk.length
                    disk = " ".repeat((towerWidth - actualDiskWidth) / 2) + disk
                    disk = disk.padEnd(towerWidth, " ")

                } else {

                    disk += " ".repeat((towerWidth - 1) / 2) + "|"
                    disk = disk.padEnd(towerWidth, " ")
                }
                row += disk
            })

            ascii = row + "\n" + ascii
        })


        return <Content>
            <pre
                style={"font-size: 2rem;"}
            >{ascii}
            </pre>
        </Content >
    }

    public InitialState(): State {
        return [
            [1, 2, 3],
            [],
            [],
        ]
    }
}
