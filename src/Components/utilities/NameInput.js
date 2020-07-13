import React, { useState, useEffect } from 'react'

export default function NameInput(props) {
    const [over, setover] = useState(false)
    const [focus, setfocus] = useState(false)

    var inStyle = {
        textAlign: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        padding: '3px 3px',
        borderRadius: '3px'
    }

    useEffect(() => {
        if (over) {
            setover(true)
        } else {
            setover(false)
        }
    }, [over])

    useEffect(() => {
        if (focus) {
            setfocus(true)
        } else {
            setfocus(false)
        }
    }, [focus])

    function handelEvent(e) {

        switch (e.type) {
            case 'change':
                props.setValue(e.target.value)
                break;

            case 'focus':
                setfocus(true)
                break;

            case 'blur':
                setfocus(false)
                break;

            case 'mouseover':
                setover(true)
                break;

            case 'mouseout':
                setover(false)
                break;

            default:
                break;
        }
    }

    if (over) {
        inStyle.border = '1px lightgrey solid'
        inStyle.padding = '2px 2px'
    }

    if (focus) {
        inStyle.backgroundColor = 'white'
    }

    return (
        <div>
            <input
                type="text"
                value={props.value}
                onMouseOver={handelEvent}
                onMouseOut={handelEvent}
                onChange={handelEvent}
                onFocus={handelEvent}
                onBlur={handelEvent}
                style={inStyle}
            />
        </div>
    )
}
