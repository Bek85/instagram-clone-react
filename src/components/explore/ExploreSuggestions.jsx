import { useExploreSuggestionsStyles } from '@/styles';
import { Hidden, Typography } from '@mui/material';
import FollowSuggestions from '@/components/shared/FollowSuggestions';

function ExploreSuggestions({ hideHeader }) {
  const classes = useExploreSuggestionsStyles();

  return (
    <Hidden>
      <div className={classes.container}>
        <Typography
          color="textSecondary"
          variant="subtitle2"
          component="h2"
          className={classes.typography}
        >
          Discover People
        </Typography>

        <FollowSuggestions hideHeader />
      </div>
    </Hidden>
  );
}

export default ExploreSuggestions;
