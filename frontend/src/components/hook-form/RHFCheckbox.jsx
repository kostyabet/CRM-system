import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import React from 'react';

// ----------------------------------------------------------------------

RHFCheckbox.propTypes = {
    name: PropTypes.string.isRequired,
};

export function RHFCheckbox({ name, ...other }) {
    const { control } = useFormContext();

    return (
        <FormControlLabel
            control={
                <Controller
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <Checkbox {...field} checked={field.value} />
                    )}
                />
            }
            {...other}
        />
    );
}

// ----------------------------------------------------------------------

RHFMultiCheckbox.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
};

export function RHFMultiCheckbox({ name, options, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => {
                const onSelected = (option) =>
                    field.value.includes(option)
                        ? field.value.filter((value) => value !== option)
                        : [...field.value, option];

                return (
                    <FormGroup>
                        {options.map((option) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={field.value.includes(
                                            option.value,
                                        )}
                                        onChange={() =>
                                            field.onChange(
                                                onSelected(option.value),
                                            )
                                        }
                                    />
                                }
                                key={option.value}
                                label={option.label}
                                {...other}
                            />
                        ))}
                    </FormGroup>
                );
            }}
        />
    );
}
