const setSession = (accessToken, refreshToken) => {
    if (accessToken) {
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
        localStorage.setItem('accessToken', accessToken);
    } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
};

export { setSession };