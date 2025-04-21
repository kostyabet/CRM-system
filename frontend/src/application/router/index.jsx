import { Navigate, useRoutes } from "react-router-dom";
import { Suspense, lazy } from 'react';
import React from 'react';
import ErrorBoundary from "./../../components/common/error/ErrorBoundary"
import LoadingScreen from './../../components/common/loading/LoadingScreen';
import GuestGuard from './../guards/GuestGuard';
import LogoOnlyLayout from './../layouts/LogoOnlyLayout';

const Loadable = (Component) => (props) => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <ErrorBoundary>
                <Component {...props} />
            </ErrorBoundary>
        </Suspense>
    );
};

export function Router() {
    return useRoutes([
        {
            children: [{
                element: (
                    <GuestGuard>
                        <Login />
                    </GuestGuard>
                ),
                path: 'login'
            }],
            path: 'auth',
        },
        {
            element: (
                // <AuthGuard>
                    <MainPage />
                // </AuthGuard>
            ),
            path: '/',
        },

        // MainRoutes
        {
            children: [
                { element: <Page500 />, path: '500' },
                { element: <Page404 />, path: '404' },
                { element: <Page403 />, path: '403' },
                { element: <Navigate replace to="/404" />, path: '*' },
            ],
            // element: <LogoOnlyLayout />, LAYOUT FOR ALL ERROR PAGES
            path: '*'
        },
        { element: <Navigate replace to="/404" />, path: '*' },
    ])
}

// AUTHENTICATION
const Login = Loadable(
    lazy(() => import('./../../pages/AuthorizationPage/Login'))
);

const MainPage = Loadable(
    lazy(() => import('./../../pages/MainPage/MainPage'))
);

// MAIN
const Page500 = Loadable(lazy(() => import('./../../pages/Page500')));
const Page403 = Loadable(lazy(() => import('./../../pages/Page403')));
const Page404 = Loadable(lazy(() => import('./../../pages/Page404')));
