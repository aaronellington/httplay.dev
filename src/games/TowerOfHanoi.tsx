import { Content } from "@lunagic/prometheus";
import type { Game } from "../games";

type Disk = {
    Width: number
}

type Tower = {
    Disks: Disk[]
}

type State = {
    Towers: Tower[]
}

type Update = {
    SourceTower: number
    TargetTower: number
}

export class TowerOfHanoi implements Game<State, Update> {
    Title = "Tower of Hanoi"
    Slug = "tower-of-hanoi"

    public ApplyUpdate(state: State, step: Update): State {
        const diskToMove = state.Towers[step.SourceTower].Disks.shift()
        if (!diskToMove) {
            throw "no disk to move"
        }
        state.Towers[step.TargetTower].Disks.unshift(diskToMove)

        return state
    }

    public DisplayState(state: State): preact.VNode {
        const biggestDisk = function () {
            let count = 0;
            state.Towers.forEach((tower) => {
                count += tower.Disks.length
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
            state.Towers.forEach((tower) => {
                const disks = (JSON.parse(JSON.stringify(tower.Disks))).reverse()
                let disk = ``
                if (disks.length >= rowNumber + 1) {

                    let diskWidth = disks[rowNumber].Width
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
            ascii = "\n" + row + ascii
        })


        return <Content>
            <pre
                style={"font-family: monospace; font-size: 2rem;"}
            >
                {ascii}
            </pre>
        </Content >
    }

    public InitialState(): State {
        return {
            Towers: [
                {
                    Disks: [
                        {
                            Width: 1
                        },
                        {
                            Width: 2
                        },
                        {
                            Width: 3
                        },
                        {
                            Width: 4
                        },
                    ]
                },
                {
                    Disks: []
                },
                {
                    Disks: []
                },
            ],
        }
    }
}
