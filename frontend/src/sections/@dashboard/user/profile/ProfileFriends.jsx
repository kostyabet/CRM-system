import {
    Avatar,
    Box,
    Card,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

import Iconify from './../../../../components/Iconify';
import InputStyle from './../../../../components/InputStyle';
import SearchNotFound from './../../../../components/SearchNotFound';
import SocialsButton from './../../../../components/SocialsButton';

// ----------------------------------------------------------------------

ProfileFriends.propTypes = {
    findFriends: PropTypes.string,
    friends: PropTypes.array,
    onFindFriends: PropTypes.func,
};

export default function ProfileFriends({
    findFriends,
    friends,
    onFindFriends,
}) {
    const friendFiltered = applyFilter(friends, findFriends);

    const isNotFound = friendFiltered.length === 0;

    return (
        <Box sx={{ mt: 5 }}>
            <Typography sx={{ mb: 3 }} variant="h4">
                Friends
            </Typography>

            <InputStyle
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify
                                icon={'eva:search-fill'}
                                sx={{
                                    color: 'text.disabled',
                                    height: 20,
                                    width: 20,
                                }}
                            />
                        </InputAdornment>
                    ),
                }}
                onChange={(event) => onFindFriends(event.target.value)}
                placeholder="Find friends..."
                stretchStart={240}
                sx={{ mb: 5 }}
                value={findFriends}
            />

            <Grid container spacing={3}>
                {friendFiltered.map((friend) => (
                    <Grid item key={friend.id} md={4} xs={12}>
                        <FriendCard friend={friend} />
                    </Grid>
                ))}
            </Grid>

            {isNotFound && (
                <Box sx={{ mt: 5 }}>
                    <SearchNotFound searchQuery={findFriends} />
                </Box>
            )}
        </Box>
    );
}

// ----------------------------------------------------------------------

FriendCard.propTypes = {
    friend: PropTypes.object,
};

function FriendCard({ friend }) {
    const { avatarUrl, name, role } = friend;

    return (
        <Card
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                py: 5,
            }}
        >
            <Avatar
                alt={name}
                src={avatarUrl}
                sx={{ height: 64, mb: 3, width: 64 }}
            />
            <Link color="text.primary" variant="subtitle1">
                {name}
            </Link>

            <Typography sx={{ color: 'text.secondary', mb: 1 }} variant="body2">
                {role}
            </Typography>

            <SocialsButton initialColor />

            <IconButton sx={{ position: 'absolute', right: 8, top: 8 }}>
                <Iconify
                    height={20}
                    icon={'eva:more-vertical-fill'}
                    width={20}
                />
            </IconButton>
        </Card>
    );
}
// ----------------------------------------------------------------------

function applyFilter(array, query) {
    if (query) {
        return array.filter(
            (friend) =>
                friend.name.toLowerCase().indexOf(query.toLowerCase()) !== -1,
        );
    }

    return array;
}
