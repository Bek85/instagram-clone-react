import { useFeedPageStyles } from '../styles';
import Layout from '@/components/shared/Layout';
import UserCard from '@/components/shared/UserCard';
import FeedSideSuggestions from '@/components/feed/FeedSideSuggestions';
import { getDefaultPost } from '../data';
import { Hidden } from '@mui/material';
import LoadingScreen from '@/components/shared/LoadingScreen';
import { lazy, Suspense, useState } from 'react';
import { LoadingLargeIcon } from '../icons';
const FeedPost = lazy(() => import('@/components/feed/FeedPost'));

function FeedPage() {
  const classes = useFeedPageStyles();
  const [isEndOfFeed, setIsEndOfFeed] = useState(false);
  let loading = false;

  if (loading) return <LoadingScreen />;

  return (
    <Layout>
      <div className={classes.container}>
        <div>
          {Array.from({ length: 5 }, () => getDefaultPost()).map(
            (post, index) => (
              <Suspense key={post.id} fallback={<>Loading...</>}>
                <FeedPost key={post.id} post={post} index={index} />
              </Suspense>
            )
          )}
        </div>
        {/* Sidebar */}
        <Hidden smDown>
          <div className={classes.sidebarContainer}>
            <div className={classes.sidebarWrapper}>
              <UserCard avatarSize={50} />
              <FeedSideSuggestions />
            </div>
          </div>
        </Hidden>
        {!isEndOfFeed && <LoadingLargeIcon />}
      </div>
    </Layout>
  );
}

export default FeedPage;
