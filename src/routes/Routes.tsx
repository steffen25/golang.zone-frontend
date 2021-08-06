import { MainLayout } from "@/components/Layout";
import { Navigate, Outlet, Route, Routes as ReactRoutes } from "react-router-dom";
import { Dashboard } from "@/features/misc";
import { PostsRoutes } from "@/features/posts";
import { AuthRoutes } from "@/features/auth";

const App = () => {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
};

export const Routes = () => {
    return (
        <ReactRoutes>
            <Route path="/" element={<App />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/posts/*" element={<PostsRoutes />} />

                <Route path="/auth/*" element={<AuthRoutes />} />

                <Route path="*" element={<Navigate to="/" />} />
            </Route>
        </ReactRoutes>
    );
};