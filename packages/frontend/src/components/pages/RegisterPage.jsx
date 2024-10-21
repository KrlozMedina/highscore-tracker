import UserTemplate from 'hst/components/templates/UserTemplate';
import RegisterFormMolecule from 'hst/components/molecules/RegisterFormMolecule';

const RegisterPage = () => {
  return (
    <UserTemplate>
      <h1>Registro</h1>
      <RegisterFormMolecule />
    </UserTemplate>
  );
};

export default RegisterPage;
