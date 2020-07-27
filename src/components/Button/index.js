import React from 'react'

import './style.css'

export default function Button({ text, fnOnclick }) {
    return (
        <button className="btn-primary" type="button" onClick={fnOnclick}>
            {text}
        </button>
    )
}
