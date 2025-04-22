import { FormControlLabel, Switch } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import React from 'react';

// ----------------------------------------------------------------------

RHFSwitch.propTypes = {
    name: PropTypes.string,
};

export default function RHFSwitch({ name, ...other }) {
    const { control } = useFormContext();

    return (
        <FormControlLabel
            control={
                <Controller
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <Switch {...field} checked={field.value} />
                    )}
                />
            }
            {...other}
        />
    );
}
