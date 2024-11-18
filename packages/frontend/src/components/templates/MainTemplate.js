import { getToken, parseJwt } from "hst/utils/functions";
import Footer from "../molecules/Footer";
import Header from "../molecules/Header";

const MainTemplate = ({ children }) => {
  const token = getToken();
  const tokenJwt = parseJwt(token);
  const userRoles = tokenJwt?.roles;
  const userId = tokenJwt?.sub

  return (
    <>
      <Header roles={userRoles} userId={userId} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainTemplate;
