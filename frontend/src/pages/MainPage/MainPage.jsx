import React, { StrictMode } from 'react'

export const MainPage = () => {
    
    fetch('http://localhost:8080/api/auth/test', { method: 'GET' }).then((response) => {
        console.log('direct response', response.data);
    })

    return (
        <p>
            This is text message!
        </p>
    )
}