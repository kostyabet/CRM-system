import { Card, Divider, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { fNumber } from '~/shared/utils/formatNumber';

// ----------------------------------------------------------------------

ProfileFollowInfo.propTypes = {
    profile: PropTypes.shape({
        follower: PropTypes.number,
        following: PropTypes.number,
    }),
};

export default function ProfileFollowInfo({ profile }) {
    const { follower, following } = profile;

    return (
        <Card sx={{ py: 3 }}>
            <Stack
                direction="row"
                divider={<Divider flexItem orientation="vertical" />}
            >
                <Stack textAlign="center" width={1}>
                    <Typography variant="h4">{fNumber(follower)}</Typography>
                    <Typography
                        sx={{ color: 'text.secondary' }}
                        variant="body2"
                    >
                        Follower
                    </Typography>
                </Stack>

                <Stack textAlign="center" width={1}>
                    <Typography variant="h4">{fNumber(following)}</Typography>
                    <Typography
                        sx={{ color: 'text.secondary' }}
                        variant="body2"
                    >
                        Following
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}
