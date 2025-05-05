import React, { useState, useEffect } from 'react';
import { Container, Stack } from '@mui/material';
import ActionButton from '~/components/common/ActionButton';
import { useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from './../../application/router/paths';
import HeaderBreadcrumbs from './../../components/HeaderBreadcrumbs';
import Page from './../../components/Page';
import useSettings from './../../shared/hooks/useSettings';
import ProjectInfoCard from '~/components/project/ProjectInfoCard';
import { useTaskById, fetchDeleteTask } from '~/entities/task';
import CircularProgressCustom from '~/components/common/loading/CircularProgress';
import { useUserInfo } from '~/entities/user';
import { useNavigate } from 'react-router-dom';
import {
    DialogTitle,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';
import Modal from '~/components/common/modal/Modal';

export default function ProjectPage({

}) {
    const { themeStretch } = useSettings();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isCanEdit, setIsCanEdit] = useState(false);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const navigate = useNavigate();

    const param = useParams();
    const paramId = param?.id ? +param.id : param?.id;
    const { data: project, isLoading } = useTaskById(paramId);
    const { data: user, isLoading: isLoadingUser } = useUserInfo();

    useEffect(() => {
        if (!project?.users) return;
        if (!user?.id) return;
        setIsCanEdit(project?.users?.includes(user?.id));
    }, [project, user]);

    const handleOnDelete = async (id) => {
        if (!id) return;
        await fetchDeleteTask(id);
        navigate(PATH_DASHBOARD.projects.root);
    }

    if (isLoading || isLoadingUser)
        return <CircularProgressCustom />;

    if (!project)
        navigate(PATH_DASHBOARD.projects.root);

    return (
        <Page title={`Задача: ${project?.name}`}>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading={project?.name}
                    links={[
                        { href: PATH_DASHBOARD.general.app, name: 'Dashboard' },
                        {
                            href: PATH_DASHBOARD.projects.root,
                            name: 'Задачи',
                        },
                        { name: project?.name },
                    ]}
                    action={
                        <Stack
                            alignItems={'start'}
                            direction={{ sm: 'row', xs: 'column' }}
                            gap={1}
                        >
                            {isCanEdit && <ActionButton
                                icon="edit-2"
                                name={!isEditMode ? "Редактировать" : "Отмена"}
                                color="warning"
                                onClick={() => setIsEditMode(!isEditMode)}
                            />}
                            {isCanEdit && <ActionButton
                                color="error"
                                icon="minus"
                                name="Удалить"
                                onClick={() => setIsDeleteMode(true)}
                            />}
                        </Stack>
                    }
                />
                
                <ProjectInfoCard
                    newTask={false}
                    project={project}
                    isEditing={isEditMode}
                />
            </Container>
        
            <Modal
                open={isDeleteMode}
                onClose={() => setIsDeleteMode(false)}
            >
                <DialogTitle id="alert-dialog-title">Внимание</DialogTitle>
                <DialogContentText sx={{ ml:3, mr: 3 }}>
                    Вы действительно хотите удалить задачу?
                </DialogContentText>
                <DialogActions>
                    <Button variant='soft' color={'error'} onClick={() => setIsDeleteMode(false)}>
                        Отмета
                    </Button>
                    <Button variant='soft' color={'warning'} onClick={() => {setIsDeleteMode(false); handleOnDelete(project?.id)}} autoFocus>
                        Удалить
                    </Button>
                </DialogActions>
            </Modal>
        </Page>
    )
}