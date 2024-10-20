# Game Score Manager - Backend

Este es el backend del proyecto **Game Score Manager**, desarrollado con **NestJS**. Proporciona una API para la gestión de usuarios, puntuaciones de videojuegos y autenticación de usuarios.

## Características principales

- Gestión de usuarios (registro, inicio de sesión, autenticación).
- CRUD de puntuaciones de videojuegos.
- Autenticación basada en tokens JWT.
- Seguridad con autenticación de usuarios para gestionar sus puntuaciones.
- Soporte para autenticación con GitHub y Gmail.
- Integración con operaciones asincrónicas para obtener, agregar y eliminar puntuaciones.

## Tecnologías utilizadas

- **NestJS**: Framework backend basado en Node.js y TypeScript.
- **TypeScript**: Para tipado estático y mejor legibilidad.
- **JWT (JSON Web Token)**: Autenticación de usuarios.
- **TypeORM**: Interacción con la base de datos.
- **PostgreSQL** (o cualquier otra base de datos SQL).
- **Passport.js**: Para manejar la autenticación con proveedores como GitHub y Gmail.
- **RTK Query**: Para gestión de estados y solicitudes asincrónicas en el frontend.

## Instalación y Configuración

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tuusuario/GameScoreManager.git
   cd GameScoreManager/backend

2. Instalar dependencias

`npm install`

3. Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables:

DATABASE_URL=postgresql://username:password@localhost:5432/gamescoredb
JWT_SECRET=tu_secreto_jwt
GITHUB_CLIENT_ID=tu_client_id_github
GITHUB_CLIENT_SECRET=tu_client_secret_github
GMAIL_CLIENT_ID=tu_client_id_gmail
GMAIL_CLIENT_SECRET=tu_client_secret_gmail

4. Ejecutar la base de datos

Si utilizas Docker, puedes ejecutar PostgreSQL con el siguiente comando

docker-compose up -d

5. Iniciar la aplicacion

`npm run start:dev`

## Estructura del proyecto

src/
├── auth/         # Maneja la autenticación de usuarios (JWT, GitHub, Gmail)
├── users/        # Módulo para la gestión de usuarios
├── scores/       # Módulo para la gestión de puntuaciones
├── database/     # Configuración de la conexión con la base de datos
├── common/       # Utilidades y middlewares compartidos
└── main.ts       # Punto de entrada de la aplicación

## Endpoints principales

### Usuarios:

POST /auth/register: Registro de usuario.
POST /auth/login: Inicio de sesión de usuario.
POST /auth/github: Autenticación con GitHub.
POST /auth/gmail: Autenticación con Gmail.

### Puntuaciones:

GET /scores: Obtener todas las puntuaciones.
POST /scores: Agregar una nueva puntuación.
DELETE /scores/:id: Eliminar una puntuación.

## Pruebas

Para ejecutar pruebas, utiliza:

`npm run test`

## Licencia

Este proyecto está bajo la licencia MIT.


Con esto, ya tienes un archivo `README.md` para tu proyecto de backend con NestJS que incluye todas las secciones necesarias para la configuración e implementación del proyecto.
