import PropTypes from 'prop-types';
import useAuth from './../../shared/hooks/useAuth';
import React from 'react';
import LoadingScreen from '../../components/common/loading/LoadingScreen';
import { Navigate } from 'react-router-dom';
import { PATH_AFTER_LOGIN } from './../../application/config';

GuestGuard.propTypes = {
    children: PropTypes.node,
};

export default function GuestGuard({ children }) {
    const { isAuthenticated, isInitialized } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={PATH_AFTER_LOGIN} />;
    }

    if (!isInitialized) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
}