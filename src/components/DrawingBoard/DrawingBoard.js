import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ToolBar from "../ToolBar/ToolBar";
import classes from './DrawingBoard.module.css'

const DrawingBoard = () => {
    const drawingBoardRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#fff')
    const store = useSelector((state) => state)
    const toolBarState = store.toolbar
    const imageArray = useRef([])
    const pointer = useRef(0)

    useEffect(() => {
        const drawingBoard = drawingBoardRef.current;
        const parentDiv = drawingBoard.parentElement;
        const context = drawingBoard.getContext("2d");
        const imageData = context.getImageData(0, 0, drawingBoard.width, drawingBoard.height)
        imageArray.current.push(imageData)
        const resizeCanvas = () => {
            const { clientWidth, clientHeight } = parentDiv;
            drawingBoard.width = clientWidth;
            drawingBoard.height = clientHeight;


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
        const context = drawingBoard.getContext("2d");
        const configureColour = () => {

            context.lineCap = "round";
            context.strokeStyle = toolBarState.tool === 'Eraser' ? backgroundColor : toolBarState.penColour;
            context.lineWidth = toolBarState.brushSize / 10;
            contextRef.current = context;
            setBackgroundColor(toolBarState.backgroundColour)
        };

        const handleDownload = () => {
            const tempCanvas = document.createElement('canvas');
            const tempContext = tempCanvas.getContext('2d');

            // Set the dimensions of the temporary canvas
            tempCanvas.width = drawingBoard.width;
            tempCanvas.height = drawingBoard.height;

            // Draw the background color on the temporary canvas
            tempContext.fillStyle = backgroundColor;
            tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

            // Draw the actual drawing on top of the background
            tempContext.drawImage(drawingBoard, 0, 0);

            // Create a data URI from the temporary canvas
            const URL = tempCanvas.toDataURL();

            // Create a download link
            const anchor = document.createElement('a');
            anchor.href = URL;
            anchor.download = 'test.jpg';
            anchor.click();
        };

        const undoRedo = () => {
            if (pointer.current > 0 && toolBarState.tool === 'Undo')
                pointer.current = pointer.current - 1
            if (pointer.current < imageArray.current.length - 1 && toolBarState.tool === 'Redo')
                pointer.current = pointer.current + 1
            const imageData = imageArray.current[pointer.current]
            context.putImageData(imageData, 0, 0)
        }

        if (toolBarState.tool === 'Download')
            handleDownload()
        else if (toolBarState.tool === 'Undo' || toolBarState.tool === 'Redo')
            undoRedo()
        else
            configureColour()
        console.log(toolBarState.trigger)
    }, [toolBarState.penColour, toolBarState.brushSize, toolBarState.backgroundColour, toolBarState.tool, toolBarState.trigger]);



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
        const drawingBoard = drawingBoardRef.current;
        contextRef.current.closePath();
        setIsDrawing(false);
        const context = drawingBoard.getContext("2d");
        const imageData = context.getImageData(0, 0, drawingBoard.width, drawingBoard.height)
        imageArray.current.push(imageData)
        pointer.current = imageArray.current.length - 1
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
        <div style={{ height: "100%" }}>
            <ToolBar className={classes.toolBar} />
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
                ref={drawingBoardRef}
                style={{ height: "100%", width: "100%", backgroundColor: backgroundColor, boxSizing: 'border-box' }}
            />
        </div>
    );
};

export default DrawingBoard;
