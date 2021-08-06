import { Route, Routes } from 'react-router-dom';
import { Post } from './Post';
import { Posts } from './Posts';

export const PostsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Posts />} />
            <Route path=":postId" element={<Post />} />
        </Routes>
    );
};
