import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from 'react';
import React from 'react';
import ErrorBoundary from "./../../components/common/error/ErrorBoundary"
import LoadingScreen from './../../components/common/loading/LoadingScreen';
import GuestGuard from './../guards/GuestGuard';

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
            // children: [{
                
            // }],
            element: (
                // <AuthGuard>
                    <MainPage />
                // </AuthGuard>
            ),
            path: '/',
        }
    ])
}

// AUTHENTICATION
const Login = Loadable(
    lazy(() => import('./../../pages/AuthorizationPage/Login'))
);

const MainPage = Loadable(
    lazy(() => import('./../../pages/MainPage/MainPage'))
);