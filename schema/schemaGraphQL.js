const { buildSchema } = require("graphql");

exports.schemaGraphQL = buildSchema(`
type Query {
  Name(user_id: String!, name: String!): [Promt]
  Etiqueta(user_id: String!, etiquetas: String!): [Promt]
  GetAll(user_id: String!): [Promt]
}

type Promt {
  id: ID!
  name: String
  tipo: String
  idUser: String
  etiquetas: String
}`);

