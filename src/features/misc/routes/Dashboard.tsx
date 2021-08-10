import { ContentLayout } from '@/components/Layout';
import { useAuthStore } from '@/hooks/useAuth';

export const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <ContentLayout>
      {user ? (
        <h1 className="text-xl mt-2">
          Welcome <b>{`${user.name}`}</b>
          <br />
          Role: {user.role}
        </h1>
      ) : (
        <></>
      )}
    </ContentLayout>
  );
};
