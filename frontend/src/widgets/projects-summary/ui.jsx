import { Grid } from '@mui/material';
import React from 'react';
import CircularProgressCustom from '~/components/common/loading/CircularProgress';

import { useProjectsSummary } from '~/entities/task';
import { EcommerceWidgetSummary } from '~/sections/@dashboard/general/e-commerce';
import warehouse2 from '~/shared/assets/img/warehouse2.png';
import warehouse3 from '~/shared/assets/img/warehouse3.png';
import warehouse4 from '~/shared/assets/img/warehouse4.png';
import warehouse5 from '~/shared/assets/img/warehouse5.png';

export const ProjectsSummary = () => {
    const { data: summary, isLoading } = useProjectsSummary();

    if (isLoading)
        return <CircularProgressCustom />

    const summaryData = [
        {
            id: 0,
            title: "Готово к работе",
            img: warehouse2,
            value: summary["Готово к работе"],
            label: ''
        },
        {
            id: 1,
            title: "В работе",
            img: warehouse3,
            value: summary["В работе"],
            label: ''
        },
        {
            id: 2,
            title: "На проверке",
            img: warehouse4,
            value: summary["На проверке"],
            label: ''
        },
        {
            id: 3,
            title: "Выполнено",
            img: warehouse5,
            value: summary["Выполнено"],
            label: ''
        }
    ]

    return (
        <>
            {summaryData.map((item) => 
                <Grid item key={item.id} sx={{ width: { xs: '100%', md: '23.71%' } }}>
                    <EcommerceWidgetSummary
                        data={[
                            { label: item.label, value: item.value },
                        ]}
                        img={item.img}
                        isLoading={isLoading}
                        title={item.title}
                    />
                </Grid>
            )}
        </>
    );
};
