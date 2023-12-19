import { useState } from "react"
import Slider from '@mui/material/Slider';
import IconSelector from "../IconSelector/IconSelector";
import classes from './ToolBar.module.css'

const ToolBar = () => {
    const [size, setSize] = useState(30);
    const toolBarArray = ['Draw', 'Fill', 'Eraser', 'Brush Size', 'Undo', 'Redo', 'Background colour', 'Change colour']
    
    const handleChange = (event, newValue) => {
        setSize(newValue);
    }
    return (
        <div className={classes.container}>
            {toolBarArray.map((item) => (
                <div className={classes.icon}>
                    <IconSelector name={item} />
                    <p className={classes.name}>{item}</p>
                    {item === 'Brush Size' && <Slider step={10} aria-label="Brush Size" value={size} onChange={handleChange} />}
                </div>
            ))}
        </div>)
}

export default ToolBar