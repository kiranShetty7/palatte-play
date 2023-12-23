import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classes from './PaletteGallery.module.css'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import image1 from '../../assets/sa.jpeg'
import image2 from '../../assets/test 7.57.25 PM.jpeg'
import image3 from '../../assets/test 8.15.17 PM.jpeg'
import image4 from '../../assets/test.jpeg'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import bolt from '../../assets/bolt.png'

const PaletteGallery = () => {

    const drawingList = [{
        name: "Drawing",
        image: image1,
        edited: "24th June 2023"
    }, {
        name: "Drawing",
        image: image2,
        edited: "24th June 2023"
    }, {
        name: "Drawing",
        image: image3,
        edited: "24th June 2023"
    }, {
        name: "Drawing",
        image: image4,
        edited: "24th June 2023"
    }, {
        name: "Drawing",
        image: image3,
        edited: "24th June 2023"
    }, {
        name: "Drawing",
        image: image2,
        edited: "24th June 2023"
    }
        , {
        name: "Drawing",
        image: image1,
        edited: "24th June 2023"
    },
    {
        name: "Drawing",
        image: image3,
        edited: "24th June 2023"
    }, {
        name: "Drawing",
        image: image4,
        edited: "24th June 2023"
    }, {
        name: "Drawing",
        image: image1,
        edited: "24th June 2023"
    }, {
        name: "Drawing",
        image: image3,
        edited: "24th June 2023"
    }, {
        name: "Drawing",
        image: image4,
        edited: "24th June 2023"
    }, {
        name: "Drawing",
        image: image1,
        edited: "24th June 2023"
    }, {
        name: "Drawing",
        image: image4,
        edited: "24th June 2023"
    }, {
        name: "Drawing",
        image: image3,
        edited: "24th June 2023"
    }, {
        name: "Drawing",
        image: image2,
        edited: "24th June 2023"
    }, {
        name: "Drawing",
        image: image1,
        edited: "24th June 2023"
    }
    ]


    return (<div className={classes.container}>
        {/* <p>Pallette-Gallery</p> */}
        <div className={classes.heading}>
            <div className={classes.board}>
                <img src={bolt} alt='bolt' className={classes.boltImage}></img>
                Pallette-gallery
                <img src={bolt} alt='bolt' className={classes.boltImage}></img>
            </div>
        </div>
        <div className={classes.gallery}>
            <Card className={`${classes.card} ${classes.newDrawingCard}`}>
                <div className={classes.newDrawing}>
                    <AddCircleOutlinedIcon className={classes.addIcon} />
                    <p>New Drawing</p>
                </div>

            </Card>
            {drawingList.map((drawing, index) => (
                <Card className={`${classes.card}`}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        className={classes.image}
                        image={drawing.image}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align='center'>
                            {`${drawing.name} ${index}`}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <p className={classes.edited}> <EditOutlinedIcon /> {drawing.edited}</p>
                        <div className={classes.icons}>
                            <InsertLinkOutlinedIcon />
                            <FileDownloadOutlinedIcon />
                        </div>
                    </CardActions>
                </Card>
            ))}
        </div>
    </div >)
}

export default PaletteGallery