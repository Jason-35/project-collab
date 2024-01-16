import { useState } from "react"

export const useOpen = () => {
    const [open, setOpen] = useState(false)

    const opening = () => {
        setOpen(true)
    }

    const closing = () => {
        setOpen(false)
    }

    return {open, opening, closing}
}