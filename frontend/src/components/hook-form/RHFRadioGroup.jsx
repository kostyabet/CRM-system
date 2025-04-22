import {
    FormControlLabel,
    FormHelperText,
    Radio,
    RadioGroup,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import React from 'react';

// ----------------------------------------------------------------------

RHFRadioGroup.propTypes = {
    name: PropTypes.string,
    options: PropTypes.array,
};

export default function RHFRadioGroup({ name, options, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <RadioGroup {...field} row {...other}>
                        {options.map((option) => (
                            <FormControlLabel
                                control={<Radio />}
                                key={option.value}
                                label={option.label}
                                value={option.value}
                            />
                        ))}
                    </RadioGroup>

                    {!!error && (
                        <FormHelperText error sx={{ px: 2 }}>
                            {error.message}
                        </FormHelperText>
                    )}
                </div>
            )}
        />
    );
}
