import React, { Component } from 'react';
import ErrorRenderComponent from './ErrorRenderComponent';

class OfflineError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Отсутствует подключение к интернету';
        this.stack = null;
    }
}

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        // initialize the error state
        this.state = { error: null, errorInfo: null, hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error(error);
        console.error(info);
        if (!navigator.onLine) {
            const offlineError = new OfflineError(
                'Отсутствует подключение к интернету',
            );
            this.setState({ error: offlineError, errorInfo: 'Offline' });
        } else {
            this.setState({ error, errorInfo: info });
        }
    }

    componentWillUnmount() {
        // Reset the error state when the component is unmounted
        if (this.state.hasError) {
            this.setState({ error: null, errorInfo: null, hasError: false });
            window.location.reload();
        }
    }

    render() {
        if (this.state.hasError && this.state.error) {
            return (
                <ErrorRenderComponent
                    error={this.state.error}
                    errorInfo={this.state.errorInfo}
                />
            )
        }

        return this.props.children;
    }
}
