import { Grid, Stack } from '@mui/material';
import PropTypes from 'prop-types';

//
import ProfileAbout from './ProfileAbout';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileSocialInfo from './ProfileSocialInfo';

// ----------------------------------------------------------------------

Profile.propTypes = {
    myProfile: PropTypes.object,
    posts: PropTypes.array,
};

export default function Profile({ myProfile, posts }) {
    return (
        <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
                <Stack spacing={3}>
                    <ProfileFollowInfo profile={myProfile} />
                    <ProfileAbout profile={myProfile} />
                    <ProfileSocialInfo profile={myProfile} />
                </Stack>
            </Grid>

            <Grid item md={8} xs={12}>
                <Stack spacing={3}>
                    <ProfilePostInput />
                    {posts.map((post) => (
                        <ProfilePostCard key={post.id} post={post} />
                    ))}
                </Stack>
            </Grid>
        </Grid>
    );
}
