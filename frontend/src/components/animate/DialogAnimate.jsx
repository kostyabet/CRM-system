import { Box, Dialog, Paper } from '@mui/material';
import { AnimatePresence, m } from 'framer-motion';
import PropTypes from 'prop-types';

//
import { varFade } from './variants';

// ----------------------------------------------------------------------

DialogAnimate.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    sx: PropTypes.object,
    variants: PropTypes.object,
};

export default function DialogAnimate({
    children,
    onClose,
    open = false,
    sx,
    variants,
    ...other
}) {
    return (
        <AnimatePresence>
            {open && (
                <Dialog
                    PaperComponent={(props) => (
                        <Box
                            component={m.div}
                            {...(variants ||
                                varFade({
                                    distance: 120,
                                    durationIn: 0.32,
                                    durationOut: 0.24,
                                    easeIn: 'easeInOut',
                                }).inUp)}
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                height: '100%',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <Box
                                onClick={onClose}
                                sx={{
                                    height: '100%',
                                    position: 'fixed',
                                    width: '100%',
                                }}
                            />
                            <Paper sx={sx} {...props}>
                                {props.children}
                            </Paper>
                        </Box>
                    )}
                    fullWidth
                    maxWidth="xs"
                    onClose={onClose}
                    open={open}
                    {...other}
                >
                    {children}
                </Dialog>
            )}
        </AnimatePresence>
    );
}
