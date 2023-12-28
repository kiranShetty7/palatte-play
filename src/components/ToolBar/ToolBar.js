import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTool } from "../../store/ToolbarSlice";
import IconSelector from "../IconSelector/IconSelector";
import classes from "./ToolBar.module.css";
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ToolBar = (props) => {
    const toolBarArray = [
        "Draw",
        "Eraser",
        "Brush Size",
        "Undo",
        "Redo",
        "Background colour",
        "Change colour",
        "Download",
        "Save"
    ];

    const [index, setIndex] = useState(null);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleClick = (e, tool, number) => {
        setIndex(number);
        if (tool !== "Brush Size")
            dispatch(updateTool({ tool: tool }));
        if (tool === 'Draw' || tool === 'Eraser' || tool === 'Download')
            handleClose()
    };

    return (
        <div className={props.className}>
            <BuildCircleIcon className={classes.toolBar} onClick={handleMenuClick} />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {toolBarArray.map((item, number) => (
                    <MenuItem key={number} onClick={(e) => handleClick(e, item, number)} className={`${classes.icon} ${index === number && classes.background}`}>
                        <IconSelector name={item} handleClose={handleClose} />
                        <p className={classes.name}>{item}</p>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default ToolBar;
