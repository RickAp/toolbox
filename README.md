Este proyecto consiste en una aplicación fullstack que muestra y filtra datos de archivos CSV obtenidos de una API externa.
Prerequisitos

Docker
Docker Compose (viene incluido con Docker Desktop)

Instalación y Ejecución

1. Clonar el repositorio:

git clone [URL_DEL_REPOSITORIO]
cd [NOMBRE_DEL_REPOSITORIO]

2. Iniciar la aplicación con Docker Compose:

docker-compose up --build

3. La aplicación estará disponible en:

Frontend: http://localhost:3000
Backend: http://localhost:3001

Estructura del Proyecto:

.
├── backend/               # API REST con Node.js y Express
│   ├── src/              # Código fuente del backend
│   ├── test/             # Tests del backend
│   └── Dockerfile        # Configuración de Docker para backend
├── frontend/             # Aplicación React
│   ├── src/              # Código fuente del frontend
│   ├── public/           # Archivos públicos
│   └── Dockerfile        # Configuración de Docker para frontend
└── docker-compose.yml    # Configuración de Docker Compose

Desarrollo

Para ejecutar los tests:

Backend:

cd backend
npm test

Frontend:
cd frontend
npm test

Tecnologías Utilizadas:

Backend:
Node.js
Express
Mocha & Chai para testing


Frontend:
React
Redux
React Bootstrap
Jest para testing

Endpoints API:

GET /files/data: Obtiene todos los datos de los archivos
GET /files/data?fileName=: Filtra datos por nombre de archivo
GET /files/list: Obtiene la lista de archivos disponibles

Notas Adicionales

Asegúrate de que los puertos 3000 y 3001 estén disponibles en tu máquina
Si encuentras algún problema con Docker, asegúrate de que Docker Desktop esté corriendo
Para detener la aplicación, usa docker-compose down
Si hay algun problema con Docker, puedes levantar los proyectos con npm run dev para el backend y npm run start para el frontend
