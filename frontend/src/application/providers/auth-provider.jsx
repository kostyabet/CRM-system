import React, { createContext, useEffect, useReducer } from 'react';
import { setSession } from '~/shared/utils/jwt';

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
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    method: 'jwt',
});

const reducer = (state, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

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

    const login = async (login, pass) => {
        console.log(login, pass)
        // EXEMPLE
        // -----------------------------------------------------
        // const response = await httpClient.post('/login', {
        //     login,
        //     pass,
        // });
        // const { accessToken, refreshToken, user } = response.data;
        // setSession(accessToken, refreshToken);

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