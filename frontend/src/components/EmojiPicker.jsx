// import 'emoji-mart/css/emoji-mart.css';
import { Box, ClickAwayListener, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import cssStyles from './../shared/utils/cssStyles';

//
import Iconify from './Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)({
    position: 'relative',
});

const PickerStyle = styled('div')(({ theme }) => ({
    '& .emoji-mart': {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
    },
    '& .emoji-mart-anchor': {
        '&:hover, &:focus, &.emoji-mart-anchor-selected': {
            color: theme.palette.text.primary,
        },
        color: theme.palette.text.disabled,
    },
    '& .emoji-mart-bar': { borderColor: theme.palette.divider },
    '& .emoji-mart-category .emoji-mart-emoji:hover:before': {
        backgroundColor: theme.palette.action.selected,
    },
    '& .emoji-mart-category-label span': {
        ...theme.typography.subtitle2,
        ...cssStyles().bgBlur({ color: theme.palette.background.paper }),
        color: theme.palette.text.primary,
    },
    '& .emoji-mart-emoji': { outline: 'none' },
    '& .emoji-mart-preview-name': {
        color: theme.palette.text.primary,
    },
    '& .emoji-mart-preview-shortname, .emoji-mart-preview-emoticon': {
        color: theme.palette.text.secondary,
    },
    '& .emoji-mart-search input': {
        '&::placeholder': {
            ...theme.typography.body2,
            color: theme.palette.text.disabled,
        },
        backgroundColor: 'transparent',
        borderColor: theme.palette.grey[500_32],
        color: theme.palette.text.primary,
    },
    '& .emoji-mart-search-icon svg': {
        fill: theme.palette.text.disabled,
        opacity: 1,
    },
    '& .emoji-mart-title-label': { color: theme.palette.text.primary },
    borderRadius: Number(theme.shape.borderRadius) * 2,
    bottom: 40,
    boxShadow: theme.customShadows.z20,
    left: theme.spacing(-2),
    overflow: 'hidden',
    position: 'absolute',
}));

// ----------------------------------------------------------------------

EmojiPicker.propTypes = {
    alignRight: PropTypes.bool,
    disabled: PropTypes.bool,
    setValue: PropTypes.func,
    value: PropTypes.string,
};

export default function EmojiPicker({
    alignRight = false,
    disabled,
    setValue,
    value,
    ...other
}) {
    const theme = useTheme();
    const [emojiPickerState, SetEmojiPicker] = useState(false);

    let emojiPicker;
    if (emojiPickerState) {
        emojiPicker = (
            <Picker
                color={theme.palette.primary.main}
                emoji="point_up"
                onSelect={(emoji) => setValue(value + emoji?.native)}
                title="Pick your emoji…"
            />
        );
    }

    const triggerPicker = (event) => {
        event.preventDefault();
        SetEmojiPicker(!emojiPickerState);
    };

    const handleClickAway = () => {
        SetEmojiPicker(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <RootStyle {...other}>
                <PickerStyle
                    sx={{
                        ...(alignRight && {
                            left: 'auto !important',
                            right: -2,
                        }),
                    }}
                >
                    {emojiPicker}
                </PickerStyle>
                <IconButton
                    disabled={disabled}
                    onClick={triggerPicker}
                    size="small"
                >
                    <Iconify
                        height={20}
                        icon={'eva:smiling-face-fill'}
                        width={20}
                    />
                </IconButton>
            </RootStyle>
        </ClickAwayListener>
    );
}
