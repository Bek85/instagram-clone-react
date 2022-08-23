import PersonIcon from '@mui/icons-material/Person';
import { useProfilePictureStyles } from '@/styles';

function ProfilePicture({
  size,
  image = 'https://reedbarger.nyc3.digitaloceanspaces.com/reactbootcamp/avatar.png',
  isOwner,
}) {
  const classes = useProfilePictureStyles({ size, isOwner });

  return (
    <section className={classes.section}>
      {image ? (
        <div className={classes.wrapper}>
          <img src={image} alt="user profile" className={classes.image} />
        </div>
      ) : (
        <div className={classes.wrapper}>
          <PersonIcon className={classes.person} />
        </div>
      )}
    </section>
  );
}

export default ProfilePicture;
