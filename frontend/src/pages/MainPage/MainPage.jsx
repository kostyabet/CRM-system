import React, { StrictMode } from 'react'

export const MainPage = () => {
    
    fetch('http://localhost:80/api/auth/test', { method: 'GET' }).then((response) => {
        console.log(response.data);
    })

    return (
        <p>
            This is text message!
        </p>
    )
}