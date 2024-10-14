import HeaderOrganism from 'hst/components/organisms/HeaderOrganism';

const UserTemplate = ({ children }) => {
  return (
    <div>
      <HeaderOrganism />
      <div className="container">{children}</div>
    </div>
  );
};

export default UserTemplate;
