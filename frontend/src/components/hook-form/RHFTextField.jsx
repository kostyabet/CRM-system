/* eslint-disable arrow-body-style */

import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import React from 'react';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
    name: PropTypes.string,
};

export default function RHFTextField({ name, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
                return (
                    <TextField
                        autoComplete="off"
                        {...field}
                        error={!!error}
                        fullWidth
                        helperText={error?.message}
                        {...other}
                    />
                );
            }}
        />
    );
}
