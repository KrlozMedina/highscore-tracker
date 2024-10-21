import RegisterFormMolecule from 'hst/components/molecules/RegisterFormMolecule';

const LoginFormOrganism = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de inicio de sesión aquí
  };

  return (
    <div className="login-form">
      <h2>Iniciar Sesión</h2>
      <RegisterFormMolecule onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginFormOrganism;
