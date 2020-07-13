import React, { useEffect, useContext, useState } from 'react'


export default function ColorPicker(props) {
    const [channel, setChannel] = useContext(props.context)
    const [initialColor, setinitialColor] = useState([...channel.ledData.color])
    const canvasRef = React.useRef(null)
    const brightnessRef = React.useRef(null)

    useEffect(() => {
        drwaColorBar()
    }, [])

    function hslToRgb(h, s, l) {
        var r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            var hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }


    function drwaColorBar() {
        var canvas = canvasRef.current
        var ctx = canvas.getContext('2d');
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;

        var cWidth = imageData.width
        var cHeight = imageData.height
        var hCnt = 0
        var pointer = 0

        for (var d = 0; d < cHeight; d++) {
            hCnt = 0
            for (var i = 0; i < (cWidth * 4); i += 4) {

                var RedGreenBlue = hslToRgb((hCnt / cWidth), 1, .5)

                data[pointer] = RedGreenBlue[0];     // red
                data[pointer + 1] = RedGreenBlue[1]; // green
                data[pointer + 2] = RedGreenBlue[2]; // blue
                data[pointer + 3] = 255; // blue
                pointer = (pointer + 4)
                hCnt++
            }
        }

        ctx.putImageData(imageData, 0, 0);



        canvas = brightnessRef.current
        ctx = canvas.getContext('2d');
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        data = imageData.data;

        cWidth = imageData.width
        cHeight = imageData.height
        hCnt = 0
        pointer = 0

        for (d = 0; d < cHeight; d++) {
            hCnt = 0
            for (i = 0; i < (cWidth * 4); i += 4) {

                RedGreenBlue = hslToRgb(0, 0, (hCnt / cWidth))

                data[pointer] = RedGreenBlue[0];     // red
                data[pointer + 1] = RedGreenBlue[1]; // green
                data[pointer + 2] = RedGreenBlue[2]; // blue
                data[pointer + 3] = 255; // blue
                pointer = (pointer + 4)
                hCnt++
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    const hueChange = (e) => {
        console.log('Hue Change')
        let tempChannel = { ...channel }
        tempChannel.ledData.color[0] = e.target.value
        setChannel(tempChannel)
    }

    const brightnessChange = (e) => {
        console.log('Brightness Change')
        let tempChannel = { ...channel }
        tempChannel.ledData.color[2] = e.target.value
        setChannel(tempChannel)
    }

    const apply = () => {
        props.close()
    }

    const cancel = () => {
        let tempChannel = { ...channel }
        tempChannel.ledData.color = initialColor
        setChannel(tempChannel)
        props.close()
    }

    return (
        <>
            <div>
                <b>Hue</b>
                <div>
                    <canvas
                        ref={canvasRef}
                        style={{
                            width: '100%',
                            height: '10px',
                            borderRadius: '3px'
                        }}
                    />
                </div>
                <div>
                    <input
                        type="range"
                        max="360"
                        min="0"
                        value={channel.ledData.color[0]}
                        onChange={hueChange}
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
            <hr />
            <div>
                <b>Brightness</b>
                <div>
                    <canvas
                        ref={brightnessRef}
                        style={{
                            width: '100%',
                            height: '10px',
                            borderRadius: '3px'
                        }}
                    />
                </div>
                <div>
                    <input
                        type="range"
                        max="50"
                        min="0"
                        value={channel.ledData.color[2]}
                        onChange={brightnessChange}
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
            <hr />
            <div>
                <button onMouseDown={apply}>Apply</button>
                <button onMouseDown={cancel}>Cancel</button>
            </div>
        </>
    )



}
