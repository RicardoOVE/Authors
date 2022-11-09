/*
npm init -y
"start": "nodemon server.js"
npm install express mongoose cors
create subfolders (server folders)

2nda terminal (instalación React):
npx create-react-app client
cd client
npm install axios react-router-dom@5.3.0

npm start

1ra terminal:
npm start

Front:
Agregar link a bootstrap en index.html
Quitar <React.StrictMode> en index.js

Back:
Crear mongoose.config.js
autor.modelo.js
autor.controller.js
autor.routes.js

npm install bcrypt
npm install jsonwebtoken cookie-parser
*/

const express = require("express");
const cors = require("cors");
const app = express();

const cookieParser = require('cookie-parser')

//Para usar cookies en la aplicación
app.use(cookieParser());

//Para poder usar Json y obtener datos de la url
app.use( express.json(), express.urlencoded({extended: true}) );

//Permite accesar de un origen distinto
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true // Usuario haya iniciado sesión, que tenga credenciales
    })
);

//Inicializar DB
require("./server/config/mongoose.config")

//Importar las rutas
const misRutas = require("./server/routes/autor.routes");
misRutas(app);

//Ejecutamos server
app.listen(8000, ()=>console.log("Servidor listo!"));