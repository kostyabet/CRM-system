import React, { StrictMode } from 'react'

export const MainPage = () => {
    
    fetch('http://localhost:5000/api/auth/test', { method: 'GET' }).then((response) => {
        console.log('direct response', response.data);
    })

    fetch('http://localhost:5000/api/auth/test', { method: 'GET' }).then((response) => {
        console.log('getaway response', response.data);
    })

    return (
        <p>
            This is text message!
        </p>
    )
}