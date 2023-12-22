import { useState } from "react"
import BrushIcon from '@mui/icons-material/Brush';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import ModeIcon from '@mui/icons-material/Mode';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import WallpaperIcon from '@mui/icons-material/Wallpaper'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import classes from './IconSelector.module.css'
import Slider from '@mui/material/Slider';
import ColorPickerComponent from "../ColorPicker/ColorPicker";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import { useDispatch } from 'react-redux';
import { updateBrushSize } from "../../store/ToolbarSlice";

const IconSelector = (props) => {
    const [size, setSize] = useState(30);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch()

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChange = (event, newValue) => {
        setSize(newValue);
        dispatch(updateBrushSize({
            brushSize: newValue
        }))
    }

    const { name } = props
    if (name === 'Draw')
        return <ModeIcon className={classes.icon} />

    if (name === 'Fill')
        return <WaterDropIcon className={classes.icon} />

    if (name === 'Eraser')
        return <AutoFixNormalIcon className={classes.icon} />

    if (name === 'Brush Size')
        return <Slider step={10} aria-label="Brush Size" value={size} onChange={handleChange} />

    if (name === 'Undo')
        return <UndoIcon className={classes.icon} />

    if (name === 'Redo')
        return <RedoIcon className={classes.icon} />

    if (name === 'Background colour')
        return <>
            <WallpaperIcon className={classes.icon} onClick={handleClick} />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <ColorPickerComponent type={name} handleClose={handleClose} />
            </Menu>
        </>

    if (name === 'Change colour')
        return <>
            <PaletteOutlinedIcon className={classes.icon} onClick={handleClick} />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <ColorPickerComponent type={name} handleClose={handleClose} />
            </Menu>
        </>

}

export default IconSelector