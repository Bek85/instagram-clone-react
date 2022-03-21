import { useFeedPostStyles } from '../../styles';
import UserCard from '@/components/shared/UserCard';
import {
  MoreIcon,
  CommentIcon,
  ShareIcon,
  UnlikeIcon,
  LikeIcon,
} from '@/icons';
import {
  Button,
  collapseClasses,
  Divider,
  Hidden,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';

function FeedPost({ post }) {
  const classes = useFeedPostStyles();
  const [showCaption, setShowCaption] = useState(false);
  const { media, id, likes, user, caption, comments } = post;

  return (
    <>
      <article className={classes.article}>
        {/* Feed Post Header */}
        <div className={classes.postHeader}>
          <UserCard user={user} />
          <MoreIcon className={collapseClasses.moreIcon} />
        </div>
        {/* Feed Post Image */}
        <div>
          <img src={media} alt="post media" className={classes.image} />
        </div>
        {/* Feed Post Buttons */}

        <div className={classes.postButtonsWrapper}>
          <LikeButton />
          <Link to={`/p/${id}`}>
            <CommentIcon />
          </Link>
          <ShareIcon />
          <SaveButton />
        </div>
        <Typography className={classes.like} variant="subtitle2">
          <span>{likes <= 1 ? `${likes} like` : `${likes} likes`}</span>
        </Typography>
        <div className={showCaption ? classes.expanded : classes.collapsed}>
          <Link to={`/${user.username}`}>
            <Typography
              variant="subtitle2"
              component="span"
              className={classes.username}
            >
              {user.username}
            </Typography>
          </Link>
          {showCaption ? (
            <Typography
              variant="body2"
              component="span"
              dangerouslySetInnerHTML={{ __html: caption }}
            />
          ) : (
            <div className={classes.captionWrapper}>
              <HTMLEllipsis
                unsafeHTML={caption}
                className={classes.caption}
                maxLine="0"
                ellipsis="..."
                basedOn="letters"
              />
              <Button
                className={classes.moreButton}
                onClick={() => setShowCaption(true)}
              >
                more
              </Button>
            </div>
          )}
        </div>
        <Link to={`/p/${id}`}>
          <Typography
            className={classes.commentLink}
            variant="body2"
            component="div"
          >
            View all {comments.length} comments
          </Typography>
        </Link>
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
        <Typography color="textSecondary" className={classes.datePosted}>
          5 DAYS AGO
        </Typography>

        <Hidden xsDown>
          <Divider />
          <Comment />
        </Hidden>
      </article>
    </>
  );
}

function Comment() {
  return <>Comment</>;
}

function LikeButton() {
  const classes = useFeedPostStyles();
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
  return <>SaveButton</>;
}

export default FeedPost;
