# HighScore Tracker

## Índice

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
- Redis
- JWT (JSON Web Token)
- bcrypt

### Integraciones Opcionales:

- OAuth2
- Socket.io (Opcional)

## Estructura del Proyecto

### Backend

El backend del proyecto se construye con NestJS para manejar las API y la lógica de negocio. Se utiliza MongoDB para gestionar la base de datos de puntuaciones, PostgreSQL para la autenticación y gestión de usuarios, y Redis para la gestión de sesiones.

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
            - **200:** Scores retrieved successfully
            - **401:** Unauthorized
            - **400:** User bad request

#### Scores

- **Add Score**
    - **POST** `/scores/{userId}`
        - **Summary:** Add score
        - **Description:** Add a new score for the specified user
        - **Path Parameters:**
            - `userId`: The ID of the user for whom the score is added
        - **Request Body:**
        ```json
        {
            "score": 1000,
            "gameId": "game123"
        }
        ```
        - **Responses:**
            - **201:** Score added successfully
            - **401:** Unauthorized
            - **400:** User bad request

- **Get Leaderboard**
    - **GET** `/scores/leaderboard`
        - **Summary:** Get leaderboard
        - **Description:** Fetch the highest scores globally
        - **Query Parameters:**
            - `page`: Actual page (default: 1)
            - `limit`: Number of scores per page (default: 10)
        - **Responses:**
            - **200:** Leaderboard retrieved successfully
            - **404:** No scores found

### Endpoints del Frontend

El frontend se comunica con el backend a través de las API mencionadas anteriormente, usando **RTK Query** para realizar solicitudes a los endpoints y gestionar el estado de los datos.

### Diagrama de la Base de Datos

Aquí se muestra un diagrama simple que ilustra la estructura de la base de datos, incluyendo las relaciones entre las colecciones y los atributos principales.

```plaintext
+---------------+       +----------------+
|    Users      |       |     Scores     |
+---------------+       +----------------+
| _id           |<----- | _id            |
| name          |       | userId         |
| username      |       | score          |
| email         |       | gameId         |
| password      |       | date           |
| role          |       +----------------+
| status        |
+---------------+
```

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