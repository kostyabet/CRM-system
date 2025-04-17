import PropTypes from 'prop-types';
import useAuth from './../../shared/hooks/useAuth';
import React from 'react';

GuestGuard.propTypes = {
    children: PropTypes.node,
};

export default function GuestGuard({ children }) {
    const { isAuthenticated, isInitialized } = useAuth();

    if (isAuthenticated) {
    //     return <Navigate to={PATH_AFTER_LOGIN} />;
    }

    if (!isInitialized) {
    //     return <LoadingScreen />;
    }

    return <>{children}</>;
}