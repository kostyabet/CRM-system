import {
    Card,
    CardHeader,
    LinearProgress,
    Stack,
    Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { fCurrency, fPercent } from '~/shared/utils/formatNumber';

// ----------------------------------------------------------------------

EcommerceSalesOverview.propTypes = {
    data: PropTypes.array.isRequired,
    subheader: PropTypes.string,
    title: PropTypes.string,
};

export default function EcommerceSalesOverview({
    data,
    subheader,
    title,
    ...other
}) {
    return (
        <Card {...other}>
            <CardHeader subheader={subheader} title={title} />

            <Stack spacing={4} sx={{ p: 3 }}>
                {data.map((progress) => (
                    <ProgressItem key={progress.label} progress={progress} />
                ))}
            </Stack>
        </Card>
    );
}

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
    progress: PropTypes.shape({
        amount: PropTypes.number,
        label: PropTypes.string,
        value: PropTypes.number,
    }),
};

function ProgressItem({ progress }) {
    return (
        <Stack spacing={1}>
            <Stack alignItems="center" direction="row">
                <Typography sx={{ flexGrow: 1 }} variant="subtitle2">
                    {progress.label}
                </Typography>
                <Typography variant="subtitle2">
                    {fCurrency(progress.amount)}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }} variant="body2">
                    &nbsp;({fPercent(progress.value)})
                </Typography>
            </Stack>

            <LinearProgress
                color={
                    (progress.label === 'Total Income' && 'info') ||
                    (progress.label === 'Total Expenses' && 'warning') ||
                    'primary'
                }
                value={progress.value}
                variant="determinate"
            />
        </Stack>
    );
}
