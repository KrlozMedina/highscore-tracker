# HighScore Tracker

## Índice

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Objetivos del Proyecto](#objetivos-del-proyecto)
- [Funcionalidades Principales](#funcionalidades-principales)
    - [Para Jugadores](#para-jugadores)
    - [Para Administradores](#para-administradores)
- [Tecnologías a Implementar](#tecnologías-a-implementar)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Integraciones Opcionales](#integraciones-opcionales)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints del Proyecto](#endpoints-del-proyecto)
  - [Backend](#endpoints-del-backend)
  - [Frontend](#endpoints-del-frontend)
- [Diagrama de la Base de Datos](#diagrama-de-la-base-de-datos)
    - [MongoDB (Scores)](#mongodb-scores)
    - [PostgreSQL (Usuarios)](#postgresql-usuarios)
    - [Redis (Sesiones)](#redis-sesiones)
    - [Relación entre Base de Datos](#relación-entre-base-de-datos)
- [Workspaces](#workspaces)
    - [Workspaces del Proyecto](#workspaces-del-proyecto)
    - [Beneficios de Usar Workspaces](#beneficios-de-usar-workspaces)
    - [Configuración de Workspaces](#configuración-de-workspaces)
- [Conclusión](#conclusión)
- [Documentación de Origen](#documentación-de-origen)
- [Contribuciones](#contribuciones)

## Descripción del Proyecto

**HighScore Tracker** es una aplicación web fullstack diseñada para gestionar y visualizar las puntuaciones de los jugadores en videojuegos en línea. Los jugadores pueden registrarse en la plataforma, iniciar sesión y ver sus puntuaciones en tiempo real, que se actualizan automáticamente conforme juegan. Las puntuaciones más altas aparecen en un ranking global, permitiendo a los jugadores comparar su rendimiento. Los administradores, por su parte, cuentan con un panel de administración donde pueden gestionar los usuarios y sus puntuaciones de manera eficiente, manteniendo la precisión y confiabilidad del ranking.

## Objetivos del Proyecto

- Desarrollar una plataforma web que permita el registro y visualización de las puntuaciones de los jugadores de manera automática.
- Implementar una interfaz amigable que permita a los jugadores consultar sus puntuaciones y compararlas en un ranking global actualizado en tiempo real.
- Crear un sistema de autenticación seguro para jugadores y administradores, que incluya opciones de registro mediante correo electrónico o redes sociales (OAuth, Google, GitHub).
- Proveer un panel de administración donde los administradores puedan gestionar usuarios y puntuaciones, incluyendo opciones para editar, eliminar o bloquear cuentas, manteniendo así la integridad de la plataforma.
- Mantener la escalabilidad del sistema utilizando tecnologías modernas tanto para el frontend como para el backend, así como bases de datos NoSQL y SQL para almacenar la información de manera eficiente.

## Funcionalidades del Proyecto

### Para Jugadores

- **Registro y Autenticación**: Los jugadores pueden registrarse en la plataforma con su correo electrónico o mediante redes sociales (OAuth, Google, GitHub).
- **Visualización de Puntuaciones**: Acceso a un panel donde pueden ver sus puntuaciones en tiempo real, además del ranking global que muestra los mejores puntajes.
- **Actualización Automática de Puntuaciones**: Las puntuaciones de los jugadores se registran automáticamente cuando juegan, permitiendo una visualización actualizada sin necesidad de intervención manual.
- **Perfil de Usuario**: Los jugadores pueden ver y actualizar su perfil, además de consultar estadísticas de juego como puntuaciones máximas y promedios.

### Para Administradores

- **Panel de Administración**: Los administradores tienen acceso a un panel de control para gestionar a todos los usuarios registrados y sus puntuaciones.
- **Gestión de Usuarios**: Funcionalidad para añadir, editar, eliminar o bloquear usuarios, manteniendo la seguridad y confiabilidad de la plataforma.
- **Gestión de Puntuaciones**: Opciones para visualizar, ordenar y filtrar puntuaciones, así como eliminar registros erróneos o sospechosos.

## Tecnologías a Implementar

### Frontend

- **Next.js (React.js)**: Framework de React que permite renderizado del lado del servidor, optimización de rutas, y facilita la creación de aplicaciones de alto rendimiento y SEO-friendly.
- **React-Bootstrap**: Librería de componentes basada en Bootstrap, integrada en React, que simplifica la creación de interfaces de usuario responsivas y atractivas.
- **Redux Toolkit**: Herramienta para la gestión del estado global de la aplicación, ideal para manejar el flujo de datos entre los diferentes componentes.
- **Redux Persist**: Extensión de Redux que permite almacenar el estado global en el almacenamiento local del navegador, asegurando que la información se mantenga incluso después de cerrar o recargar la aplicación.

### Backend

- **Nest.js**: Framework de Node.js que aprovecha TypeScript para crear aplicaciones escalables y estructuradas en módulos, ideal para APIs robustas y mantenibles.
- **MongoDB con Mongoose**: Base de datos NoSQL para almacenar puntajes de usuarios y sus estadísticas. Mongoose facilita la interacción con MongoDB mediante modelos definidos en el esquema.
- **PostgreSQL con Prisma**: Base de datos SQL que almacena información estructurada de los usuarios, Prisma facilita la comunicación entre Nest.js y PostgreSQL, y gestiona las consultas y validaciones de manera eficiente.
- <font color="gray">**JWT (JSON Web Token)**: Estándar de autenticación segura que se utiliza para proteger el acceso a la aplicación. Permite la creación de sesiones de usuario sin necesidad de almacenar sesiones en el servidor.</font>
- <font color="gray">**Bcrypt**: Librería para el cifrado seguro de contraseñas, garantizando que se almacenen de forma segura en la base de datos.</font>

### Integraciones Opcionales

- <font color='gray'> **OAuth2 (Google, GitHub)**: Protocolo de autorización que permite a los usuarios registrarse e iniciar sesión con sus cuentas de Google o GitHub, mejorando la accesibilidad y seguridad. </font>
- <font color="gray">**Socket.io**: Librería para habilitar la comunicación en tiempo real entre el servidor y el cliente, ideal para actualizar los puntajes y el ranking sin necesidad de recargar la página.
</font>

## Estructura del Proyecto

El proyecto está organizado en **packages**, que alberga tanto el **frontend** como el **backend**. 

El **backend** está desarrollado en **NestJS** y contiene toda la lógica de negocio y las APIs. Su organización en módulos permite gestionar la autenticación, usuarios, y puntuaciones de forma separada, facilitando así la escalabilidad y mantenimiento del código. En la carpeta `src`, se encuentran los módulos: `auth`, que gestiona la autenticación; `user`, dedicado a la gestión de usuarios; y `score`, que se encarga de las puntuaciones, cada uno con su controlador, servicio y módulo correspondiente.

Por otro lado, el **frontend** se construyó con **Next.js**. La estructura de la interfaz se organiza en la carpeta `app/`, mientras que los `components/` albergan elementos reutilizables, y el `store/` contiene la configuración de **Redux Toolkit**. Además, la carpeta `api` integra las conexiones a APIs, y hay secciones específicas para las páginas de puntuaciones, autenticación y usuarios.

La carpeta **docs** contiene la documentación del proyecto, que incluye la documentación de Swagger en la carpeta `api`, y los datos iniciales para las bases de datos en la carpeta `data`. 

En la raíz del proyecto se encuentra el archivo `docker-compose.yml`, que se utiliza para orquestar los contenedores de **Docker**, `.gitignore` para excluir archivos no deseados, y `package.json` que maneja las dependencias y scripts a nivel general. 

Los archivos de configuración de **Docker** y **docker-compose** permiten contenerizar el proyecto, definiendo los contenedores necesarios para **MongoDB**, **PostgreSQL** y **Redis**, asegurando una configuración homogénea en todos los entornos.

```plaintext
Estructura del Proyecto
├── packages
│   ├── backend
│   │   ├── prisma
│   │   ├── src
│   │   │   ├── modules
│   │   │   │   ├── auth
│   │   │   │   ├── user
│   │   │   │   └── score
│   │   ├── test
│   │   └── Dockerfile
│   └── frontend
│       ├── components
│       ├── app
│       │   ├── api
│       │   │   ├── v1
│       │   │   │   ├── auth
│       │   │   │   │   ├── login
│       │   │   │   │   └── register
│       │   │   │   ├── scores
│       │   │   │   │   └── leaderboard
│       │   │   │   └── users
│       │   │   │   │   ├── admin
│       │   │   │   │   │   └── scores
│       │   │   │   │   ├── profile
│       │   │   │   │   └── scores
│       │   ├── auth
│       │   │   ├── login
│       │   │   └── register
│       │   ├── scores
│       │   │   └── leaderboard
│       │   └── users
│       │   │   ├── admin
│       │   │   │   └── scores
│       │   │   ├── profile
│       │   │   └── scores
│       └── store
├── docs
│   ├── api
│   └── data
└── docker-compose.yml
```

## Endpoints del Proyecto

### Endpoints del Backend

#### **Base URL**
- [http://localhost:3001/api/v1](http://localhost:3001/api/v1)
- [http://127.0.0.1:3001/api/v1](http://172.10.10.1:3001/api/v1)

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
            - `userId`: The ID that needs to be fetched
        - **Responses:**
            - **200:** User data uploaded successfully
            - **401:** Unauthorized
            - **400:** User bad request

- **Update User Profile**
    - **PUT** `/users/profile/{userId}`
        - **Summary:** Update profile user
        - **Description:** Update profile user by ID
        - **Path Parameters:**
            - `userId`: The ID that needs to be fetched
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
            - `userId`: The ID that needs to be fetched
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

El frontend se comunica con el backend a través de las API mencionadas anteriormente, utilizando **Redux Toolkit** para realizar las solicitudes a los endpoints y gestionar el estado de los datos. Los endpoints del frontend son los siguientes:

#### Base URL

- [http://localhost:3000/](http://localhost:3000/)
- [http://127.0.0.1:3000/](http://127.0.0.1:3000/)

#### Authentication
- **Register**: `/auth/register`
- **Login**: `/auth/login`

#### Scores
- **Registrar score**: `/scores/:userId`
- **Los mejores puntajes**: `/scores/leaderboard`

#### Users
- **Obtener datos de los usuarios**: `/users/admin` (permitiendo habilitar, deshabilitar o bloquear usuarios)
- **Obtener los scores de los usuarios**: `/users/admin/scores` (permitiendo eliminarlos)
- **Mostrar los datos del usuario**: `/users/profile/:userId`
- **Mostrar los scores por usuario**: `/users/scores/:userId`

## Diagrama de la Base de Datos

### MongoDB

#### Tabla `users`

La tabla `scores` almacena las puntuaciones obtenidas por los usuarios en los juegos.

| Columna       | Tipo de Dato | Descripción                                      |
|---------------|--------------|--------------------------------------------------|
| `scoreId`     | UUID         | Identificador único de la puntuación (Primary Key).|
| `userId`      | UUID         | ID del usuario que obtuvo la puntuación (FK a `users.userId`).|
| `game`        | VARCHAR      | Nombre del juego en el que se obtuvo la puntuación.|
| `score`       | INT          | Puntuación obtenida por el usuario.              |
| `createdAt`   | TIMESTAMP    | Fecha y hora de creación del registro de puntuación.|
| `updatedAt`   | TIMESTAMP    | Fecha y hora de la última actualización de la puntuación.|

### PostgreSQL (Usuarios)

#### Tabla `users`
La tabla `users` almacena información relacionada con los usuarios del sistema.

| Columna       | Tipo de Dato | Descripción                                      |
|---------------|--------------|--------------------------------------------------|
| `userId`      | UUID         | Identificador único del usuario (Primary Key).   |
| `username`    | VARCHAR      | Nombre de usuario único.                        |
| `name`        | VARCHAR      | Nombre completo del usuario.                     |
| `email`       | VARCHAR      | Correo electrónico del usuario.                  |
| `password`    | VARCHAR      | Contraseña del usuario (encriptada).             |
| `avatar`      | VARCHAR      | URL del avatar del usuario.                      |
| `status`      | VARCHAR      | Estado del usuario (activo, inactivo, suspendido).|
| `role`        | UUID         | ID del rol asociado con el usuario (FK).         |
| `createdAt`   | TIMESTAMP    | Fecha y hora de creación del usuario.            |
| `updatedAt`   | TIMESTAMP    | Fecha y hora de la última actualización.         |

#### Tabla `roles`
La tabla `roles` define los roles disponibles para los usuarios en el sistema.

| Columna       | Tipo de Dato | Descripción                                      |
|---------------|--------------|--------------------------------------------------|
| `roleId`      | UUID         | Identificador único del rol (Primary Key).       |
| `name`        | VARCHAR      | Nombre del rol (Ej. "Admin", "User", "Guest").   |

#### Tabla `_UserRoles`
La tabla `_UserRoles` es una tabla intermedia que gestiona la relación muchos a muchos entre los usuarios y los roles. Un usuario puede tener múltiples roles.

| Columna       | Tipo de Dato | Descripción                                      |
|---------------|--------------|--------------------------------------------------|
| `B`           | UUID         | ID del usuario (Foreign Key a `users.userId`).   |
| `A`           | UUID         | ID del rol (Foreign Key a `roles.roleId`).       |

#### Relaciones entre Tablas

1. **Relación entre `users` y `roles`**:
    - Un usuario puede tener múltiples roles, lo que se gestiona a través de la tabla intermedia `_UserRoles`.
    - La relación es muchos a muchos, ya que un rol puede ser asignado a múltiples usuarios.

2. **Relación entre `users` y `scores`**:
    - Un usuario puede registrar múltiples puntuaciones, por lo que la relación es de uno a muchos entre `users` y `scores`.
    - Cada puntuación está asociada con un usuario específico.

### Redis (Sesiones)

Redis se utiliza para la gestión de sesiones, almacenando información temporal de autenticación y control de sesiones activas para una experiencia de usuario sin interrupciones.

### Relación entre Base de Datos

Aquí se muestra un diagrama simple que ilustra las relaciones entre las colecciones y los atributos principales.

```plaintext
+---------------+        +----------------+
|    Users      |        |     Scores     |
+---------------+        +----------------+
| _id           |        | scoreId        |
| userId        | <----- | userId         |
| name          |        | userId         |
| username      |        | score          |
| email         |        | gameId         |
| password      |        | createdAt      |
| role          |        | updatedAt      |
| status        |        +----------------+
| avatar        |       
| createdAt     |       
| updatedAt     |       
+---------------+
```

#### Relaciones
- Un User puede tener múltiples Scores (relación uno a muchos).
- Un Score está asociado a un único User (relación muchos a uno).
- Un Score puede estar asociado a un único Game (si decides incluir la entidad Game).

Cada una de estas bases de datos tiene una función específica, contribuyendo a la separación lógica de datos y facilitando el escalado del proyecto.


Esta sección ahora presenta una descripción completa de la estructura de la base de datos, así como un diagrama claro que muestra las relaciones entre las colecciones. Si necesitas realizar más ajustes o agregar información, no dudes en decírmelo.

## Workspaces

Los **workspaces** son entornos de desarrollo organizados donde los equipos pueden colaborar en proyectos. En este contexto, se han establecido diferentes workspaces para facilitar el trabajo en las distintas áreas del proyecto, asegurando una estructura clara y la separación de responsabilidades.

### Workspaces del Proyecto

El proyecto se organiza en varios workspaces, cada uno dedicado a una funcionalidad específica o a un módulo del sistema. A continuación, se describe la organización de los workspaces utilizados:


- **Frontend**
  - Ubicación: `packages/frontend`
  - Descripción: Este workspace contiene toda la lógica y los componentes de la interfaz de usuario. Se utiliza **Next.js** como framework y **Redux Toolkit** para la gestión del estado.

- **Backend**
  - Ubicación: `packages/backend`
  - Descripción: Este workspace alberga la lógica del servidor, las APIs y la interacción con la base de datos. Se ha implementado **NestJS** como framework principal para el desarrollo del backend.

- **Base de Datos**
  - Descripción: Aunque la base de datos no es un workspace en sí, su configuración y gestión se realizan en el contexto de los workspaces de frontend y backend. MongoDB se utiliza para almacenar las puntuaciones, mientras que PostgreSQL gestiona los datos de usuario.

### Beneficios de Usar Workspaces

- **Organización**: Permite mantener el código de frontend y backend separado, facilitando la navegación y la colaboración.
- **Colaboración**: Los equipos pueden trabajar simultáneamente en diferentes aspectos del proyecto sin interferir unos con otros.
- **Escalabilidad**: Facilita la incorporación de nuevos módulos o funcionalidades sin complicar la estructura existente.

### Configuración de Workspaces

Para iniciar y trabajar en los diferentes workspaces, asegúrate de tener las herramientas necesarias instaladas. La configuración básica incluye:

1. **Instalación de Dependencias**:
    ```bash
    cd packages/backend
    pnpm install
    ```

    ```bash
    cd packages/frontend
    pnpm install
    ```

2. **Ejecutar el proyecto**

    ```bash
    pnpm dev
    ```

3. **Configurar base de datos en Docker**

    1. **Abrir la Terminal en la Raíz del Proyecto**

    2. **Configurar la Base de Datos de MongoDB**

        Ejecuta los siguientes comandos para inicializar y configurar MongoDB:

        ```bash
        docker compose up -d
        ```

        Accede al contenedor de MongoDB:

        ```bash
        docker exec -it mongodb mongosh
        ```

        Luego, en el entorno mongosh, ingresa los siguientes comandos para crear una base de datos y un usuario:

        ```bash 
        use admin
        ```

        ```bash
        db.auth('root', 'root')
        ```

        ```bash
        db = db.getSiblingDB('highscore-tracker_db')
        ```

        ```bash
        db.createUser({
            user: 'bootcampuser',
            pwd: 'bootcamppass',
            roles: [{
                role: 'dbOwner',
                db: 'highscore-tracker_db'
            }]})
        ```

        ```bash
        exit
        ```

        Crear el archivo `.env` para guardar las variables de entorno

        ```env
        MONGODB_URI=mongodb://bootcampuser:bootcamppass@localhost:27017/highscore-tracker_db
        ```

    3. **Importar Datos a MongoDB**

        Ejecuta el siguiente comando para importar los datos desde `data/scores.json`:

        ```bash
        docker exec -i mongodb sh -c "mongoimport -c scores -d bootcamp -u bootcampuser -p bootcamppass --jsonArray --drop" < docs/data/scores.json
        ```

    4. **Configurar la Base de Datos de PostgreSQL**

        Navega a la carpeta del backend:

        ```bash
        cd packages/backend/
        ```

        Ejecuta la migración inicial con Prisma para crear las tablas en PostgreSQL:

        ```bash
        pnpx prisma migrate dev —name init
        ```

        Regresa a la raíz del proyecto:

        ```bash
        cd ../../
        ```

    5. **Ejecutar el Proyecto**

        Inicia el proyecto con el siguiente comando:

        ```bash
        pnpm dev
        ```

    6. **Importar Datos a la Base de Datos de PostgreSQL**

        1. Abre el aplicativo pgAdmin 4.
        2. Registra el servidor PostgreSQL.
            - En la pestaña `General`, ingresa un nombre, por ejemplo: `bootcamp`

            ![alt text](assets/image.png)

        3. En la pestaña Connection, ingresa los siguientes datos:

            - Hostname: `localhost`
            - Username: `bootcampuser`
            - Password: `bootcamppass`

            ![alt text](assets/image-1.png)

    7. **Importar Archivo CSV en PostgreSQL**

        1. Busca la tabla `user` en pgAdmin 4.

        2. Haz clic derecho en la tabla `user` y selecciona `Import/Export Data....`

        3. Selecciona el archivo `users.csv` que está en la carpeta `data`.

        4. Configura el formato como `csv` y el encoding como `UTF8`.

        ![alt text](assets/image-2.png)

## Conclusión

El desarrollo del sistema de gestión de puntuaciones para videojuegos ha sido un viaje significativo que ha abarcado múltiples disciplinas del desarrollo de software, desde la planificación inicial hasta el despliegue y mantenimiento. A través de este proyecto, hemos logrado varios hitos clave que han contribuido a su éxito:

### Logros Clave

- **Integración de Tecnologías:** La combinación de **Next.js** para el frontend, **NestJS** para el backend, y bases de datos como **MongoDB** y **PostgreSQL** ha permitido crear un sistema robusto y escalable que se adapta a las necesidades de los usuarios.
- **Gestión Eficiente del Estado:** La implementación de **Redux Toolkit** ha mejorado significativamente la gestión del estado en el frontend, facilitando la comunicación entre componentes y asegurando una experiencia de usuario fluida.
- **Documentación Completa:** La creación de documentación detallada, incluyendo la definición de la API y diagramas de la base de datos, ha proporcionado una guía clara tanto para desarrolladores actuales como para futuros colaboradores.

### Aprendizajes

A lo largo del proyecto, hemos adquirido valiosas lecciones:

- **Importancia de la Planificación:** La planificación detallada en las primeras fases del proyecto permitió identificar y mitigar riesgos antes de que se convirtieran en problemas mayores.
- **Adaptabilidad y Flexibilidad:** A medida que el proyecto avanzaba, fue esencial adaptarse a nuevos requerimientos y cambios, lo que demostró la importancia de mantener una mentalidad abierta y flexible durante el desarrollo.
- **Colaboración y Comunicación:** La colaboración efectiva entre los miembros del equipo y la comunicación constante con los stakeholders fueron fundamentales para el éxito del proyecto.

### Visión Futura

De cara al futuro, existen varias oportunidades para mejorar y expandir el sistema:

- **Nuevas Funcionalidades:** Se pueden explorar nuevas características, como la integración con plataformas de juegos en línea, mejoras en la gestión de usuarios, y la incorporación de análisis de datos para ofrecer a los administradores información sobre el uso del sistema.
- **Escalabilidad:** A medida que la base de usuarios crezca, se deberá considerar la escalabilidad del sistema para manejar un mayor volumen de datos y tráfico.
- **Mantenimiento y Actualización:** Es fundamental establecer un plan de mantenimiento a largo plazo que garantice la seguridad del sistema y la actualización regular de tecnologías y dependencias.

### Cierre

En resumen, el proyecto de gestión de puntuaciones para videojuegos no solo ha sido una experiencia de aprendizaje enriquecedora, sino que también ha dado lugar a un producto funcional que satisface las necesidades de los usuarios. Agradecemos a todos los involucrados por su apoyo y dedicación, y esperamos ver cómo este sistema puede evolucionar y mejorar en el futuro.

## Documentación de Origen

La información y parámetros para el desarrollo del proyecto fueron obtenidos de las siguientes discusiones en GitHub:

- [Discusión 1](https://github.com/alejo8591/DWFSH3-178/discussions/7)
- [Discusión 2](https://github.com/alejo8591/DWFSH3-178/discussions/6)
- [Discusión 3](https://github.com/alejo8591/DWFSH3-178/discussions/8)
- [Discusión 4](https://github.com/alejo8591/DWFSH3-178/discussions/9)

## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio `https://github.com/KrlozMedina/highscore-tracker.git`.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Añadir nueva característica'`).
4. Envía un pull request.