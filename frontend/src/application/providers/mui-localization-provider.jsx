import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ru } from 'date-fns/locale';
import React from 'react';

export const MuiLocalizationProvider = ({ children }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
            {children}
        </LocalizationProvider>
    );
};
