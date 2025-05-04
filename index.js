const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const sequelize = require("./db");

const app = express();

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

sequelize.sync().then(() => {
  app.listen(4000, () => {
    console.log("Servidor GraphQL en http://localhost:4000/graphql");
  });
}).catch(err => {
  console.error("Error al conectar con la base de datos:", err);
});