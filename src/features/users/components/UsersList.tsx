import { Table, Spinner } from '@/components/Elements';
import { useUsers } from '../hooks/useUsers';
import { User } from '../types';

export const UsersList = () => {
  const usersQuery = useUsers();

  if (usersQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!usersQuery.data) return null;

  return (
    <Table<User>
      data={usersQuery.data}
      columns={[
        {
          title: 'Name',
          field: 'name',
        },
        {
          title: 'Email',
          field: 'email',
        },
        {
          title: 'Created',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{createdAt}</span>;
          },
        },
      ]}
    />
  );
};
