import { Box } from '@mui/material';
// import { alpha, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
// import SimpleBarReact from 'simplebar-react';

// ----------------------------------------------------------------------

// const RootStyle = styled('div')(() => ({
//     flexGrow: 1,
//     height: '100%',
//     overflow: 'hidden',
// }));

// const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
//     '& .simplebar-mask': {
//         zIndex: 'inherit',
//     },
//     '& .simplebar-scrollbar': {
//         '&.simplebar-visible:before': {
//             opacity: 1,
//         },
//         '&:before': {
//             backgroundColor: alpha(theme.palette.grey[600], 0.48),
//         },
//     },
//     '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
//         height: 6,
//     },
//     '& .simplebar-track.simplebar-vertical': {
//         width: 10,
//     },
//     maxHeight: '100%',
// }));

// ----------------------------------------------------------------------

Scrollbar.propTypes = {
    children: PropTypes.node.isRequired,
    sx: PropTypes.object,
};

export default function Scrollbar({ children, sx, ...other }) {
    // const userAgent =
    //     typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

    // const isMobile =
    //     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    //         userAgent,
    //     );

    return (
        <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
            {children}
        </Box>
    );

    // if (isMobile) {
    //     return (
    //         <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
    //             {children}
    //         </Box>
    //     );
    // }

    // return (
    //     <RootStyle>
    //         <SimpleBarStyle
    //             clickOnTrack={false}
    //             sx={sx}
    //             timeout={500}
    //             {...other}
    //         >
    //             {children}
    //         </SimpleBarStyle>
    //     </RootStyle>
    // );
}
