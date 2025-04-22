import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, IconButton, InputAdornment, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import useAuth from './../../../shared/hooks/useAuth'
import useIsMountedRef from './../../../shared/hooks/useIsMountedRef';
import Iconify from './../../../components/Iconify';
import { FormProvider, RHFTextField } from './../../../components/hook-form';

export default function LoginForm() {
    const { login } = useAuth();

    const isMountedRef = useIsMountedRef();

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        login: Yup.string().required('Login is required'),
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        login: '',
        password: '',
        remember: true,
    };

    const methods = useForm({
        defaultValues,
        resolver: yupResolver(LoginSchema),
    });

    const {
        formState: { errors, isSubmitting },
        handleSubmit,
        reset,
        setError,
    } = methods;

    const onSubmit = async (data) => {
        try {
            // navigator(PATH_AFTER_LOGIN)
            await login(data.login, data.password);
        } catch (error) {
            console.error(error);
            reset();
            if (isMountedRef.current) {
                setError('afterSubmit', { ...error, message: error.message });
            }
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} sx={{ mb: 3 }}>
                {!!errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}

                <RHFTextField label="Login" name="login" />

                <RHFTextField
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    <Iconify
                                        icon={
                                            showPassword
                                                ? 'eva:eye-fill'
                                                : 'eva:eye-off-fill'
                                        }
                                    />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                />
            </Stack>

            <LoadingButton
                fullWidth
                loading={isSubmitting}
                size="large"
                type="submit"
                variant="contained"
            >
                Login
            </LoadingButton>
        </FormProvider>
    );
}