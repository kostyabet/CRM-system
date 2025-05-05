import { TextField, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import ClickDatePicker from '../common/date/ClickDatePicker';
import React from 'react';

// ----------------------------------------------------------------------

RHFDateRange.propTypes = {
    nameEnd: PropTypes.string.isRequired,
    nameStart: PropTypes.string.isRequired,
};

export function RHFDateRange({
    nameEnd,
    nameStart,
    onChangeEnd,
    onChangeStart,
    restForEnd,
    restForStart,
}) {
    const { control } = useFormContext();

    const [start, end] = useWatch({ name: [nameStart, nameEnd] });

    return (
        <>
            <Controller
                name={nameStart}
                render={({ field, fieldState: { error } }) => (
                    <ClickDatePicker
                        label="Дата начала"
                        maxDate={end ? new Date(end) : null}
                        onChange={onChangeStart(field)}
                        renderInput={(params) => (
                            <TextField
                                autoComplete="off"
                                onKeyDown={(e) => e.preventDefault()}
                                {...params}
                                error={!!error}
                                fullWidth
                                helperText={error?.message}
                            />
                        )}
                        value={field.value ? new Date(field.value) : null}
                    />
                )}
                {...restForStart}
            />
            <Controller
                control={control}
                name={nameEnd}
                render={({ field, fieldState: { error } }) => (
                    <ClickDatePicker
                        label="Дата окончания"
                        minDate={start ? new Date(start) : null}
                        onChange={onChangeEnd(field)}
                        renderInput={(params) => (
                            <TextField
                                autoComplete="off"
                                onKeyDown={(e) => e.preventDefault()}
                                {...params}
                                error={!!error}
                                fullWidth
                                helperText={error?.message}
                            />
                        )}
                        value={field.value ? new Date(field.value) : null}
                    />
                )}
                {...restForEnd}
            />
        </>
    );
}
