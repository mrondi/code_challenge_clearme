## Code Challenge para Clearme

### Code Features

* Mongoose Transform: Para eliminar y renombrar claves en los documentos
* Schema Validation: Para validar formato de email
* Mongoose Hooks: Para actualzar fechas de creacion y relaciones
* Mongo DB Atlas

### Instalación:

1. Clonar repositorio y ejecutar "npm i" para instalar las dependencias.
2. Ejecutar "npm start" para iniciar el API REST.
3. Para ejecutar las unit test el comando es "npm test".
4. El API utiliza Mongodb Atlas, los datos de conexión se incluyen en el .env

NOTA: Se que no es una buena práctica pero inclui el ".env" en el repositorio a modo de facilitar la instalación.

### Api Docs
https://documenter.getpostman.com/view/14221286/2s93CRKXFe

### Postman Collection:
Se incluye en la carpeta "postman_collection" todos los request necesarios para probar el API REST.

### TODO
* Ampliar el coverage de los UT.
