import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from 'react';
import React from 'react';
import ErrorBoundary from "./../../components/common/error/ErrorBoundary"
import LoadingScreen from './../../components/common/loading/LoadingScreen';

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
                    <Login />
                ),
                path: 'login'
            }],
            path: 'auth',
        },
        {
            children: [{
                element: (<MainPage />),
                path: 'main'
            }],
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