import { Card, CardHeader, Link, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import Iconify from './../../../../components/Iconify';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
    flexShrink: 0,
    height: 20,
    marginRight: theme.spacing(2),
    marginTop: 1,
    width: 20,
}));

// ----------------------------------------------------------------------

ProfileSocialInfo.propTypes = {
    profile: PropTypes.object,
};

export default function ProfileSocialInfo({ profile }) {
    const { facebookLink, instagramLink, linkedinLink, twitterLink } = profile;

    const SOCIALS = [
        {
            href: linkedinLink,
            icon: <IconStyle color="#006097" icon={'eva:linkedin-fill'} />,
            name: 'Linkedin',
        },
        {
            href: twitterLink,
            icon: <IconStyle color="#1C9CEA" icon={'eva:twitter-fill'} />,
            name: 'Twitter',
        },
        {
            href: instagramLink,
            icon: (
                <IconStyle
                    color="#D7336D"
                    icon={'ant-design:instagram-filled'}
                />
            ),
            name: 'Instagram',
        },
        {
            href: facebookLink,
            icon: <IconStyle color="#1877F2" icon={'eva:facebook-fill'} />,
            name: 'Facebook',
        },
    ];

    return (
        <Card>
            <CardHeader title="Social" />
            <Stack spacing={2} sx={{ p: 3 }}>
                {SOCIALS.map((link) => (
                    <Stack alignItems="center" direction="row" key={link.name}>
                        {link.icon}
                        <Link
                            color="text.primary"
                            component="span"
                            noWrap
                            variant="body2"
                        >
                            {link.href}
                        </Link>
                    </Stack>
                ))}
            </Stack>
        </Card>
    );
}
