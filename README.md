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
- [Workspaces](#workspaces)
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

### Frontend:

- Next.js (React.js)
- React-Bootstrap
- Redux Toolkit
- RTK Query

### Backend:

- Nest.JS
- MongoDB con Mongoose
- PostgreSQL
- JWT (JSON Web Token)
- bcrypt

### Integraciones Opcionales:

- OAuth2
- Socket.io (Opcional)

## Estructura del Proyecto

### Backend

El backend del proyecto se construye con NestJS para manejar las API y la lógica de negocio. Se utiliza MongoDB para gestionar la base de datos de puntuaciones y PostgreSQL para la autenticación y gestión de usuarios.

#### **Rutas de Usuario**:

- **POST** `/api/v1/auth/register`: Registro de nuevos usuarios.
- **POST** `/api/v1/auth/login`: Inicio de sesión de usuarios.
- **GET** `/api/v1/users/profile/:userId`: Obtiene el perfil de un usuario.
- **GET** `/api/v1/users/scores/:userId`: Obtiene las puntuaciones de un usuario.
- **PUT** `/api/v1/users/profile/:userId`: Actualiza el perfil de un usuario.

#### **Rutas de Puntuaciones**:

- **POST** `/api/v1/scores/:userId`: Añade una puntuación nueva para un usuario.
- **GET** `/api/v1/scores/leaderboard`: Lista las puntuaciones más altas en el ranking.

#### **Rutas de Administración**:

- **GET** `/api/v1/users/admin`: Obtiene todos los usuarios con permisos de administrador.
- **PATCH** `/api/v1/users/admin/:userId`: Actualiza los permisos de un usuario.
- **DELETE** `/api/v1/users/admin/:userId`: Elimina un usuario.
- **DELETE** `/api/v1/users/admin/scores/:userId`: Elimina todas las puntuaciones de un usuario.

### Frontend

La interfaz de usuario se construye con **Next.js** y se utiliza **Redux Toolkit** para gestionar el estado global de la aplicación. Además, se usa **React-Bootstrap** para diseñar la UI.

#### **Pantallas**:

- **Login**: Pantalla de inicio de sesión y registro de usuarios.
- **Perfil del Jugador**: Permite al jugador ver y gestionar sus puntuaciones.
- **Ranking Global**: Tabla de clasificación de jugadores con las puntuaciones más altas.
- **Panel de Administración**: Gestión de usuarios y puntuaciones por parte del administrador.

## Diagrama de la Base de Datos

### **Base de datos de Usuarios (PostgreSQL)**:

- `userId`: Identificador único.
- `username`: Nombre de usuario.
- `name`: Nombre del jugador.
- `email`: Correo electrónico.
- `password`: Contraseña hash.
- `role`: Rol del usuario (admin o jugador).
- `status`: Estado del usuario (activo/inactivo).
- `avatar`: Imagen de perfil del jugador.
- `createdAt`: Fecha de creación.
- `updatedAt`: Fecha de actualización.

### **Colección de Puntuaciones (MongoDB)**:

- `scoreId`: Identificador único de la puntuación.
- `userId`: ID del jugador que hizo la puntuación.
- `game`: Nombre del juego.
- `score`: Valor de la puntuación.
- `createdAt`: Fecha en que se creó la puntuación.
- `updatedAt`: Fecha de actualización de la puntuación.

## Workspaces

El proyecto está configurado como un **monorepo** usando **pnpm workspaces** para gestionar tanto el frontend como el backend en un solo repositorio. Los workspaces permiten compartir dependencias y scripts entre ambas partes del proyecto.

### Configuración de Workspaces:

1. **Root `package.json`**:

```json
{
  "name": "highscore-tracker",
  "private": true,
  "workspaces": [
    "packages/frontend",
    "packages/backend"
  ],
  "scripts": {
    "start": "concurrently \"pnpm --filter frontend dev\" \"pnpm --filter backend start\""
  }
}
```

2. **Frontend (packages/frontend):**

```json
{
  "name": "frontend",
  "scripts": {
    "dev": "next dev"
  }
}
```

3. **Backend (packages/backend):**

```json
{
  "name": "backend",
  "scripts": {
    "start": "nest start"
  }
}
```

## Diagrama de la Base de Datos

- **Base de datos de Usuarios**:
  - userId, username, name, email, password, role, status, avatar, createdAt, updatedAt

- **Colección de Puntuaciones**:
  - scoreId, userId, game, score, createdAt, updatedAt

## Fases del Proyecto

1. **Configuración del Proyecto**: Crear repositorio, configurar entornos de desarrollo y workspaces.
2. **Desarrollo del Backend**: Crear modelos de datos, rutas API y lógica de autenticación.
3. **Desarrollo del Frontend**: Implementar componentes, conectarlos al estado global con Redux Toolkit y consumir las API.
4. **Pruebas y Deploy**: Realizar pruebas, corregir errores, y desplegar el proyecto.
5. **Extensiones Opcionales**: Integrar WebSockets y optimizar la experiencia de usuario.


## Conclusión

El proyecto HighScore Tracker ofrece un ejemplo práctico de una aplicación fullstack moderna, integrando un backend con NestJS y un frontend con Next.js, permitiendo a los desarrolladores comprender el flujo completo de datos y la interacción entre sistemas complejos en tiempo real.

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