import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import FeedPage from './pages/FeedPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import PostDetailPage from './pages/PostDetailPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<FeedPage />} />
        <Route path="posts/:postId" element={<PostDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
