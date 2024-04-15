import "reflect-metadata";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { CountryResolver } from "./resolvers/CountryResolver";
import { db } from "./db";
import { ContinentResolver } from "./resolvers/ContinentResolver";

const port = 4001;

buildSchema({
  resolvers: [CountryResolver, ContinentResolver],
}).then(async (schema) => {
  await db.initialize();
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, { listen: { port } });
  console.log(`graphql server listening on ${url}`);
});