import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import mongoose from "mongoose";
import { typeDefs } from "./graphql/schema.js";
import dotenv from "dotenv";
import { context } from './middleware/context.js';
import { bookResolvers } from "./graphql/resolvers/bookResolvers.js";
import { branchResolvers } from "./graphql/resolvers/branchResolvers.js";
import { peopleCountResolver, availBookResolver } from "./graphql/resolvers/operationResolvers.js";
import { staffResolvers } from "./graphql/resolvers/staffResolvers.js";
import { studentResolvers } from "./graphql/resolvers/studentResolvers.js";
import { subjectResolvers } from "./graphql/resolvers/subjectResolvers.js";
import { timeLogResolvers } from "./graphql/resolvers/timeLogResolvers.js";
import { authorisationResolvers } from './graphql/resolvers/authenticationResolvers.js';

dotenv.config();

const port = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("Db connxn Success"); })
    .catch((err) => { console.log(err); });

const server = new ApolloServer({
    typeDefs,
    resolvers: [bookResolvers, branchResolvers, peopleCountResolver, availBookResolver, staffResolvers, studentResolvers, subjectResolvers, timeLogResolvers, authorisationResolvers],

})

const { url } = await startStandaloneServer(server, {
    context,
    listen: { port }
})

console.log(`Server ready at: ${url}`)