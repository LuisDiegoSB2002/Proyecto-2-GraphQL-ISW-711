const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const secretKey = 'mysecretkey';
const { graphqlHTTP } = require("express-graphql");

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/proyecto', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors()); // Usa el middleware cors

const { schemaGraphQL } = require("./schema/schemaGraphQL.js");

const {searchByName, searchByEtiqueta,getAll} = require("./controllers/promtsController.js");


const graphqlResolvers = {Name: searchByName, Etiqueta: searchByEtiqueta, GetAll: getAll};






app.use(function (req, res, next) {
  
  if (req.headers["authorization"]) {
    // Extraer el token del encabezado "Authorization"
    const authToken = req.headers["authorization"].split(" ")[1];

    try {
      // Verificar y decodificar el token utilizando la clave secreta
      jwt.verify(authToken, secretKey, (err, decodedToken) => {
        if (err || !decodedToken) {
          // Si hay un error o el token no es válido, enviar una respuesta de error de "Unauthorized"
          res.status(401);
          res.json({
            error: "Unauthorized",
          });
        } else {
          // Si el token es válido, continuar con el siguiente middleware o ruta
          next();
        }
      });
    } catch (e) {
      // Si ocurre un error durante la verificación del token, enviar una respuesta de error de "Unauthorized"
      res.status(401);
      res.send({
        error: "Unauthorized",
      });
    }
  } else {
    // Si no se proporciona un token de autorización, enviar una respuesta de error de "Unauthorized"
    res.status(401);
    res.send({
      error: "Unauthorized",
    });
  }
});

app.use("/graphql",graphqlHTTP({
    schema: schemaGraphQL,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);


const PORT = 3002;
app.listen(PORT, () => {
  console.log(
    `Servidor GraphQL funcionando en http://localhost:${PORT}/graphql`
  );
});