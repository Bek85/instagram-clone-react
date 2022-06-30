import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePostStyles } from '@/styles';
import UserCard from '@/components/shared/UserCard';

import {
  MoreIcon,
  CommentIcon,
  ShareIcon,
  UnlikeIcon,
  LikeIcon,
  SaveIcon,
  RemoveIcon,
} from '@/icons';
import {
  Button,
  collapseClasses,
  Divider,
  Hidden,
  Typography,
  TextField,
} from '@mui/material';

import OptionsDialog from '@/components/shared/OptionsDialog';
import { defaultPost } from '@/data';
import PostSkeleton from './PostSkeleton';

function Post() {
  const classes = usePostStyles();
  const [showOptionsDialog, setShowOptionsDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const { media, id, likes, user, caption, comments } = defaultPost;

  setTimeout(() => setLoading(false), 2000);

  if (loading) {
    return <PostSkeleton />;
  }

  return (
    <div className={classes.postContainer}>
      <article className={classes.article}>
        {/* Post Header */}
        <div className={classes.postHeader}>
          <UserCard user={user} avatarSize={32} />
          <MoreIcon
            onClick={() => setShowOptionsDialog(true)}
            className={collapseClasses.moreIcon}
          />
        </div>
        {/* Post Image */}
        <div className={classes.postImage}>
          <img src={media} alt="post media" className={classes.image} />
        </div>
        {/* Post Buttons */}

        <div className={classes.postButtonsWrapper}>
          <div className={classes.postButtons}>
            <LikeButton />
            <Link to={`/p/${id}`}>
              <CommentIcon />
            </Link>
            <ShareIcon />
            <SaveButton />
          </div>
        </div>
        <div style={{ padding: '0 3%' }}>
          <Typography className={classes.likes} variant="subtitle2">
            <span>{likes <= 1 ? `${likes} like` : `${likes} likes`}</span>
          </Typography>
          <div className={classes.postCaptionContainer}>
            <Typography
              variant="body2"
              component="span"
              className={classes.postCaption}
              dangerouslySetInnerHTML={{ __html: caption }}
            />
            {comments.map((comment) => (
              <div key={comment.id}>
                <Link to={`/${comment.user.username}`}>
                  <Typography
                    variant="subtitle2"
                    component="span"
                    className={classes.commentUsername}
                  >
                    {comment.user.username}
                  </Typography>{' '}
                  <Typography variant="body2" component="span">
                    {comment.content}
                  </Typography>
                </Link>
              </div>
            ))}
          </div>

          <Typography color="textSecondary" className={classes.datePosted}>
            5 DAYS AGO
          </Typography>
          <Hidden xsDown>
            <div className={classes.comment}>
              <Divider />
              <Comment />
            </div>
          </Hidden>
        </div>
      </article>

      {showOptionsDialog && (
        <OptionsDialog onClose={() => setShowOptionsDialog(false)} />
      )}
    </div>
  );
}

function Comment() {
  const classes = usePostStyles();
  const [content, setContent] = useState('');
  return (
    <div className={classes.commentContainer}>
      <TextField
        className={classes.textField}
        fullWidth
        placeholder="Add a comment..."
        multiline
        maxRows={2}
        value={content}
        onChange={(evt) => setContent(evt.target.value)}
        inputProps={{
          classes: {
            root: classes.root,
            underline: classes.underline,
          },
        }}
      />
      <Button
        color="primary"
        className={classes.commentButton}
        disabled={!content.trim()}
      >
        Post
      </Button>
    </div>
  );
}

function LikeButton() {
  const classes = usePostStyles();
  const [liked, setLiked] = useState(false);
  const Icon = liked ? UnlikeIcon : LikeIcon;
  const className = liked ? classes.liked : classes.like;
  const onClick = liked ? handleUnlike : handleLike;

  function handleUnlike() {
    setLiked(false);
  }

  function handleLike() {
    setLiked(true);
  }

  return <Icon className={className} onClick={onClick} />;
}

function SaveButton() {
  const classes = usePostStyles();
  const [saved, setSaved] = useState(false);
  const Icon = saved ? RemoveIcon : SaveIcon;
  const onClick = saved ? handleRemove : handleSave;

  function handleSave() {
    setSaved(true);
  }

  function handleRemove() {
    setSaved(false);
  }

  return <Icon className={classes.saveIcon} onClick={onClick} />;
}

export default Post;
