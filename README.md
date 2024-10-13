# HighScore Tracker

## Índice

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Objetivos del Proyecto](#objetivos-del-proyecto)
- [Funcionalidades Principales](#funcionalidades-principales)
  - [Para Jugadores](#para-jugadores)
  - [Para Administradores](#para-administradores)
  - [Funcionalidades Extras (Opcionales)](#funcionalidades-extras-opcionales)
- [Tecnologías a Utilizar](#tecnologías-a-utilizar)
- [Estructura del Proyecto](#estructura-del-proyecto)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Diagrama de la Base de Datos](#diagrama-de-la-base-de-datos)
- [Fases del Proyecto](#fases-del-proyecto)
- [Conclusión](#conclusión)
- [Documentación de Origen](#documentación-de-origen)
- [Contribuciones](#contribuciones)

## Descripción del Proyecto

El proyecto **HighScore Tracker** es una aplicación web fullstack que permite gestionar y mostrar las puntuaciones (scores) de los jugadores de un videojuego en línea. Los jugadores podrán registrarse en la plataforma, iniciar sesión, y sus puntuaciones se registrarán automáticamente cuando jueguen. Las puntuaciones más altas se mostrarán en un ranking global. Los administradores podrán gestionar el contenido de las puntuaciones y usuarios desde un panel de administración.

## Objetivos del Proyecto

- Desarrollar una plataforma web que permita registrar las puntuaciones de los jugadores de manera automática.
- Proporcionar una interfaz donde los jugadores puedan visualizar sus puntuaciones y las de otros usuarios en tiempo real.
- Implementar autenticación y autorización para jugadores y administradores.
- Crear una interfaz de administración para gestionar usuarios, puntuaciones y el ranking global.

## Funcionalidades Principales

### Para Jugadores

- **Registro y Autenticación**: Los jugadores podrán registrarse en la plataforma con su correo electrónico o mediante redes sociales (OAuth, Google, GitHub).
- **Visualización de Puntuaciones**: Los jugadores podrán ver sus puntuaciones históricas y el ranking global de los mejores jugadores.
- **Actualización Automática de Puntuaciones**: La plataforma recibirá puntajes en tiempo real desde la API del videojuego y los actualizará en la base de datos.
- **Perfil de Usuario**: Los jugadores podrán editar su perfil y ver sus estadísticas de juego.

### Para Administradores

- **Panel de Administración**: Los administradores podrán ver y gestionar las puntuaciones de todos los jugadores.
- **Gestión de Usuarios**: Añadir, eliminar o bloquear jugadores.
- **Gestión de Puntuaciones**: Eliminar puntuaciones erróneas o fraudulentas.

### Funcionalidades Extras (Opcionales)

- **Historial de Puntuaciones**: Ver un gráfico de evolución de las puntuaciones del jugador a lo largo del tiempo.
- **Clasificaciones por Nivel o Rango**: Crear tablas de clasificación basadas en diferentes niveles o categorías del juego.
- **Modo Multijugador**: Permitir comparar puntuaciones con amigos agregados.

## Tecnologías a Utilizar

- **Frontend**:
  - Next.js (React.js)
  - React-Bootstrap
  - Redux Toolkit

- **Backend**:
  - Nest.JS
  - MongoDB con Mongoose
  - PostgreSQL
  - JWT (JSON Web Token)
  - bcrypt

- **Integraciones Opcionales**:
  - OAuth2
  - Socket.io (Opcional)

## Estructura del Proyecto

### Backend

- **Rutas de Usuario**:
  - POST /api/v1/auth/register
  - POST /api/v1/auth/login
  - GET /api/v1/users/profile/:userId
  - GET /api/v1/users/scores/:userId
  - PUT /api/v1/users/profile/:userId

- **Rutas de Puntuaciones**:
  - POST /api/v1/scores/:userId
  - GET /api/v1/scores/leaderboard

- **Rutas de Administración**:
  - GET /api/v1/users/admin
  - PATCH /api/v1/users/admin/:userId
  - DELETE /api/v1/users/admin/:userId
  - DELETE /api/v1/users/admin/scores/:userId

### Frontend

- **Pantalla de Registro**: Formulario de registro e inicio de sesión.
- **Pantalla de Perfil del Jugador**: Visualización de puntuaciones y estadísticas personales.
- **Pantalla de Ranking**: Tabla de clasificación con los jugadores mejor puntuados.
- **Panel de Administración**: Gestión de usuarios y puntuaciones.

## Diagrama de la Base de Datos

- **Base de datos de Usuarios**:
  - userId, username, name, email, password, role, status, avatar, createdAt, updatedAt

- **Colección de Puntuaciones**:
  - scoreId, userId, game, score, createdAt, updatedAt

## Fases del Proyecto

1. **Configuración del Proyecto**: Crear repositorio y configurar el entorno.
2. **Desarrollo del Backend**: Crear modelos, rutas, y autenticación.
3. **Desarrollo del Frontend**: Crear componentes, implementar estado global, y conectar con la API.
4. **Pruebas y Deploy**: Realizar pruebas y desplegar en plataformas adecuadas.
5. **Extensiones Opcionales**: Integrar WebSockets y mejorar diseño.

## Conclusión

Este proyecto abarca el ciclo completo de una aplicación fullstack en el contexto de un videojuego, permitiendo al campista aprender tanto el desarrollo del frontend como el backend, manejar autenticación segura, y trabajar con bases de datos NoSQL como MongoDB y SQL como PostgreSQL.

## Documentación de Origen

La información y parámetros para el desarrollo del proyecto fueron obtenidos de las siguientes discusiones en GitHub:

- [Discusión 1](https://github.com/alejo8591/DWFSH3-178/discussions/7)
- [Discusión 2](https://github.com/alejo8591/DWFSH3-178/discussions/6)
- [Discusión 3](https://github.com/alejo8591/DWFSH3-178/discussions/8)
- [Discusión 4](https://github.com/alejo8591/DWFSH3-178/discussions/9)

## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Añadir nueva característica'`).
4. Envía un pull request.
