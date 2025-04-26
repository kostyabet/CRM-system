import {
    Avatar,
    AvatarGroup,
    Box,
    Card,
    CardHeader,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useUserInfo } from './../../../../entities/user';
import EmojiPicker from './../../../../components/EmojiPicker';
import Iconify from './../../../../components/Iconify';
import Image from './../../../../components/Image';
import MyAvatar from './../../../../components/MyAvatar';
import { fShortenNumber } from './../../../../shared/utils/formatNumber';
import { fDate } from './../../../../shared/utils/formatTime';

// ----------------------------------------------------------------------

ProfilePostCard.propTypes = {
    post: PropTypes.object,
};

export default function ProfilePostCard({ post }) {
    const { data: user } = useUserInfo();

    const commentInputRef = useRef(null);

    const fileInputRef = useRef(null);

    const [isLiked, setLiked] = useState(post.isLiked);

    const [likes, setLikes] = useState(post.personLikes.length);

    const [message, setMessage] = useState('');

    const hasComments = post.comments.length > 0;

    const handleLike = () => {
        setLiked(true);
        setLikes((prevLikes) => prevLikes + 1);
    };

    const handleUnlike = () => {
        setLiked(false);
        setLikes((prevLikes) => prevLikes - 1);
    };

    const handleChangeMessage = (value) => {
        setMessage(value);
    };

    const handleClickAttach = () => {
        fileInputRef.current?.click();
    };

    const handleClickComment = () => {
        commentInputRef.current?.focus();
    };

    return (
        <Card>
            <CardHeader
                action={
                    <IconButton>
                        <Iconify
                            height={20}
                            icon={'eva:more-vertical-fill'}
                            width={20}
                        />
                    </IconButton>
                }
                avatar={<MyAvatar />}
                disableTypography
                subheader={
                    <Typography
                        sx={{ color: 'text.secondary', display: 'block' }}
                        variant="caption"
                    >
                        {fDate(post.createdAt)}
                    </Typography>
                }
                title={
                    <Link
                        color="text.primary"
                        component={RouterLink}
                        to="#"
                        variant="subtitle2"
                    >
                        {user?.firstName}
                    </Link>
                }
            />

            <Stack spacing={3} sx={{ p: 3 }}>
                <Typography>{post.message}</Typography>

                <Image
                    alt="post media"
                    ratio="16/9"
                    src={post.media}
                    sx={{ borderRadius: 1 }}
                />

                <Stack alignItems="center" direction="row">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isLiked}
                                checkedIcon={
                                    <Iconify icon={'eva:heart-fill'} />
                                }
                                color="error"
                                icon={<Iconify icon={'eva:heart-fill'} />}
                                onChange={isLiked ? handleUnlike : handleLike}
                                size="small"
                            />
                        }
                        label={fShortenNumber(likes)}
                        sx={{ minWidth: 72, mr: 0 }}
                    />
                    <AvatarGroup
                        max={4}
                        sx={{ '& .MuiAvatar-root': { height: 32, width: 32 } }}
                    >
                        {post.personLikes.map((person) => (
                            <Avatar
                                alt={person.name}
                                key={person.name}
                                src={person.avatarUrl}
                            />
                        ))}
                    </AvatarGroup>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton onClick={handleClickComment}>
                        <Iconify
                            height={20}
                            icon={'eva:message-square-fill'}
                            width={20}
                        />
                    </IconButton>
                    <IconButton>
                        <Iconify
                            height={20}
                            icon={'eva:share-fill'}
                            width={20}
                        />
                    </IconButton>
                </Stack>

                {hasComments && (
                    <Stack spacing={1.5}>
                        {post.comments.map((comment) => (
                            <Stack direction="row" key={comment.id} spacing={2}>
                                <Avatar
                                    alt={comment.author.name}
                                    src={comment.author.avatarUrl}
                                />
                                <Paper
                                    sx={{
                                        bgcolor: 'background.neutral',
                                        flexGrow: 1,
                                        p: 1.5,
                                    }}
                                >
                                    <Stack
                                        alignItems={{ sm: 'center' }}
                                        direction={{ sm: 'row', xs: 'column' }}
                                        justifyContent="space-between"
                                        sx={{ mb: 0.5 }}
                                    >
                                        <Typography variant="subtitle2">
                                            {comment.author.name}
                                        </Typography>
                                        <Typography
                                            sx={{ color: 'text.disabled' }}
                                            variant="caption"
                                        >
                                            {fDate(comment.createdAt)}
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        sx={{ color: 'text.secondary' }}
                                        variant="body2"
                                    >
                                        {comment.message}
                                    </Typography>
                                </Paper>
                            </Stack>
                        ))}
                    </Stack>
                )}

                <Stack alignItems="center" direction="row">
                    <MyAvatar />
                    <TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickAttach}
                                        size="small"
                                    >
                                        <Iconify
                                            height={24}
                                            icon={
                                                'ic:round-add-photo-alternate'
                                            }
                                            width={24}
                                        />
                                    </IconButton>
                                    <EmojiPicker
                                        alignRight
                                        setValue={setMessage}
                                        value={message}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                        inputRef={commentInputRef}
                        onChange={(event) =>
                            handleChangeMessage(event.target.value)
                        }
                        placeholder="Write a comment…"
                        size="small"
                        sx={{
                            '& fieldset': {
                                borderColor: (theme) =>
                                    `${theme.palette.grey[500_32]} !important`,
                                borderWidth: `1px !important`,
                            },
                            ml: 2,
                            mr: 1,
                        }}
                        value={message}
                    />
                    <IconButton>
                        <Iconify
                            height={24}
                            icon={'ic:round-send'}
                            width={24}
                        />
                    </IconButton>
                    <input
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        type="file"
                    />
                </Stack>
            </Stack>
        </Card>
    );
}
