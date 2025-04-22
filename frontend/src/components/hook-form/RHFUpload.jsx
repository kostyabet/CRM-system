import { FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

// type
import { UploadAvatar, UploadMultiFile, UploadSingleFile } from '../upload';
import React from 'react';

// ----------------------------------------------------------------------

RHFUploadAvatar.propTypes = {
    name: PropTypes.string,
};

export function RHFUploadAvatar({ name, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
                const checkError = !!error && !field.value;

                return (
                    <div>
                        <UploadAvatar
                            error={checkError}
                            {...other}
                            file={field.value}
                        />
                        {checkError && (
                            <FormHelperText
                                error
                                sx={{ px: 2, textAlign: 'center' }}
                            >
                                {error.message}
                            </FormHelperText>
                        )}
                    </div>
                );
            }}
        />
    );
}

// ----------------------------------------------------------------------

RHFUploadSingleFile.propTypes = {
    name: PropTypes.string,
};

export function RHFUploadSingleFile({ name, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
                const checkError = !!error && !field.value;

                return (
                    <UploadSingleFile
                        accept="image/*"
                        error={checkError}
                        file={field.value}
                        helperText={
                            checkError && (
                                <FormHelperText error sx={{ px: 2 }}>
                                    {error.message}
                                </FormHelperText>
                            )
                        }
                        {...other}
                    />
                );
            }}
        />
    );
}

// ----------------------------------------------------------------------

RHFUploadMultiFile.propTypes = {
    name: PropTypes.string,
};

export function RHFUploadMultiFile({ name, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
                const checkError = !!error && field.value?.length === 0;

                return (
                    <UploadMultiFile
                        accept="image/*"
                        error={checkError}
                        files={field.value}
                        helperText={
                            checkError && (
                                <FormHelperText error sx={{ px: 2 }}>
                                    {error?.message}
                                </FormHelperText>
                            )
                        }
                        {...other}
                    />
                );
            }}
        />
    );
}
