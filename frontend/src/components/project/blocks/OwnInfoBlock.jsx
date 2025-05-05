import React from 'react';
import {
    MenuItem,
    Stack,
    Typography,
} from '@mui/material';
import CircularProgressCustom from '~/components/common/loading/CircularProgress';
import { useWatch } from 'react-hook-form';

import { RHFTextField } from '~/components/hook-form';
import { RHFDateRange } from '~/components/hook-form/RHFDateRange';
import RHFSelect from '~/components/hook-form/RHFSelect';
import { startDayAndMinusOffset } from '~/shared/utils/auxiliaryFn';
import { useTaskStates, useTaskPriorities } from '~/entities/task';

export default function OwnInfoBlock({
    isEditing
}) {
    const [state, priority] = useWatch({
        name: ['state', 'priority'],
    });

    const { data: states, isLoading: isLoadingStates, refetch: refetchStates } = useTaskStates();
    const { data: priorities, isLoading: isLoadingPriorities, refetch: refetchPriorities } = useTaskPriorities();

    if (isLoadingStates || isLoadingPriorities)
        return <CircularProgressCustom />;

    return (
        <Stack
            direction="column"
            spacing={1}
        >
            <Typography variant='h5' sx={{ mb: 1 }}>Общая информация о задаче</Typography>

            <Stack
                direction="row"
                spacing={1}
            >
                <RHFTextField label="Название" name="name" sx={{ width: '75%' }} disabled={!isEditing} />
                <RHFDateRange
                    disabled={!isEditing}
                    nameEnd={'endAt'}
                    nameStart={'startAt'}
                    onChangeEnd={(field) => (newValue) => {
                        const newValueZeroHour =
                            startDayAndMinusOffset(newValue);
                        field.onChange(newValueZeroHour);
                    }}
                    onChangeStart={(field) => (newValue) => {
                        const newValueZeroHour =
                            startDayAndMinusOffset(newValue);
                        field.onChange(newValueZeroHour);
                    }}
                    restForEnd={{
                        rules: {
                            required:
                                'Дата окончания является обязательным полем',
                        },
                    }}
                    restForStart={{
                        rules: {
                            required:
                                'Дата начала является обязательным полем',
                        },
                    }}
                />
            </Stack>
            <RHFTextField label="Описание" name="description" multiline rows={4} disabled={!isEditing} />
            <Stack direction="row" spacing={1}>
                <RHFSelect
                    disabled={!isEditing}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                        native: false,
                        sx: { textTransform: 'capitalize' },
                    }}
                    fullWidth
                    label="Статус" name="state" sx={{ width: '50%' }}
                    value={state || ''}
                >
                    {states.states.map((state) => (
                        <MenuItem
                            key={state.id}
                            sx={{
                                borderRadius: 0.75,
                                mx: 1,
                                my: 0.5,
                                textTransform: 'capitalize',
                                typography: 'body2',
                            }}
                            value={state.id}
                        >
                            {state.RU}
                        </MenuItem>
                    ))}
                </RHFSelect>
                <RHFSelect
                    disabled={!isEditing}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                        native: false,
                        sx: { textTransform: 'capitalize' },
                    }}
                    fullWidth
                    label="Приоритет" name="priority" sx={{ width: '50%' }}
                    value={priority || ''}
                >
                    {priorities.priorities.map((priority) => (
                        <MenuItem
                            key={priority.id}
                            sx={{
                                borderRadius: 0.75,
                                mx: 1,
                                my: 0.5,
                                textTransform: 'capitalize',
                                typography: 'body2',
                            }}
                            value={priority.id}
                        >
                            {priority.RU}
                        </MenuItem>
                    ))}
                </RHFSelect>
            </Stack>
        </Stack>
    )
}