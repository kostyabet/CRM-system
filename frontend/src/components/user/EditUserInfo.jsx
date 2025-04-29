import React, { useEffect } from 'react';
import { 
    Card,
    Typography,
    TextField,
    Grid,
    Stack,
    Button
} from '@mui/material';
import { FormProvider, RHFTextField } from '~/components/hook-form';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchUpdateUser } from '~/entities/user/api';
import { useSnackbar } from 'notistack';

export const EditUserInfo = ({ 
    user,
    onCancel,
    refetch
}) => {
    
    const { enqueueSnackbar } = useSnackbar();
    
    const UserSchema = Yup.object().shape({
        login: Yup.string().required('Login is required'),
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
        login: user?.login || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phone: user?.phone || '',
        email: user?.email || '',
        role: user?.role || '',
    };

    useEffect(() => {
        reset(defaultValues);
    }, [user]);

    const methods = useForm({
        defaultValues,
        resolver: yupResolver(UserSchema),
    });

    const { handleSubmit, reset } = methods;

    const onSubmit = async (values) => {
        const data = await fetchUpdateUser(values);
        if (data.message === 'Данные успешно изменены!') {
            enqueueSnackbar(data.message, { variant: 'success' });
            onCancel();
            refetch();
        } else {
            enqueueSnackbar('Ошибка при обновлении данных', { variant: 'error' });
        }
    }

    return(
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <RHFTextField label="Логин" name="login" />
                <RHFTextField label="Имя" name="firstName" />
                <RHFTextField label="Фамилия" name="lastName" />
                <RHFTextField label="Телефон" name="phone" />
                <RHFTextField label="Почта" name="email" />
                <RHFTextField label="Роль" name="role" />
            </Stack>
            <Stack
                sx={{
                    mt: 3,
                }}
                direction="row"
                display="flex"
                justifyContent="space-between"
            >
                <Button
                    color="success"
                    type="submit"
                    variant="contained"
                >
                    Сохранить изменения
                </Button>
                <Button
                    color="error"
                    variant="contained"
                    onClick={() => onCancel()}
                >
                    Отмена
                </Button>
            </Stack>
        </FormProvider>
    );
}