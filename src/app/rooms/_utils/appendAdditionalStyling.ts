import { Room } from '~/app/types'

const getSvgElementCenter = (el: SVGGraphicsElement) => {
    const { x, y, width, height } = el.getBBox()
    return { x: x + width / 2, y: y + height / 2 }
}

export const appendAdditionalStyling = (room: Room) => {
    const pathEl = document.getElementById(room.id) as SVGPathElement | null
    if (!pathEl) return

    const container = document.getElementById('Meeting_Rooms')
    const labelId = `${room.id}-label`
    const existingLabel = document.querySelector(`#${labelId}`)
    const { x, y } = getSvgElementCenter(pathEl)

    // Create or reuse the label element
    const label = existingLabel || document.createElementNS('http://www.w3.org/2000/svg', 'text')

    // Set common attributes for both new and existing labels
    label.textContent = room.isAvailable ? '✓' : '✕'
    label.setAttribute('id', room.id + ' ' + Math.random().toString())
    label.setAttribute('x', x.toString())
    label.setAttribute('y', y.toString())
    label.setAttribute('fill', 'white')
    label.setAttribute('stroke', 'white')
    label.setAttribute('stroke-width', '3')
    label.setAttribute('font-size', '4em')
    label.setAttribute('font-weight', 'medium')

    // Clear previous classes if the label already exists
    if (existingLabel) {
        label.classList.value = ''
    }

    // Set the path element's fill color based on room availability
    pathEl.setAttribute('fill', room.isAvailable ? '#22c55e' : '#dc2626')

    // Append the label to the container
    container?.appendChild(label)
}
