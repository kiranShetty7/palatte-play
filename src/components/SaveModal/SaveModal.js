import * as React from 'react';
import Modal from '@mui/material/Modal';
import classes from './SaveModal.module.css'
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20rem',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};


const SaveModal = (props) => {
    const { state, handleClose, handleSave } = props
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');

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
                <Box sx={style}>
                    <div style={{ width: '90%' }}>
                        <div className={classes.header} >
                            <h3 > Save your drawing </h3>
                            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
                        </div>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            placeholder='Drawing name'
                            className={classes.textfield}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className={classes.buttonContainer}>
                        <Button variant="contained" onClick={() => handleSave(name)}>Save</Button>
                        <Button variant="outlined" onClick={handleClose} >Cancel</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default SaveModal