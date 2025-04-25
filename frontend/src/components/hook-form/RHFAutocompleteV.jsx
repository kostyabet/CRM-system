import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import React from 'react';

// ----------------------------------------------------------------------

RHFAutocomplete.propTypes = {
    helperText: PropTypes.node,
    label: PropTypes.string,
    name: PropTypes.string,
};

export default function RHFAutocomplete({ helperText, label, name, ...other }) {
    const { control, setValue } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Autocomplete
                    {...field}
                    onChange={(event, newValue) =>
                        setValue(name, newValue, { shouldValidate: true })
                    }
                    renderInput={(params) => (
                        <TextField
                            error={!!error}
                            helperText={error ? error?.message : helperText}
                            label={label}
                            {...params}
                        />
                    )}
                    {...other}
                />
            )}
        />
    );
}
