import createAvatar from './../shared/utils/createAvatar';
import React from 'react';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function ProfileAvatar({ userNameFields, ...other }) {
    return (
        <Avatar
            alt={userNameFields?.lastName}
            color={
                userNameFields?.avatar
                    ? 'default'
                    : createAvatar(userNameFields?.lastName).color
            }
            src={userNameFields?.avatar}
            {...other}
        >
            {createAvatar(userNameFields?.firstName).name}
        </Avatar>
    );
}
