import { FC, useEffect, useRef } from 'react'

const getCenter = (pathData: any) => {
    // Parse the path data to extract the individual commands and coordinates
    const pathCommands = pathData.match(/[a-df-zA-DF-Z][^a-df-zA-DF-Z]*/g)

// Initialize variables to keep track of the bounding box
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity

    for (const command of pathCommands) {
        const commandType = command[0]
        const commandArgs = command.slice(1).split(',').map(parseFloat)

        if (commandType === 'M' || commandType === 'L') {
            const x = commandArgs[0]
            const y = commandArgs[1]
            minX = Math.min(minX, x)
            minY = Math.min(minY, y)
            maxX = Math.max(maxX, x)
            maxY = Math.max(maxY, y)
        } else if (commandType === 'H') {
            const x = commandArgs[0]
            minX = Math.min(minX, x)
            maxX = Math.max(maxX, x)
        }
    }

// Calculate the center of the bounding box
    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2
}

const getSvgElementCenter = (el: SVGGraphicsElement) => {
    const { x, y, width, height } = el.getBBox()

    return { x: x + width / 2, y: y + height / 2 }
}


export const PathWrapper = ({ id }: { id: string }) => {

    useEffect(() => {
        const ref: SVGPathElement | null = document.getElementById(id)
        if (!ref) return

        const cont = document.getElementById('#Meeting_Rooms')
        console.log(getSvgElementCenter(ref))
    }, [id])


    return <></>
}