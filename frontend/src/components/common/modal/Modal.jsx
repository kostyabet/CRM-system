import { Dialog, Slide } from '@mui/material';
import React, { forwardRef } from 'react';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({ children, onClose, open }) => {
    return (
        <Dialog
            TransitionComponent={Transition}
            aria-describedby="alert-dialog-slide-description"
            keepMounted
            onClose={onClose}
            open={open}
        >
            {children}
        </Dialog>
    );
};

export default Modal;
