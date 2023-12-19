import DrawingBoard from "../../components/DrawingBoard/DrawingBoard"
import ToolBar from "../../components/ToolBar/ToolBar"
import classes from './PalettePlayground.module.css'

const PalattePlayground = () => {

    return (
        <div className={classes.container}>
            <ToolBar />
            <div className={classes.drawingBoard} >
                <DrawingBoard />
            </div>
        </div>
    )
}

export default PalattePlayground