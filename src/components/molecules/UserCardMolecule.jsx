import LabelAtom from 'hst/components/atoms/LabelAtom';

const UserCardMolecule = ({ name, email }) => {
  return (
    <div className="card">
      <div className="card-body">
        <LabelAtom text={`Nombre: ${name}`} />
        <LabelAtom text={`Email: ${email}`} />
      </div>
    </div>
  );
};

export default UserCardMolecule;
