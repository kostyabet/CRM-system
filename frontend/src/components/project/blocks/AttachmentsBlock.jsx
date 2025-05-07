import React, { useState, useCallback } from 'react';
import {
    Stack,
    Typography,
    Box,
    IconButton,
    Button,
    Card,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { UploadMultiFile } from '~/components/upload';
import { Droppable , DragDropContext} from 'react-beautiful-dnd';
import { EquipmentFile } from './components/file-item';
import Iconify from '~/components/iconify';
import { FileComponent } from './components/equipment-files-info';
import { useFormContext, useWatch } from 'react-hook-form';

const imageHoverSX = {
    "&:hover": {
        animationName: 'wiggle',
        animationDuration: '1s',
    },
};

export default function AttachmentsBlock({
    isEditing
}) {
    const [newFiles, setNewFiles] = useState([])
    const [deletedFiles, setDeletedFiles] = useState([])
    const { enqueueSnackbar } = useSnackbar();

    const { setValue } = useFormContext();
    const [attachments] = useWatch({
        name: ['attachments'],
    });

    const handleDrop = useCallback(
        (acceptedFiles) => {
            if (acceptedFiles)
                setNewFiles(acceptedFiles);
        },
        [setNewFiles],
    );

    const uploadNewImages = async () => {
        enqueueSnackbar("Загрузка файлов...",{
            autoHideDuration: 1500,
            variant: 'info',
        })
        setValue('attachments', [...attachments, ...newFiles])
        setNewFiles([])
    }

    const handleDeleteCommit = async () =>{
        setDeletedFiles([])
    }

    const handleClickDelete = (index) => {
        setDeletedFiles([...deletedFiles, ...attachments.filter((_, i) => i === index)]);
        setValue('attachments', [...attachments.filter((_, i) => i !== index)])
    }

    const handleClickReuse = (index) => {
        setValue('attachments', [...attachments, ...deletedFiles.filter((_, i) => i === index)])
        setDeletedFiles([...deletedFiles.filter((_, i) => i !== index)]);
    }

    return (
        <>
            <Typography variant='h5' sx={{ mb: 1 }}>
                Прикрепленные файлы
            </Typography>
            {isEditing ? (
                <Card sx={{ padding: 2, marginBottom: 3 }}>
                    <Box sx={{ position:'relative'}}>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <h3 >Уже загруженные (перетащите в нужном порядке)</h3>
                        </Stack>
                        <Box sx={{ display: 'flex', flexDirection: 'row', overflowX: 'scroll' }}>
                            {attachments.length === 0 ? (
                                <Box sx={{ paddingY: 3 }}>
                                    <Typography color="text.secondary">Нет загруженных файлов</Typography>
                                </Box>
                                ) : (
                                attachments.map((file, index) => (
                                    <Box key={file.size + index} sx={{ backgroundColor: '#ffffff10', minWidth: 80, borderRadius: 1, p: 1, m: 1, ...imageHoverSX }}>
                                        <Box sx={{ display: 'flex', position: 'relative', marginBottom: 2, justifyContent: 'space-between', width: '100%' }}>
                                            <Typography color="text.secondary">{index + 1}</Typography>
                                            <IconButton sx={{ top: -5, right: -5, position: 'absolute' }} onClick={() => handleClickDelete(index)}>
                                                <Iconify icon={'eva:trash-2-outline'} width={50} />
                                            </IconButton>
                                        </Box>
                                        <FileComponent column fileName={file.name} />
                                    </Box>
                                ))
                            )}
                        </Box>

                        {deletedFiles.length !== 0 && (
                            <Stack direction="row" sx={{ marginTop: 3 }} justifyContent="space-between">
                                <h3>Удалённые</h3>
                                <Button variant="outlined" color="error" onClick={handleDeleteCommit}>
                                    Подтвердить удаление
                                </Button>
                            </Stack>
                        )}

                        <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
                            {deletedFiles.map((file, index) => (
                                <Box key={index} sx={{ backgroundColor: '#ffffff05', borderRadius: 1, p: 1, m: 1 }}>
                                    <Box sx={{ display: 'flex', position: 'relative', marginBottom: 2, justifyContent: 'space-between', width: '100%' }}>
                                        <Typography color="text.secondary">{index + 1}</Typography>
                                        <IconButton
                                            title="Восстановить"
                                            sx={{ top: -5, right: -5, position: 'absolute' }}
                                            onClick={() => handleClickReuse(index)}
                                        >
                                            <Iconify icon={'material-symbols:cycle'} />
                                        </IconButton>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                        <h3>Загрузка новых файлов</h3>
                        <Box sx={{marginTop:2}}>
                            <UploadMultiFile
                                files={newFiles}
                                onDrop={handleDrop}
                                onRemoveAll={() => setNewFiles([])}
                                onUpload={uploadNewImages}
                                req={"Рекомендуемый размер файла не более 150МБ"}
                            />
                        </Box>
                    </Box>
                </Card>
            ) : (
                attachments.map((file, index) => (
                    <Box sx={{ backgroundColor: '#ffffff10', minWidth: 80, borderRadius: 1, p: 1, m: 1, ...imageHoverSX }}>
                        <Box sx={{ display: 'flex', position: 'relative', marginBottom: 2, justifyContent: 'space-between', width: '100%' }}>
                            <Typography color="text.secondary">{index + 1}</Typography>
                            <IconButton sx={{ top: -5, right: -5, position: 'absolute' }} onClick={() => handleClickDelete(index)}>
                                <Iconify icon={'eva:trash-2-outline'} />
                            </IconButton>
                        </Box>
                        <FileComponent column fileName={file.name} />
                    </Box>
                ))
            )}
        </>
    )
}