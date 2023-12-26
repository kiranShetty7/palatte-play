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
        "Download"
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
                {/* <MenuItem onClick={handleClose} className={classes.menu} > */}
                {toolBarArray.map((item, number) => (
                    <>
                        <div
                            className={`${classes.icon} ${index === number && classes.background
                                }`}
                            onClick={(e) => handleClick(e, item, number)}
                        >
                            <IconSelector name={item} />
                            <p className={classes.name}>{item}</p>
                        </div>
                        {/* {item === 'Brush Size' && } */}
                    </>
                ))}
                {/* </MenuItem>x
                 */}

            </Menu>

        </div>
    );
};

export default ToolBar;
