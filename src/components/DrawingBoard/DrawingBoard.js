import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

const DrawingBoard = () => {
    const drawingBoardRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#fff')
    const store = useSelector((state) => state)
    const toolBarState = store.toolbar
    console.log(toolBarState.b)
    useEffect(() => {
        const drawingBoard = drawingBoardRef.current;
        const parentDiv = drawingBoard.parentElement;

        const resizeCanvas = () => {
            const { clientWidth, clientHeight } = parentDiv;
            drawingBoard.width = clientWidth;
            drawingBoard.height = clientHeight;

            const context = drawingBoard.getContext("2d");
            context.lineCap = "round";
            context.strokeStyle = "black";
            context.lineWidth = 4;
            contextRef.current = context;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    useEffect(() => {
        const drawingBoard = drawingBoardRef.current;
        console.log("cakjcka")
        const configureColour = () => {
            const context = drawingBoard.getContext("2d");
            context.lineCap = "round";
            context.strokeStyle = toolBarState.tool === 'Eraser' ? backgroundColor : toolBarState.penColour;
            context.lineWidth = toolBarState.brushSize / 10;
            contextRef.current = context;
            setBackgroundColor(toolBarState.backgroundColour)
        };

        configureColour()

    }, [toolBarState.penColour, toolBarState.brushSize, toolBarState.backgroundColour, toolBarState.tool]);



    const scaleCoordinates = (e) => {
        const { pageX, pageY } = e.touches ? e.touches[0] : e;
        const rect = drawingBoardRef.current.getBoundingClientRect();
        const correctionFactorX = 5; // Adjust this value as needed
        const correctionFactorY = 5; // Adjust this value as needed
        return {
            x: pageX - window.scrollX - rect.left + correctionFactorX,
            y: pageY - window.scrollY - rect.top + correctionFactorY,
        };
    };


    const startDrawing = (e) => {
        const { x, y } = scaleCoordinates(e);

        contextRef.current.beginPath();
        contextRef.current.moveTo(x, y);
        setIsDrawing(true);
    };

    const stopDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = (e) => {
        if (!isDrawing) {
            return;
        }

        const { x, y } = scaleCoordinates(e);
        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
    };

    return (
        <div style={{ height: "99.5%" }}>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
                ref={drawingBoardRef}
                style={{ height: "100%", width: "100%", backgroundColor: backgroundColor }}
            />
        </div>
    );
};

export default DrawingBoard;
