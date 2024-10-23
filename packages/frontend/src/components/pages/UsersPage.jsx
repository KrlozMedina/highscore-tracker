import UserTemplate from 'hst/components/templates/UserTemplate';
import UserListOrganism from 'hst/components/organisms/UserListOrganism';

const UsersPage = ({ users }) => {
  return (
    <UserTemplate>
      <h1>Lista de Usuarios</h1>
      <UserListOrganism users={users} />
    </UserTemplate>
  );
};

export default UsersPage;
