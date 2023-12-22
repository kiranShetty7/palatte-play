import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTool } from "../../store/ToolbarSlice";
import IconSelector from "../IconSelector/IconSelector";
import classes from "./ToolBar.module.css";

const ToolBar = () => {
    const toolBarArray = [
        "Draw",
        "Fill",
        "Eraser",
        "Brush Size",
        "Undo",
        "Redo",
        "Background colour",
        "Change colour",
    ];
    const [index, setIndex] = useState(null);
    const dispatch = useDispatch();

    const handleClick = (e, tool, number) => {
        setIndex(number);
        if (tool !== "Brush Size")
            dispatch(updateTool({ tool: tool }));
    };

    return (
        <div className={classes.container}>
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
        </div>
    );
};

export default ToolBar;
