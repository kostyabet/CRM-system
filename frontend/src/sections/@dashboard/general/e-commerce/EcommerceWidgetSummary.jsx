import { Box, Card, Skeleton, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

// ----------------------------------------------------------------------

EcommerceWidgetSummary.propTypes = {
    chartColor: PropTypes.string,
    chartData: PropTypes.arrayOf(PropTypes.number),
    img: PropTypes.string,
    percent: PropTypes.number,
    sx: PropTypes.object,
    title: PropTypes.string,
    total: PropTypes.number,
};

export default function EcommerceWidgetSummary({
    data,
    img,
    isLoading,
    sx,
    title,
    ...other
}) {
    return (
        <Card
            sx={{ alignItems: 'center', display: 'flex', p: 3, ...sx }}
            {...other}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Typography paragraph variant="subtitle2">
                    {title}
                </Typography>
                <Stack spacing={2}>
                    {data.map((item) => (
                        <Legend
                            isLoading={isLoading}
                            item={item}
                            key={item.label}
                        />
                    ))}
                </Stack>
            </Box>
            <img alt="jkl" src={img} width="50px" />
        </Card>
    );
}

function Legend({ isLoading, item }) {
    return (
        <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
        >
            <Stack alignItems="center" direction="row">
                <Box
                    sx={{
                        bgcolor: 'grey.50016',
                        borderRadius: 0.75,
                        height: 16,
                        mr: 1,
                        width: 16,
                        ...(item.label === '' && {
                            bgcolor: 'primary.main',
                        }),
                    }}
                />

                <Typography sx={{ color: 'text.secondary' }} variant="body2">
                    <Stack direction="row" gap={1}>
                        {isLoading ? (
                            <Skeleton
                                variant="text"
                                width={'15px'} /* height={50} */
                            />
                        ) : (
                            <span>{item.value}</span>
                        )}
                        {item.label}
                    </Stack>
                </Typography>
            </Stack>
        </Stack>
    );
}
