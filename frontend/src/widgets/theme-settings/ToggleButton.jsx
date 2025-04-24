import { Tooltip } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';

//
import Iconify from './../../components/Iconify';
import { IconButtonAnimate } from './../../components/animate';
import cssStyles from './../../shared/utils/cssStyles';

// ----------------------------------------------------------------------

const RootStyle = styled('span')(({ theme }) => ({
    ...cssStyles(theme).bgBlur({ opacity: 0.64 }),
    borderRadius: '24px 0 20px 24px',
    boxShadow: `-12px 12px 32px -4px ${alpha(
        theme.palette.mode === 'light'
            ? theme.palette.grey[600]
            : theme.palette.common.black,
        0.36,
    )}`,
    marginTop: theme.spacing(-3),
    padding: theme.spacing(0.5),
    position: 'fixed',
    right: 0,
    top: '50%',
    zIndex: theme.zIndex.drawer + 2,
}));

const DotStyle = styled('span')(({ theme }) => ({
    backgroundColor: theme.palette.error.main,
    borderRadius: '50%',
    height: 8,
    position: 'absolute',
    right: 10,
    top: 8,
    width: 8,
}));

// ----------------------------------------------------------------------

ToggleButton.propTypes = {
    notDefault: PropTypes.bool,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
};

export default function ToggleButton({ notDefault, onToggle, open }) {
    return (
        <RootStyle>
            {notDefault && !open && <DotStyle />}

            <Tooltip placement="left" title="Settings">
                <IconButtonAnimate
                    color="inherit"
                    onClick={onToggle}
                    sx={{
                        '&:hover': {
                            bgcolor: (theme) =>
                                alpha(
                                    theme.palette.primary.main,
                                    theme.palette.action.hoverOpacity,
                                ),
                            color: 'primary.main',
                        },
                        p: 1.25,
                        transition: (theme) => theme.transitions.create('all'),
                    }}
                >
                    <Iconify height={20} icon="eva:options-2-fill" width={20} />
                </IconButtonAnimate>
            </Tooltip>
        </RootStyle>
    );
}