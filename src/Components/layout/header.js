import React from 'react';
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header style={headerStyle}>
            <h2>Config Application</h2>
            <Link to="/" style={linkStyle}>Home</Link> |
            <Link to="/midiLight" style={linkStyle}> MIDI Light</Link> |
            <Link to="/midiGpio" style={linkStyle}> MIDI GPIO</Link> |
            <Link to="/midiButton" style={linkStyle}> MIDI Button</Link> |
            <Link to="/mtcDisplay" style={linkStyle}> MTC Display</Link> |
            <Link to="/midiAB" style={linkStyle}> MIDI A/B</Link> |
            <Link to="/about" style={linkStyle}> About</Link>
        </header>
    )
}

const headerStyle = {
    background: '#333',
    color: 'white',
    textAlign: 'center',
    paddingBottom: '10px'
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

export default Header;