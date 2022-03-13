import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExplorePage from './pages/explore';
import FeedPage from '@/pages/feed';
import PostPage from '@/pages/post';
import ProfilePage from '@/pages/profile';
import EditProfilePage from '@/pages/edit-profile';
import LoginPage from '@/pages/login';
import SignUpPage from '@/pages/signup';
import NotFoundPage from '@/pages/not-found';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/p/:postId" element={<PostPage />} />
        <Route path="/:username" element={<ProfilePage />} />
        <Route path="/accounts/edit" element={<EditProfilePage />} />
        <Route path="/accounts/login" element={<LoginPage />} />
        <Route path="/accounts/emailsignup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
