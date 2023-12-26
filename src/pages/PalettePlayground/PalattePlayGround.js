import DrawingBoard from "../../components/DrawingBoard/DrawingBoard"
import ToolBar from "../../components/ToolBar/ToolBar"
import classes from './PalettePlayground.module.css'

const PalattePlayground = () => {

    return (
        <div className={classes.container}>
            <DrawingBoard />
        </div>
    )
}

export default PalattePlayground