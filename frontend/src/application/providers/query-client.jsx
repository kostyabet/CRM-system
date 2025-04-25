import {
    QueryClientProvider as _QueryClientProvider,
    QueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

const queryClient = new QueryClient();

export const QueryClientProvider = ({ children }) => {
    return (
        <_QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
        </_QueryClientProvider>
    );
};
