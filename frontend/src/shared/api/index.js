import axios from 'axios';
import { API_URL } from './../../application/config';

export const httpClient = axios.create({
    baseURL: API_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

httpClient.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response?.status === 403 &&
            error.config &&
            !error.config._isRetry
        ) {
            try {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ reject, resolve });
                    })
                        .then((token) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            return axios(originalRequest);
                        })
                        .catch((err) => Promise.reject(err));
                }
                originalRequest._isRetry = true; // set flag that request we are retrying
                isRefreshing = true;
                const refreshTokenStorage =
                    localStorage.getItem('refreshToken');
                return new Promise((resolve, reject) => {
                    const params = new URLSearchParams();
                    params.append('token', refreshTokenStorage);
                    axios
                        .post(`${API_URL}/auth/refresh`, params, { // change update jwt url
                            headers: {
                                'content-type':
                                    'application/x-www-form-urlencoded',
                            },
                        })
                        .then(({ data }) => {
                            window.localStorage.setItem(
                                'accessToken',
                                data.accessToken,
                            );
                            window.localStorage.setItem(
                                'refreshToken',
                                data.refreshToken,
                            );

                            httpClient.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
                            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                            processQueue(null, data.accessToken);
                            resolve(httpClient(originalRequest));
                        })
                        .catch((err) => {
                            processQueue(err, null);
                            reject(err);
                        })
                        .then(() => {
                            isRefreshing = false;
                        });
                });
            } catch (e) {
                console.error('Token expired', e);
            }
        }
        throw error; // if res error not 403
    }
)

httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});
