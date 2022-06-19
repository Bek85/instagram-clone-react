import { useExploreGridStyles } from '@/styles';
import { Typography } from '@mui/material';
import { LoadingLargeIcon } from '@/icons';
import { getDefaultPost } from '@/data';
import GridPost from '@/components/shared/GridPost';

function ExploreGrid() {
  const classes = useExploreGridStyles();
  let loading = false;

  return (
    <>
      <Typography
        color="textSecondary"
        variant="subtitle2"
        component="h3"
        gutterBottom
        className={classes.typography}
      >
        Explore
      </Typography>
      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <article className={classes.article}>
          <div className={classes.postContainer}>
            {Array.from({ length: 20 }, () => getDefaultPost()).map((post) => (
              <GridPost key={post.id} post={post} />
            ))}
          </div>
        </article>
      )}
    </>
  );
}

export default ExploreGrid;
