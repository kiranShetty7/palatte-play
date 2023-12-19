import BrushIcon from '@mui/icons-material/Brush';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import ModeIcon from '@mui/icons-material/Mode';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import WallpaperIcon from '@mui/icons-material/Wallpaper'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import classes from './IconSelector.module.css'

const IconSelector = (props) => {

    const { name } = props
    if (name === 'Draw')
        return <ModeIcon className={classes.icon} />

    if (name === 'Fill')
        return <WaterDropIcon className={classes.icon} />

    if (name === 'Eraser')
        return <AutoFixNormalIcon className={classes.icon} />

    if (name === 'Brush Size')
        return <BrushIcon className={classes.icon} />

    if (name === 'Undo')
        return <UndoIcon className={classes.icon} />

    if (name === 'Redo')
        return <RedoIcon className={classes.icon} />

    if (name === 'Background colour')
        return <WallpaperIcon className={classes.icon} />

    if (name === 'Change colour')
        return <PaletteOutlinedIcon className={classes.icon} />

}

export default IconSelector