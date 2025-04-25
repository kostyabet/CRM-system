import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const InputStyle = styled(TextField, {
    shouldForwardProp: (prop) => prop !== 'stretchStart',
})(({ stretchStart, theme }) => ({
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused': {
            boxShadow: theme.customShadows.z12,
        },
        transition: theme.transitions.create(['box-shadow', 'width'], {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeInOut,
        }),
        ...(stretchStart && {
            '&.Mui-focused': {
                boxShadow: theme.customShadows.z12,
                [theme.breakpoints.up('sm')]: {
                    width: stretchStart + 60,
                },
            },
            width: stretchStart,
        }),
    },
    '& fieldset': {
        borderColor: `${theme.palette.grey[500_32]} !important`,
        borderWidth: `1px !important`,
    },
}));

export default InputStyle;
