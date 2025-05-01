import React from 'react';
import { Box, Card, Container, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from './../../application/router/paths';
import { useUserInfo } from './../../entities/user';
import { ProfileCover } from './../../sections/@dashboard/user/profile';
import HeaderBreadcrumbs from './../../components/HeaderBreadcrumbs';
import Page from './../../components/Page';
import useSettings from './../../shared/hooks/useSettings';
import useTabs from './../../shared/hooks/useTabs';
import { userFullName } from '~/shared/utils/auxiliaryFn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import InfoIcon from '@mui/icons-material/Info';
import UserInfoCard from '~/components/user/UserInfoCard';
import { fetchUserInfoById } from '~/entities/user/api';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    bottom: 0,
    display: 'flex',
    position: 'absolute',
    [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-end',
        paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
        justifyContent: 'center',
    },
    width: '100%',
    zIndex: 9,
}));

// ----------------------------------------------------------------------

export default function UserPage() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { themeStretch } = useSettings();
    const { data: user, refetch } = useUserInfo();
    const param = useParams();
    const paramId = param?.id ? +param.id : param?.id;
    
    const isParamsPassedButNotEqual =
        paramId && paramId !== user?.id;
    let userInfo = {};
    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await fetchUserInfoById(paramId);
                console.log(data);
                userInfo = {};
            } catch (err) {
                enqueueSnackbar('Ошибка при загрузке данных пользователя', {
                    variant: 'error',
                });
                navigate(PATH_DASHBOARD.user.list);
            }
        }
        if (isParamsPassedButNotEqual) {
            fetchUser();
        }
    }, []);

    let userData;
    if (paramId) {
        userData = userInfo;
    } else {
        userData = user;
    }

    const { currentTab, onChangeTab } = useTabs('Задачи', 'Информация');

    const PROFILE_TABS = [
        {
            component: <p>Задачи</p>,//<GantCalendarProjects userId={userData.id} />,
            icon: (
                <ScheduleIcon sx={{ ml: 1, height: 20, width: 20 }}/>
            ),
            value: 'Задачи',
        },
        {
            component: <UserInfoCard user={userData} refetch={refetch}/>,
            icon: (
                <InfoIcon sx={{ height: 20, width: 20 }}/>
            ),
            value: 'Информация',
        },
    ];

    return (
        <Page title="Пользователь: Профиль">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Профиль"
                    links={[
                        { href: PATH_DASHBOARD.general.app, name: 'Dashboard' },
                        {
                            href: PATH_DASHBOARD.user.profile,
                            name: 'Пользователь',
                        },
                        { name: userFullName(userData) },
                    ]}
                />
                <Card
                    sx={{
                        height: 280,
                        mb: 3,
                        position: 'relative',
                    }}
                >
                    <ProfileCover user={userData} />

                    <TabsWrapperStyle>
                        <Tabs
                            allowScrollButtonsMobile
                            onChange={onChangeTab}
                            scrollButtons="auto"
                            value={currentTab}
                            variant="scrollable"
                        >
                            {PROFILE_TABS.map((tab) => (
                                <Tab
                                    disableRipple
                                    icon={tab.icon}
                                    key={tab.value}
                                    label={tab.value}
                                    value={tab.value}
                                />
                            ))}
                        </Tabs>
                    </TabsWrapperStyle>
                </Card>

                {PROFILE_TABS.map((tab) => {
                    const isMatched = tab.value === currentTab;
                    return (
                        isMatched && <Box key={tab.value}>{tab.component}</Box>
                    );
                })}
            </Container>
        </Page>
    );
}