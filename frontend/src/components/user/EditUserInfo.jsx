import React from 'react';
import { 
    Card,
    Typography,
    Stack,
    Button
} from '@mui/material';
import { FormProvider, RHFTextField } from '~/components/hook-form';

export const EditUserInfo = ({ 
    user
}) => {
    const UserSchema = Yup.object().shape({
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
        resolver: yupResolver(UserSchema),
    });

    return(
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
                <Typography variant="body1" gutterBottom>
                    Логин: {user?.login}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Номер телефона: {user?.phone}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Почта: {user?.email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Роль: {user?.role}
                </Typography>
            </Stack>
        </FormProvider>
    );
}