import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ToolBar from "../ToolBar/ToolBar";
import classes from './DrawingBoard.module.css'
import { useLocation } from "react-router-dom";
import { getIndividualDrawing, saveDrawing } from "../../services/apiHandler";
import { updateSnackBar } from "../../store/SnackBarSlice";
import { updateAppLoader } from "../../store/LoaderSlice";
import SaveModal from "../SaveModal/SaveModal";

const DrawingBoard = () => {
    const drawingBoardRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#fff')
    const store = useSelector((state) => state)
    const toolBarState = store.toolbar
    const imageArray = useRef([])
    const pointer = useRef(0)
    const dispatch = useDispatch()
    const location = useLocation()
    const searchParams = new URLSearchParams(location?.search);
    const drawingId = searchParams.get('id');
    const [open, setOpen] = useState(false)
    console.log(drawingId)

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


            tempCanvas.width = drawingBoard.width;
            tempCanvas.height = drawingBoard.height;

            tempContext.drawImage(drawingBoard, 0, 0);


            const URL = tempCanvas.toDataURL();

            console.log(URL)

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
        else if (toolBarState.tool === 'Save')
            setOpen(true)
        else
            configureColour()
        console.log(toolBarState.tool)
    }, [toolBarState.penColour, toolBarState.brushSize, toolBarState.backgroundColour, toolBarState.tool, toolBarState.trigger]);

    const handleSave = async (name) => {
        const drawingBoard = drawingBoardRef.current;
        const tempCanvas = document.createElement('canvas');
        const tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = drawingBoard.width;
        tempCanvas.height = drawingBoard.height;

        tempContext.fillStyle = backgroundColor;
        tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

        tempContext.drawImage(drawingBoard, 0, 0);

        const dataUrl = tempCanvas.toDataURL();

        try {

            const response = await fetch(dataUrl);
            const blob = await response.blob();

            const formData = new FormData();

            formData.append('upload_preset', 'palette-play');
            formData.append('cloud_name', 'dj0qzdrqv');
            formData.append('file', blob);

            const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dj0qzdrqv/image/upload', {
                method: 'POST',
                body: formData,
            });

            const cloudinaryData = await cloudinaryResponse.json();
            if (cloudinaryData.secure_url) {
                console.log("efbkvefvn")
                const payload = {
                    userId: localStorage.getItem('userId'),
                    url: cloudinaryData.secure_url,
                    name: name
                }

                const response = await saveDrawing(payload)
                if (response?.data?.success) {
                    handleClose()
                    dispatch(
                        updateSnackBar({
                            open: true,
                            severity: 'success',
                            message: 'Image saved successfully !'
                        })
                    )
                }
                else {
                    dispatch(
                        updateSnackBar({
                            open: true,
                            severity: 'error',
                            message: 'Failed to get drawing'
                        })
                    )
                }

            }
            console.log(cloudinaryData)

        } catch (error) {
            console.error('Error saving image to Cloudinary:', error);
        }
    };


    const scaleCoordinates = (e) => {
        const { pageX, pageY } = e.touches ? e.touches[0] : e;
        const rect = drawingBoardRef.current.getBoundingClientRect();
        const correctionFactorX = 5;
        const correctionFactorY = 5;
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


    const handleClose = () => {
        setOpen(false)
    }

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
        <div style={{ height: "100vh", boxSizing: 'border-box' }}>
            <ToolBar className={classes.toolBar} />
            {open && <SaveModal handleSave={handleSave} state={open} handleClose={handleClose} />}
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
