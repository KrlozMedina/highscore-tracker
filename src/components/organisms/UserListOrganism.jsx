import UserCardMolecule from 'hst/components/molecules/UserCardMolecule';

const UserListOrganism = ({ users }) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCardMolecule key={user.id} name={user.name} email={user.email} />
      ))}
    </div>
  );
};

export default UserListOrganism;
