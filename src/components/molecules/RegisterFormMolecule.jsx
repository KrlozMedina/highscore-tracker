import ButtonAtom from 'hst/components/atoms/ButtonAtom';
import TextInputAtom from 'hst/components/atoms/TextInputAtom';

const RegisterFormMolecule = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <TextInputAtom label="Nombre" />
      <TextInputAtom label="Correo Electrónico" />
      <ButtonAtom label="Registrarse" />
    </form>
  );
};

export default RegisterFormMolecule;
