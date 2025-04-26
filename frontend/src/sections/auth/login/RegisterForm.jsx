import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { Alert, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Card } from '@mui/material';
import useAuth from './../../../shared/hooks/useAuth'
import useIsMountedRef from './../../../shared/hooks/useIsMountedRef';
import Iconify from './../../../components/Iconify';
import { FormProvider, RHFTextField } from './../../../components/hook-form';
import { useNavigate } from 'react-router-dom';
import { PATH_AUTH } from './../../../application/router/paths';

export default function RegisterForm() {
    const { register } = useAuth();

    const isMountedRef = useIsMountedRef();

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [errorTitle, setErrorTitle] = useState('');

    const LoginSchema = Yup.object().shape({
        login: Yup.string().required('Login is required'),
        password: Yup.string().required('Password is required'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        phone: Yup.string()
            .matches(/^\+?[0-9]{10,15}$/, 'Введите корректный номер телефона')
            .required('Phone number is required'),
        email: Yup.string()
            .email('Введите корректный email')
            .required('Email is required'),
        role: Yup.string().required('Role is required'),
    });

    const defaultValues = {
        login: 'admin',
        password: 'admin',
        firstName: 'admin',
        lastName: 'admin',
        phone: '+375291234567',
        email: 'example@mail.ru',
        role: 'admin',
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
            console.log(data);
            await register(data);
            navigate(PATH_AUTH.login);
        } catch (error) {
            console.log(error)
            setErrorTitle(error.response.data.message);
            reset();
            if (isMountedRef.current) {
                setError('afterSubmit', { ...error, message: error.message });
            }
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{ mb: 3 }}>
                {!!errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}

                <RHFTextField label="Логин" name="login" />

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
                    label="Пароль"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                />

                <RHFTextField label="Имя" name="firstName" />
                <RHFTextField label="Фамилия" name="lastName" />
                <RHFTextField label="Номер телефона" name="phone" />
                <RHFTextField label="Почта" name="email" />
                <RHFTextField label="Роль" name="role" />
            </Stack>

            <Stack sx={{ mb: 3 }}>
                {errorTitle && (
                    <Alert severity="error">{errorTitle}</Alert>
                )}
            </Stack>

            <Button
                fullWidth
                loading={isSubmitting}
                size="large"
                type="submit"
                variant="contained"
            >
                Зарегистрироваться
            </Button>
        </FormProvider>
    );
}