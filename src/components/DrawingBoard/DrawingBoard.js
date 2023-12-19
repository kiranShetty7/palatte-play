import { useEffect, useRef, useState } from "react"


const DrawingBoard = () => {
    const drawingBoardRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    // const [color, setColor] = useState('black')


    useEffect(() => {
        const drawingBoard = drawingBoardRef.current
        // const pixelRatio = window.pixelRatio + 0.4xqsx
        drawingBoard.height = window.innerHeight * 1.80
        drawingBoard.width = window.innerWidth * 1.80
        // drawingBoard.style.width = `${window.innerWidth}px`;
        // drawingBoard.style.height = `${window.innerHeight}px`;

        const context = drawingBoard.getContext('2d')
        context.scale(2, 2)
        context.lineCap = "round"
        context.strokeStyle = 'black'
        context.lineWidth = 4
        contextRef.current = context
    }, [])



    const startDrawing = (e) => {

        const { offsetX, offsetY } = e.nativeEvent
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const stopDrawing = () => {
        contextRef.current.closePath()
        setIsDrawing(false)
    }

    const draw = (e) => {
        if (!isDrawing) {
            return
        }
        const { offsetX, offsetY } = e.nativeEvent
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()

    }

    return (
        <canvas
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            ref={drawingBoardRef}
            style={{ height: '100%', width: '100%', backgroundColor: 'beige' }}
        />
    )
}

export default DrawingBoard