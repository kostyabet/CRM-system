import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import React from 'react';

// ----------------------------------------------------------------------

RHFAutocomplete.propTypes = {
    fullWidth: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    renderOption: PropTypes.func,
};

export default function RHFAutocomplete({
    inputChange,
    label,
    name,
    restForAutocomplete,
    ...other
}) {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { ...field }, fieldState: { error } }) => (
                <Autocomplete
                    {...field}
                    {...restForAutocomplete}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={!!error}
                            helperText={error?.message}
                            label={label}
                            onChange={inputChange}
                        />
                    )}
                    {...other}
                    onChange={(event, value) => {
                        field.onChange(value);
                    }}
                />
            )}
        />
    );
}
