import { useRef } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import ExplorePage from './pages/explore';
import FeedPage from '@/pages/feed';
import PostPage from '@/pages/post';
import ProfilePage from '@/pages/profile';
import EditProfilePage from '@/pages/edit-profile';
import LoginPage from '@/pages/login';
import SignUpPage from '@/pages/signup';
import NotFoundPage from '@/pages/not-found';
import PostModal from '@/components/post/PostModal';
import { useEffect } from 'react';

function App() {
  const history = useHistory();
  const location = useLocation();
  const prevLocation = useRef(location);
  const modal = location.state?.modal;

  useEffect(() => {
    if (history.action !== 'POP' && !modal) {
      prevLocation.current = location;
    }
  }, [location, modal, history.action]);

  const isModalOpen = modal && prevLocation.current !== location;

  return (
    <>
      <Switch location={isModalOpen ? prevLocation.current : location}>
        <Route exact path="/" component={FeedPage} />
        <Route path="/explore" component={ExplorePage} />
        <Route path="/p/:postId" component={PostPage} />
        <Route path="/:username" component={ProfilePage} />
        <Route path="/accounts/edit" component={EditProfilePage} />
        <Route path="/accounts/login" component={LoginPage} />
        <Route path="/accounts/emailsignup" component={SignUpPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      {isModalOpen && <Route path="/p/:postId" component={PostModal} />}
    </>
  );
}

export default App;
