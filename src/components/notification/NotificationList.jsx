import { useNotificationListStyles } from '@/styles';
import { defaultNotifications } from '@/data';
import { Avatar, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import FollowButton from '@/components/shared/FollowButton';
import { useRef } from 'react';
import { useOutsideClick } from 'rooks';

function NotificationList({ handleHideList }) {
  const listContainerRef = useRef();
  const classes = useNotificationListStyles();

  useOutsideClick(listContainerRef, handleHideList);

  return (
    <Grid ref={listContainerRef} className={classes.listContainer} container>
      {defaultNotifications.map((notification) => {
        const isLike = notification.type === 'like';
        const isFollow = notification.type === 'follow';
        return (
          <Grid item key={notification.id} className={classes.listItem}>
            <div className={classes.listItemWrapper}>
              <div className={classes.avatarWrapper}>
                <Avatar
                  src={notification.user.profile_image}
                  alt="User avatar"
                />
              </div>
              <div className={classes.nameWrapper}>
                <Link to={`/${notification.user.username}`}>
                  <Typography variant="body1">
                    {notification.user.username}
                  </Typography>
                </Link>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.typography}
                >
                  {isLike && `likes your photo. 4d`}
                  {isFollow && `started following you. 5d`}
                </Typography>
              </div>
            </div>
            <div>
              {isLike && (
                <Link to={`/p/${notification.post.id}`}>
                  <Avatar src={notification.post.media} alt="post cover" />
                </Link>
              )}
              {isFollow && <FollowButton />}
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default NotificationList;
