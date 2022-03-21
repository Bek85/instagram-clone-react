import { Avatar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUserCardStyles } from '../../styles';

function UserCard({ user }) {
  const classes = useUserCardStyles();
  const { username, profile_image } = user;

  return (
    <div className={classes.wrapper}>
      <Link to={`/${username}`}>
        <Avatar
          src={profile_image}
          alt="User avatar"
          className={classes.avatar}
        />
      </Link>
      <div className={classes.nameWrapper}>
        <Link to={`/${username}`}>
          <Typography variant="subtitle2" className={classes.typography}>
            {username}
          </Typography>
        </Link>
        <Typography
          color="textSecondary"
          variant="body2"
          className={classes.typography}
        >
          name
        </Typography>
      </div>
    </div>
  );
}

export default UserCard;
