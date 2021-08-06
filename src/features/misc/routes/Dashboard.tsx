import { ContentLayout } from '@/components/Layout';
import { useAuth } from '@/lib/auth';

export const Dashboard = () => {
    const { user } = useAuth();

    return (
        <ContentLayout title="Dashboard">
            <h1 className="text-xl mt-2">
                Welcome <b>{`${user?.name}`}</b>
            </h1>
            <h4 className="my-3">
                Your role is : <b>{user?.admin}</b>
            </h4>
        </ContentLayout>
    );
};
