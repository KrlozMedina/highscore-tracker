'use client'

// index.jsx
import React from 'react';
// import NavLink from 'next/NavLink';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-bootstrap';

const IndexPage = () => {
  document.title = "HighScore Tracker"

  return (
    <div className="container text-center my-5">
      <h1 className="display-4">Bienvenido a HighScore Tracker</h1>
      <p className="lead">
        Administra y visualiza las puntuaciones de tus videojuegos favoritos.
      </p>

      <div className="my-4">
        <NavLink href="/auth/login" passHref>
          <a className="btn btn-primary btn-lg mx-2">Iniciar Sesión</a>
        </NavLink>
        <NavLink href="/auth/register" passHref>
          <a className="btn btn-outline-primary btn-lg mx-2">Registrarse</a>
        </NavLink>
      </div>

      <div className="my-5">
        <h2 className="h4">Principales Características</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Consulta el ranking global de jugadores</li>
          <li className="list-group-item">Registra y gestiona tus puntuaciones</li>
          <li className="list-group-item">Visualiza las estadísticas de tus juegos</li>
          <li className="list-group-item">Control de usuarios y roles (solo administradores)</li>
        </ul>
      </div>

      <footer className="mt-5">
        <p className="text-muted">© {new Date().getFullYear()} Sistema de Gestión de Puntuaciones</p>
      </footer>
    </div>
  );
};

export default IndexPage;


// import Image from "next/image";
// import styles from "./page.module.css";
// import { useSelector, useDispatch } from "react-redux";
// import { selectToken, setToken } from "hst/store/slices/token.slices";
// import withAuth from "hst/hoc/with-auth";

// export function Home() {
//   const token = useSelector(selectToken);
//   const dispatch = useDispatch();

//   const updateValue = () => {
//     dispatch(
//       setToken({
//         token: token + 1
//       })
//     )
//   }

//   return (
//     <div className={styles.page}>
//       <h1>Contador</h1>
//       {console.log(token)}
//       {token}
//       <button onClick={updateValue}>Aumentar</button>
//       {/* <main className={styles.main}>
//         <Image
//           className={styles.logo}
//           src="https://nextjs.org/icons/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol>
//           <li>
//             Get started by editing <code>src/app/page.js</code>.
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className={styles.ctas}>
//           <a
//             className={styles.primary}
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className={styles.logo}
//               src="https://nextjs.org/icons/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.secondary}
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className={styles.footer}>
//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer> */}
//     </div>
//   );
// }

// export default withAuth(Home)