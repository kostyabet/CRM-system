import { useUserInfo } from './../entities/user';
import createAvatar from './../shared/utils/createAvatar';
import React from 'react';
import { API_URL } from '~/application/config';

//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
    const { data: user } = useUserInfo();

    const userDisplayName = user?.firstName;
    const userAvatar = user?.photoURL;

    return (
        <Avatar
            alt={userDisplayName}
            color={user?.photoURL ? 'default' : createAvatar(userDisplayName).color}
            // src={`${API_URL}${userAvatar}`}
            {...other}
        >
            {createAvatar(userDisplayName).name}
        </Avatar>
    );
}
