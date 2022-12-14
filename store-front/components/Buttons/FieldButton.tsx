import React, { useState } from "react";
interface FieldButtonI {
    callback: (
        data: string | number,
        state: string) => void;
    title: string;
    field: string;
    active?: boolean;
}

export const FieldButton = ({ callback, title, field, active = false }: FieldButtonI) => {
    const [activeState, setActive] = useState(active)
    const handleClick = async () => (
        setActive(!activeState),
        callback(title, field)
    )
    return (
        <a
            className={`flex min-w-max text-sm font-medium p-1 ${activeState ? 'underline font-bold' : ''}`}
            onClick={handleClick}
        >
            {title}
        </a >
    )
}