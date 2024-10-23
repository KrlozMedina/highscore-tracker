import HeaderOrganism from 'hst/components/organisms/HeaderOrganism';

const HomeTemplate = ({ children }) => {
  return (
    <div>
      <HeaderOrganism />
      <main>{children}</main>
    </div>
  );
};

export default HomeTemplate;
