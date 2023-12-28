import * as React from 'react';
import Modal from '@mui/material/Modal';
import classes from './ImageModal.module.css'
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';




const ImageModal = (props) => {
    const { state, handleClose, drawing } = props
    const [open, setOpen] = React.useState(false);





    React.useEffect(() => {
        setOpen(state)
    }, [state])



    return (
        <div >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.container}>
                    <div style={{ height: '100%', width: '100%' }}>
                        <div className={classes.header} >
                            <h3 >{drawing.name}</h3>
                            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
                        </div>
                        <img src={drawing?.url} alt={drawing?.name} style={{ height: '80%', width: '100%' }} />
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ImageModal