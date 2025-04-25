import { Card, CardHeader, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import Iconify from '~/components/Iconify';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
    flexShrink: 0,
    height: 20,
    marginRight: theme.spacing(2),
    marginTop: 1,
    width: 20,
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
    profile: PropTypes.object,
};

export default function ProfileAbout({ profile }) {
    const { company, country, email, quote, role, school } = profile;

    return (
        <Card>
            <CardHeader title="About" />

            <Stack spacing={2} sx={{ p: 3 }}>
                <Typography variant="body2">{quote}</Typography>

                <Stack direction="row">
                    <IconStyle icon={'eva:pin-fill'} />
                    <Typography variant="body2">
                        Live at &nbsp;
                        <Link
                            color="text.primary"
                            component="span"
                            variant="subtitle2"
                        >
                            {country}
                        </Link>
                    </Typography>
                </Stack>

                <Stack direction="row">
                    <IconStyle icon={'eva:email-fill'} />
                    <Typography variant="body2">{email}</Typography>
                </Stack>

                <Stack direction="row">
                    <IconStyle icon={'ic:round-business-center'} />
                    <Typography variant="body2">
                        {role} at &nbsp;
                        <Link
                            color="text.primary"
                            component="span"
                            variant="subtitle2"
                        >
                            {company}
                        </Link>
                    </Typography>
                </Stack>

                <Stack direction="row">
                    <IconStyle icon={'ic:round-business-center'} />
                    <Typography variant="body2">
                        Studied at &nbsp;
                        <Link
                            color="text.primary"
                            component="span"
                            variant="subtitle2"
                        >
                            {school}
                        </Link>
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}
