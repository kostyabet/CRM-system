import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Stack } from '@mui/material';
import React from 'react';

const ClickDatePicker = (props) => (
    <DatePicker
        OpenPickerButtonProps={{
            style: {
                borderRadius: 0,
                bottom: 0,
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0,
                width: '100%',
            },
        }}
        components={{
            OpenPickerIcon: () => (
                <Stack
                    direction={'row'}
                    justifyContent={'end'}
                    sx={{ width: '95%' }}
                >
                    <InsertInvitationIcon />
                </Stack>
            ),
        }}
        inputFormat="dd/MM/yyyy"
        sx={{ position: 'relative' }}
        {...props}
    >
        {props.children}
    </DatePicker>
);

export default ClickDatePicker;
