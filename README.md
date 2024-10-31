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
- [Endpoints del Proyecto](#endpoints-del-proyecto)
  - [Backend](#endpoints-del-backend)
  - [Frontend](#endpoints-del-frontend)
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

## Endpoints del Proyecto

### Endpoints del Backend

#### **Base URL**

- [http://localhost:3001/api/v1/](http://localhost:3001/api/v1/)
- [http://172.10.10.1:3001/api/v1/](http://172.10.10.1:3001/api/v1/)

#### Authentication

- **Register User**
    - **POST** `/auth/register`
        - **Summary:** Create user
        - **Description:** Auth user with email or username, and password
        - **Request Body:**
        ```json
        {
            "id": "45247989-8807-4cec-bf65-50632859a8f5",
            "name": "Leidy Santos",
            "username": "lsantos",
            "email": "prueba@yopmail.com",
            "password": "114c884d2a1cd1cde577ff109c3db5c6",
            "role": "admin",
            "status": "Active"
        }
        ```
        - **Responses:**
            - **201:** User register successful
            - **400:** User bad request
            - **409:** User Conflict

- **Login User**
    - **POST** `/auth/login`
        - **Summary:** Login user
        - **Description:** Auth user with username, and password
        - **Request Body:**
        ```json
        {
            "username": "lsantos",
            "password": "114c884d2a1cd1cde577ff109c3db5c6"
        }
        ```
        - **Responses:**
            - **200:** Login successful
            - **401:** Unauthorized
            - **400:** User bad request

#### Users

- **Get User Profile**
    - **GET** `/users/profile/{userId}`
  - **Summary:** Get user profile
  - **Description:** Get detail of user profile by ID
  - **Path Parameters:**
    - `userId`: The ID that need to be fetched
  - **Responses:**
    - **200:** User data uploaded successfully
    - **401:** Unauthorized
    - **400:** User bad request

- **Update User Profile**
    - **PUT** `/users/profile/{userId}`
        - **Summary:** Update profile user
        - **Description:** Update profile user by ID
        - **Path Parameters:**
        - `userId`: The ID that need to be fetched
        - **Request Body:**
        ```json
        {
        "id": "45247989-8807-4cec-bf65-50632859a8f5",
        "name": "Leidy Santos",
        "username": "LCSA",
        "email": "prueba@yopmail.com",
        "password": "114c884d2a1cd1cde577ff109c3db5c6",
        "role": "admin"
        }
        ```
        - **Responses:**
            - **200:** User data updated successfully
            - **401:** Unauthorized
            - **400:** User bad request

- **Get Scores of User** 
    - **GET** `/users/scores/{userId}`
  - **Summary:** Get scores
  - **Description:** Get scores of user by user ID
  - **Path Parameters:**
    - `userId`: The ID that need to be fetched
  - **Query Parameters:**
    - `page`: Actual page (default: 1)
    - `limit`: Number of elements per page (default: 10)
  - **Responses:**
    - **200:** User data uploaded successfully
    - **401:** Unauthorized
    - **400:** User bad request

#### Scores

- **Create Score**
    - **POST** `/scores/{userId}`
        - **Summary:** Create score
        - **Description:** Create new score
        - **Path Parameters:**
        - `userId`: The ID that need to be fetched
        - **Request Body:**
        ```json
        {
        "score": 100
        }
        ```
        - **Responses:**
            - **201:** Score created successfully
            - **401:** Unauthorized
            - **400:** User bad request

- **Get Global Scores**
    - **GET** `/scores/leaderboard`
    - **Summary:** Get global scores
    - **Description:** Get better scores
    - **Query Parameters:**
        - `page`: Actual page (default: 1)
        - `limit`: Number of elements per page (default: 10)
    - **Responses:**
        - **200:** Global scores uploaded successfully
        - **401:** Unauthorized
        - **400:** User bad request

#### Admin Users

- **Get All Users**
- **GET** `/users/admin`
    - **Summary:** Get all users
    - **Description:** Get all users by admin
    - **Query Parameters:**
        - `page`: Actual page (default: 1)
        - `limit`: Number of elements per page (default: 10)
    - **Responses:**
        - **200:** All users uploaded successfully
        - **401:** Unauthorized
        - **400:** User bad request
        - **403:** Valid token, no permission for this action

- **Enable or Block User**
    - **PATCH** `/users/admin/{userId}`
        - **Summary:** Enable or block user
        - **Description:** Enable or block user by admin
        - **Path Parameters:**
            - `userId`: The ID that need to be fetched
        - **Responses:**
            - **200:** User enabled or blocked successfully
            - **401:** Unauthorized
            - **400:** User bad request
            - **403:** Valid token, no permission for this action

- **Delete User**
    - **DELETE** `/users/admin/{userId}`
        - **Summary:** Delete user
        - **Description:** Delete user by admin
        - **Path Parameters:**
            - `userId`: The ID that need to be fetched
        - **Responses:**
            - **200:** User removed successfully
            - **401:** Unauthorized
            - **400:** User bad request
            - **403:** Valid token, no permission for this action

#### Admin Scores

- **Delete Specific Score**
    - **DELETE** `/users/admin/scores/{scoreId}`
        - **Summary:** Delete specific score
        - **Description:** Delete specific score by admin
        - **Path Parameters:**
            - `scoreId`: The ID that need to be fetched
        - **Responses:**
            - **200:** Score removed successfully
            - **401:** Unauthorized
            - **400:** User bad request
            - **403:** Valid token, no permission for this action


### Endpoints del Frontend

#### **Autenticación y Registro**

- **/auth/login** - Pantalla de inicio de sesión de usuario.
- **/auth/register** - Pantalla de registro de usuario.

#### **Interfaz del Jugador**

- **/users/profile/:userId** - Pantalla del perfil de usuario, donde se pueden ver y gestionar las puntuaciones.
- **/scores/leaderboard** - Muestra el ranking global de los jugadores.

#### **Panel de Administración**

- **/users/admin** - Pantalla de gestión de usuarios, donde los administradores pueden añadir, eliminar o bloquear usuarios.
- **/users/scores** - Pantalla de gestión de puntuaciones, donde los administradores pueden eliminar puntuaciones.

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
  "scripts": {
    "dev": "pnpm run -r dev"
  },
  "workspaces": ["frontend", "backend"]
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

Este proyecto de gestión de puntuaciones permite a los jugadores ver sus resultados y participar en clasificaciones, lo que hace la experiencia de juego más competitiva y entretenida. Además, permite a los administradores mantener una supervisión constante para asegurar la legitimidad de las puntuaciones.

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