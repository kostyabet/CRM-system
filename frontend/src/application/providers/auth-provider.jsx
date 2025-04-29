import React, { createContext, useEffect, useReducer } from 'react';
import { setSession } from '~/shared/utils/jwt';
import { httpClient } from '~/shared/api';
import { useQueryClient } from '@tanstack/react-query';

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
};

const handlers = {
    INITIALIZE: (state, action) => {
        const { isAuthenticated } = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
        };
    },
    LOGIN: (state) => {
        return {
            ...state,
            isAuthenticated: true,
            isInitialized: true,
        };
    },
    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
    }),
};

const AuthContext = createContext({
    ...initialState,
    register: () => Promise.resolve(),
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    method: 'jwt',
});

const reducer = (state, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const queryClient = useQueryClient();

    useEffect(() => {
        const initialize = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    // some moves
                    dispatch({
                        payload: {
                            isAuthenticated: true,
                        },
                        type: 'INITIALIZE',
                    });
                } else {
                    dispatch({
                        payload: {
                            isAuthenticated: false,
                        },
                        type: 'INITIALIZE',
                    });
                }
            } catch {
                dispatch({
                    payload: {
                        isAuthenticated: false,
                    },
                    type: 'INITIALIZE',
                });
            }
        }
            
        initialize();
    }, []);

    const register = async (data) => {
        const formData = new FormData();

        if (data.photoURL && data.photoURL instanceof File) {
            formData.append('photoURL', data.photoURL);
        }

        formData.append('login', data.login);
        formData.append('password', data.password);
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('phone', data.phone);
        formData.append('email', data.email);
        formData.append('role', data.role);
        
        await httpClient.post('/auth/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    const login = async (login, pass) => {
        const response = await httpClient.post('/auth/login', {
            login,
            pass,
        });
        const { accessToken, refreshToken, user } = response.data;
        setSession(accessToken, refreshToken);
        queryClient.setQueryData(['me'], user);

        dispatch({ type: 'LOGIN' });
    }

    const logout = async () => {
        setSession(null);
        dispatch({ type: 'LOGOUT' });
    }

    return(
        <AuthContext.Provider
            value={{
                ...state,
                register,
                login,
                logout,
                method: 'jwt',
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
}