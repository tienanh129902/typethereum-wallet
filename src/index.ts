import "reflect-metadata";
// import {createConnection} from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./modules/userResolver";
import mongoose from "mongoose";
import { TokenResolver } from "./modules/tokenResolver";
import { TransferResolver } from "./modules/transferResolver";

(async () => {
  const app = express();
  // @ts-ignore
  await mongoose.connect(`mongodb://localhost:27017`, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => console.log("err: ", err));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        TokenResolver,
        TransferResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("Express server started at http://localhost:4000/graphql");
  });
})();

// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
