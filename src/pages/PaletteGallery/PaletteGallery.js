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
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import bolt from '../../assets/bolt.png'
import { getAllDrawings, createNewDrawing, editName, handleDelete, deleteDrawing } from '../../services/apiHandler';
import { useDispatch } from 'react-redux';
import { updateAppLoader } from '../../store/LoaderSlice';
import { updateSnackBar } from '../../store/SnackBarSlice';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageModal from '../../components/ImageModal/ImageModal';
import GlobalNavbar from '../../components/GlobalNavbar/GlobalNavbar';

const PaletteGallery = () => {

    const [drawingList, setDrawingList] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [selectedDrawing, setSelectedDrawing] = React.useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        dispatch(
            updateAppLoader({
                loading: true
            })
        )
        try {
            const response = await getAllDrawings()
            if (response?.data?.success) {
                setDrawingList(response?.data?.data)

            }
            else {
                dispatch(
                    updateSnackBar({
                        open: true,
                        severity: 'error',
                        message: 'Failed to fetch all drawings'
                    })
                )
            }
        }
        catch (error) {
            dispatch(
                updateSnackBar({
                    open: true,
                    severity: 'error',
                    message: 'Something went wrong'
                })
            )
        }
        dispatch(
            updateAppLoader({
                loading: false
            })
        )
    }

    const editDrawingName = async (drawing) => {
        try {
            const payload = {
                "name": drawing.name,
                drawingId: drawing?._id
            }
            const response = await editName(payload)
            if (response?.data?.success) {
                dispatch(
                    updateSnackBar({
                        open: true,
                        severity: 'success',
                        message: 'Name updated'
                    })
                )
                fetchData()
            }
            else {
                dispatch(
                    updateSnackBar({
                        open: true,
                        severity: 'error',
                        message: 'Failed to create drawing'
                    })
                )
            }
        }
        catch (error) {
            dispatch(
                updateSnackBar({
                    open: true,
                    severity: 'error',
                    message: 'Something went wrong'
                })
            )
        }
    }

    const handleCopyLink = (id) => {
        navigator.clipboard.writeText(`http://localhost:3000/drawingBoard?id=${id}`)
        setDrawingList(prev => prev?.map((drawing) => {
            if (drawing?._id === id)
                return {
                    ...drawing,
                    copied: true
                }
            else
                return drawing
        }))
    }

    const handleChange = (e, id) => {
        setDrawingList(prev => prev?.map((item) => {
            if (item._id === id)
                return {
                    ...item,
                    name: e.target.value
                }
            else
                return item
        }

        ))
    }

    const handleEdit = (id, value) => {
        setDrawingList(prev => prev?.map((item) => {
            if (item._id === id)
                return {
                    ...item,
                    edit: value
                }
            else
                return item
        }

        ))
    }

    const handleDelete = async (_id) => {
        try {
            const response = await deleteDrawing(_id)
            if (response?.data?.success) {
                dispatch(
                    updateSnackBar({
                        open: true,
                        severity: 'success',
                        message: 'Drawing deleted'
                    })
                )
                fetchData()
            }
            else {
                dispatch(
                    updateSnackBar({
                        open: true,
                        severity: 'error',
                        message: 'Failed to delete'
                    })
                )
            }
        }
        catch (error) {
            dispatch(
                updateSnackBar({
                    open: true,
                    severity: 'error',
                    message: 'Something went wrong'
                })
            )
        }
    }

    const handleDownload = (drawing) => {
        fetch(drawing?.url)
            .then(response => response.blob())
            .then(blob => {

                const blobUrl = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = blobUrl;
                link.download = `${drawing.name}.jpeg`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(blobUrl);

            })
            .catch(error => {
                console.error('Download failed:', error);
            });
    };

    const handleDrawingOpen = (drawing) => {
        setOpen(true)
        setSelectedDrawing(drawing)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <div className={classes.container}>
                <GlobalNavbar />
                {open && <ImageModal drawing={selectedDrawing} state={open} handleClose={handleClose} />}
                <div className={classes.heading}>
                    <div className={classes.board}>
                        <img src={bolt} alt='bolt' className={classes.boltImage}></img>
                        Pallette-gallery
                        <img src={bolt} alt='bolt' className={classes.boltImage}></img>
                    </div>
                </div>
                <div className={classes.gallery}>
                    <Card className={`${classes.card} ${classes.newDrawingCard}`} onClick={() => navigate('/drawingBoard')} >
                        <div className={classes.newDrawing} >
                            <AddCircleOutlinedIcon className={classes.addIcon} />
                            <p>New Drawing</p>
                        </div>

                    </Card>
                    {drawingList.map((drawing, index) => (
                        <Card className={`${classes.card}`} key={index} >

                            <CardMedia
                                component="img"
                                alt={drawing.name}
                                className={classes.image}
                                image={drawing.url}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" align='center' >
                                    {!drawing?.edit ?
                                        <div className={classes.edit} >
                                            <span className={classes.name} onClick={() => handleDrawingOpen(drawing)}> {`${drawing.name}`}</span>
                                            <EditIcon onClick={() => {
                                                handleEdit(drawing._id, true)
                                            }} />
                                        </div> :
                                        <div className={classes.editContainer}>
                                            <FormControl className={classes.textField} variant="standard">
                                                <Input
                                                    value={drawing.name}
                                                    onChange={(e) => handleChange(e, drawing._id)}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <div className={classes.adornmentIcons}>
                                                                <DoneIcon className={classes.done} onClick={() => editDrawingName(drawing)} />
                                                                <CloseIcon className={classes.close} onClick={() => handleEdit(drawing._id, false)} />
                                                            </div>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </div>
                                    }

                                </Typography>
                            </CardContent>
                            <CardActions className={classes.actions}>
                                <p className={classes.edited}> <CalendarMonthIcon /> {moment(drawing.createdAt).format('DD MMM YYYY')}</p>
                                <div className={classes.icons}>
                                    {drawing?.copied ? <div className={classes.done} ><DoneIcon /><span>Copied</span></div> : <InsertLinkOutlinedIcon className={classes.link} onClick={() => handleCopyLink(drawing._id)} />}

                                    <FileDownloadOutlinedIcon className={classes.link} onClick={() => handleDownload(drawing)} />
                                    <DeleteIcon className={classes.link} onClick={() => handleDelete(drawing?._id)} />
                                </div>
                            </CardActions>
                        </Card>
                    ))}
                </div>
            </div >
        </>
    )
}

export default PaletteGallery