import React, { Component } from 'react'

export class download extends Component {

    componentDidMount() {
        c = document.getElementById("myCanvas");
        ctx = c.getContext("2d");
        timer = setInterval(drawProgress, 50)
    }



    render() {
        return (
            <div style={{ textAlign: 'left', textIndent: '5px' }}>
                Download: <canvas id="myCanvas" width="100" height="4" style={{ border: '1px black solid' }}>
                </canvas>
                <div id="port-list"></div>
            </div>
        )
    }
}

let c
let ctx
let place = 0
let timer

function drawProgress() {

    if (place > (c.width)) {
        place = 0
        clearInterval(timer)
        console.log('Download Complete')
    } else {
        ctx.moveTo(place, 0);
        ctx.lineTo(place, 4);
        ctx.stroke();
    }

    place++
}

export default download
