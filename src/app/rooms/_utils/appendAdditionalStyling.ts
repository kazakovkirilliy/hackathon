import { Room } from '~/app/types'

const getSvgElementCenter = (el: SVGGraphicsElement) => {
    const { x, y, width, height } = el.getBBox()
    return { x: x + width / 2, y: y + height / 2 }
}

export const appendAdditionalStyling = (room: any) => {
    const pathEl = document.getElementById(room.id) as SVGPathElement | null
    if (!pathEl) return

    pathEl.setAttribute('fill', room.isAvailable ? '#22c55e' : '#dc2626')
}
