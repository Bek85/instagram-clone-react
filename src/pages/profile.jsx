import { useProfilePageStyles } from '@/styles';
import Layout from '@/components/shared/Layout';
import { defaultCurrentUser } from '@/data';
import {
  Card,
  CardContent,
  Box,
  Button,
  Typography,
  Dialog,
  Zoom,
  Divider,
  DialogTitle,
  Avatar,
} from '@mui/material';
import ProfilePicture from '@/components/shared/ProfilePicture';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import ProfileTabs from '@/components/profile/ProfileTabs';

function ProfilePage() {
  const isOwner = true;
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const classes = useProfilePageStyles();

  const handleOptionsMenuClick = () => {
    setShowOptionsMenu(true);
  };

  const handleCloseMenu = () => {
    setShowOptionsMenu(false);
  };

  return (
    <Layout
      title={`${defaultCurrentUser.name} (@${defaultCurrentUser.username})`}
    >
      <div className={classes.container}>
        <Box sx={{ display: { md: 'block', xs: 'none' } }}>
          <Card className={classes.cardLarge}>
            <ProfilePicture isOwner={isOwner} />
            <CardContent className={classes.cardContentLarge}>
              <ProfileNameSection
                user={defaultCurrentUser}
                isOwner={isOwner}
                handleOptionsMenuClick={handleOptionsMenuClick}
              />
              <PostCountSection user={defaultCurrentUser} />
              <NameBioSection user={defaultCurrentUser} />
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ display: { md: 'none', xs: 'block' } }}>
          <Card className={classes.cardSmall}>
            <CardContent>
              <section className={classes.sectionSmall}>
                <ProfilePicture isOwner={isOwner} size={77} />
                <ProfileNameSection
                  user={defaultCurrentUser}
                  isOwner={isOwner}
                  handleOptionsMenuClick={handleOptionsMenuClick}
                />
              </section>
              <NameBioSection user={defaultCurrentUser} />
            </CardContent>
            <PostCountSection user={defaultCurrentUser} />
          </Card>
        </Box>
        {showOptionsMenu && <OptionsMenu handleCloseMenu={handleCloseMenu} />}
        <ProfileTabs user={defaultCurrentUser} isOwner={isOwner} />
      </div>
    </Layout>
  );
}

function ProfileNameSection({ user, isOwner, handleOptionsMenuClick }) {
  const classes = useProfilePageStyles();
  const [showUnfollowDialog, setShowUnfollowDialog] = useState(false);
  let followButton;
  const isFollowing = true;
  const isFollower = false;

  if (isFollowing) {
    followButton = (
      <Button
        variant="outlined"
        className={classes.button}
        onClick={() => setShowUnfollowDialog(true)}
      >
        Following
      </Button>
    );
  } else if (isFollower) {
    followButton = (
      <Button variant="contained" color="primary" className={classes.button}>
        Follow Back
      </Button>
    );
  } else {
    followButton = (
      <Button variant="contained" color="primary" className={classes.button}>
        Follow
      </Button>
    );
  }
  return (
    <>
      <Box sx={{ display: { md: 'block', xs: 'none' } }}>
        <section className={classes.usernameSection}>
          <Typography className={classes.username}>{user.username}</Typography>
          {isOwner ? (
            <>
              <Link to="/accounts/edit">
                <Button variant="outlined">Edit Profile</Button>
              </Link>
              <div
                onClick={handleOptionsMenuClick}
                className={classes.settingsWrapper}
              >
                <SettingsIcon className={classes.settings} />
              </div>
            </>
          ) : (
            <>{followButton}</>
          )}
        </section>
      </Box>
      <Box sx={{ display: { md: 'none', xs: 'block' } }}>
        <section>
          <div className={classes.usernameDivSmall}>
            <Typography className={classes.username}>
              {user.username}
            </Typography>
            {isOwner && (
              <div
                onClick={handleOptionsMenuClick}
                className={classes.settingsWrapper}
              >
                <SettingsIcon className={classes.settings} />
              </div>
            )}
          </div>
          {isOwner ? (
            <Link to="/accounts/edit">
              <Button variant="outlined" style={{ width: '100%!important' }}>
                Edit Profile
              </Button>
            </Link>
          ) : (
            followButton
          )}
        </section>
      </Box>
      {showUnfollowDialog && (
        <UnfollowDialog
          user={user}
          onClose={() => setShowUnfollowDialog(false)}
        />
      )}
    </>
  );
}

function PostCountSection({ user }) {
  const classes = useProfilePageStyles();
  const options = ['posts', 'followers', 'following'];

  return (
    <>
      <Box sx={{ display: { md: 'none', sm: 'block' } }}>
        <Divider />
      </Box>
      <section className={classes.followingSection}>
        {options.map((option) => (
          <div key={option} className={classes.followingText}>
            <Typography className={classes.followingCount}>
              {user[option].length}
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography>{option}</Typography>
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Typography color="textSecondary">{option}</Typography>
            </Box>
          </div>
        ))}
      </section>
      <Box sx={{ display: { md: 'none', sm: 'block' } }}>
        <Divider />
      </Box>
    </>
  );
}

function NameBioSection({ user }) {
  const classes = useProfilePageStyles();
  return (
    <section className={classes.section}>
      <Typography className={classes.typography}>{user.name}</Typography>
      <Typography>{user.bio}</Typography>
      <a href={user.website} target="_blank" rel="noopener noreferrer">
        <Typography color="secondary" className={classes.typography}>
          {user.website}
        </Typography>
      </a>
    </section>
  );
}

function UnfollowDialog({ onClose, user }) {
  const classes = useProfilePageStyles();

  return (
    <Dialog
      open
      classes={{ scrollPaper: classes.unfollowDialogScrollPaper }}
      onClose={onClose}
      TransitionComponent={Zoom}
    >
      <div className={classes.wrapper}>
        <Avatar
          src={user.profile_image}
          alt={`${user.username}'s avatar`}
          className={classes.avatar}
        />
      </div>
      <Typography
        align="center"
        variant="body2"
        className={classes.unfollowDialogText}
      >
        Unfollow @{user.username}
      </Typography>
      <Divider />
      <Button className={classes.unfollowButton}>Unfollow</Button>
      <Divider />
      <Button onClick={onClose} className={classes.cancelButton}>
        Cancel
      </Button>
    </Dialog>
  );
}

function OptionsMenu({ handleCloseMenu }) {
  const classes = useProfilePageStyles();
  const [showLogOutMessage, setShowLogOutMessage] = useState(false);

  const handleLogOutClick = () => {
    setShowLogOutMessage(true);
  };

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.dialogScrollPaper,
        paper: classes.dialogPaper,
      }}
      TransitionComponent={Zoom}
    >
      {showLogOutMessage ? (
        <>
          <DialogTitle className={classes.dialogTitle}>
            {' '}
            Logging Out
            <Typography color="textSecondary">
              You need to log back in to continue using Instagram
            </Typography>
          </DialogTitle>
        </>
      ) : (
        <>
          <OptionsItem text="Change Password" />
          <OptionsItem text="Nametag" />
          <OptionsItem text="Authorized Apps" />
          <OptionsItem text="Notifications" />
          <OptionsItem text="Privacy and Security" />
          <OptionsItem text="Log Out" onClick={handleLogOutClick} />
          <OptionsItem text="Cancel" onClick={handleCloseMenu} />
        </>
      )}
    </Dialog>
  );
}

function OptionsItem({ text, onClick }) {
  return (
    <>
      <Button style={{ padding: '12px 8px' }} onClick={onClick}>
        {text}
      </Button>
      <Divider />
    </>
  );
}
export default ProfilePage;
