import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import Login from './../../pages/AuthorizationPage/Login';
import LoadingScreen from '../../components/common/loading/LoadingScreen';
import useAuth from '../../shared/hooks/useAuth';

AuthGuard.propTypes = {
    children: PropTypes.node,
};

export default function AuthGuard({ children }) {
    const { isAuthenticated, isInitialized } = useAuth();

    const { pathname } = useLocation();

    const [requestedLocation, setRequestedLocation] = useState(null);

    if (!isInitialized) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname);
        }
        return <Login />;
    }

    if (requestedLocation && pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }

    return children;
}