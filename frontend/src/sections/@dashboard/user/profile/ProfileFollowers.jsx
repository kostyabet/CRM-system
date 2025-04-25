import { Avatar, Box, Button, Card, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

import Iconify from './../../../../components/Iconify';

// ----------------------------------------------------------------------

ProfileFollowers.propTypes = {
    followers: PropTypes.array,
};

export default function ProfileFollowers({ followers }) {
    return (
        <Box sx={{ mt: 5 }}>
            <Typography sx={{ mb: 3 }} variant="h4">
                Followers
            </Typography>

            <Grid container spacing={3}>
                {followers.map((follower) => (
                    <Grid item key={follower.id} md={4} xs={12}>
                        <FollowerCard follower={follower} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

// ----------------------------------------------------------------------

FollowerCard.propTypes = {
    follower: PropTypes.object,
};

function FollowerCard({ follower }) {
    const { avatarUrl, country, isFollowed, name } = follower;

    const [toggle, setToogle] = useState(isFollowed);

    return (
        <Card sx={{ alignItems: 'center', display: 'flex', p: 3 }}>
            <Avatar alt={name} src={avatarUrl} sx={{ height: 48, width: 48 }} />
            <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
                <Typography noWrap variant="subtitle2">
                    {name}
                </Typography>
                <Box sx={{ alignItems: 'center', display: 'flex' }}>
                    <Iconify
                        icon={'eva:pin-fill'}
                        sx={{ flexShrink: 0, height: 16, mr: 0.5, width: 16 }}
                    />
                    <Typography
                        noWrap
                        sx={{ color: 'text.secondary' }}
                        variant="body2"
                    >
                        {country}
                    </Typography>
                </Box>
            </Box>
            <Button
                color={toggle ? 'primary' : 'inherit'}
                onClick={() => setToogle(!toggle)}
                size="small"
                startIcon={toggle && <Iconify icon={'eva:checkmark-fill'} />}
                variant={toggle ? 'text' : 'outlined'}
            >
                {toggle ? 'Followed' : 'Follow'}
            </Button>
        </Card>
    );
}
