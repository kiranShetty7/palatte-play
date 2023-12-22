import { useState } from "react";
import classes from './ColorPicker.module.css'
import { useDispatch } from 'react-redux';
import { updateBackgroundColour, updatePenColour } from "../../store/ToolbarSlice";

export default function ColorPicker(props) {
    const [color, setColor] = useState("#fff");
    const colorArray = ["black", "red", "green", "blue", "orange", "yellow", "white"]
    const dispatch = useDispatch()

    const handleClick = (e, colour) => {
        setColor(colour)
        if (props.type === "Background colour") {
            dispatch(updateBackgroundColour({
                backgroundColour: colour
            }))
        }
        else {
            dispatch(updatePenColour({
                penColour: colour
            }))
        }
        props.handleClose()
    }

    return (
        <div className={classes.container}>
            {colorArray.map((colour) => (
                <div style={{ backgroundColor: colour }} className={`${classes.colour} ${color === colour && classes.selected}`} onClick={(e) => handleClick(e, colour)}> </div>
            ))}

        </div>
    )
};