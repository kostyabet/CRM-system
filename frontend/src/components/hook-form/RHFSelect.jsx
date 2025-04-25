import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import React from 'react';

// ----------------------------------------------------------------------

RHFSelect.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
    rules: PropTypes.object,
};

export default function RHFSelect({ children, name, rules, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    SelectProps={{ native: true }}
                    error={!!error}
                    fullWidth
                    helperText={error?.message}
                    select
                    {...other}
                >
                    {children}
                </TextField>
            )}
            rules={rules}
        />
    );
}
