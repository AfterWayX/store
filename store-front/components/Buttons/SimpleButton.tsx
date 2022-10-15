import React from 'react';

interface SimpleButtonI {
    callback: () => void;
    title: string;
    danger?: boolean;
}

export const SimpleButton = ({ callback, title, danger = false }: SimpleButtonI) => {
    return (
        <a
            className={`flex cursor-pointer text-white rounded-lg px-5 py-2 hover:bg-opacity-80 ${!danger ? 'bg-slate-500' : 'bg-red-500'}`}
            onClick={async () => {
                callback()
            }}
        >
            {title}
        </a>
    )
}