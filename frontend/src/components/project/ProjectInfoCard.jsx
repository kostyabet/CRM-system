import { 
    Card,
    Button,
    Stack
} from "@mui/material";
import React, { useEffect, useState } from 'react';

import OwnInfoBlock from './blocks/OwnInfoBlock';
import UsersBlock from './blocks/UsersBlock';
import AttachmentsBlock from './blocks/AttachmentsBlock';

import { FormProvider } from '~/components/hook-form';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchUserInfoById } from '~/entities/user'; 
import { useUserInfo } from '~/entities/user';
import { fetchCreateTask, fetchUpdateTask } from '~/entities/task';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '~/application/router/paths';
import { useSnackbar } from 'notistack';

export default function ProjectInfoCard({
    project,
    isEditing,
    newTask = true,
}) {
    const [filterData, setFilterData] = useState([]);
    const { data: userInfo } = useUserInfo();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const rebuildFilterDate = () => {
            users.forEach((id, index) => fetchUserInfoById(id).then((res) => {users[index] = res; if (index === users.length - 1) setFilterData(users)}));
        }

        if (!project || !project?.users || project?.users?.length === 0) return;
        const users = [...project?.users];
        rebuildFilterDate();
    }, [project?.users]);

    const TaskSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().max(255),
        startAt: Yup.date()
            .transform((value, originalValue) =>
                originalValue ? new Date(originalValue) : null
            )
            .required('Start date is required'),
        endAt: Yup.date()
            .transform((value, originalValue) =>
                originalValue ? new Date(originalValue) : null
            )
            .required('Start date is required'),
        state: Yup.string().required('Status is required'),
        priority: Yup.string().required('Priority is required'),
    });

    const defaultValues = {
        name: project?.name || '',
        description: project?.description || '',
        startAt: project?.startAt || null,
        endAt: project?.endAt || null,
        state: project?.state || 5,
        priority: project?.priority || 4,
        users: filterData || null,
        attachments: project?.attachments || [],
    };

    useEffect(() => {
        reset(defaultValues);
    }, [project, filterData]);

    const methods = useForm({
        defaultValues,
        resolver: yupResolver(TaskSchema),
    });

    const { handleSubmit, reset } = methods;

    const onSubmit = async (values) => {
        if (newTask)
            handleCreateTask(values);
        else
            handleEditTask(values);
    }

    const handleCreateTask = async (values) => {
        const userIds = [...values.users.map((user) => user.id)];
        if (!userIds.includes(userInfo.id)) {
            userIds.push(userInfo.id);
        }

        const data = await fetchCreateTask({
            name: values.name,
            description: values.description,
            startAt: new Date(values.startAt),
            endAt: new Date(values.endAt),
            state: values.state,
            priority: values.priority,
            users: userIds,
            attachments: null,
        });
        console.log(data);

        if (data.message === "Задача создана")
            enqueueSnackbar('Задача создана', {
                variant: 'success',
                autoHideDuration: 2000,
            });
        else
            enqueueSnackbar('Ошибка создания задачи', {
                variant: 'error',
                autoHideDuration: 2000,
            });

        navigate(PATH_DASHBOARD.projects.user(data?.task?.id));
    }

    const handleEditTask = async (values) => {
        const userIds = [...values.users.map((user) => user.id)];
        if (!userIds.includes(userInfo.id)) {
            userIds.push(userInfo.id);
        }

        const data = await fetchUpdateTask(project?.id, {
            name: values.name,
            description: values.description,
            startAt: new Date(values.startAt),
            endAt: new Date(values.endAt),
            state: values.state,
            priority: values.priority,
            users: userIds,
            attachments: null,
        });

        if (data.message === "Задача изменена") {
            enqueueSnackbar('Задача изменена', {
                variant: 'success',
                autoHideDuration: 2000,
            });   
            navigate(PATH_DASHBOARD.projects.root);
        }
        else
            enqueueSnackbar('Ошибка изменения задачи', {
                variant: 'error',
                autoHideDuration: 2000,
            });
    }

    return (
        <Card
            sx={{
                p: 3,
            }}
        >
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    direction="column"
                    spacing={3}
                >
                    <OwnInfoBlock isEditing={isEditing} />

                    <UsersBlock isEditing={isEditing} />

                    <AttachmentsBlock isEditing={isEditing} />
                    
                    {isEditing && <Button
                        variant="contained"
                        type="submit"
                    >
                        {newTask ? "Создать задачу" : "Сохранить изменения"}
                    </Button>}
                </Stack>
            </FormProvider>
        </Card>
    )
}