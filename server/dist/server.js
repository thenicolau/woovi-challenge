"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_mount_1 = __importDefault(require("koa-mount"));
const graphql_1 = require("graphql");
const koa_graphql_1 = require("koa-graphql");
// Construct a schema, using GraphQL schema language
const schema = (0, graphql_1.buildSchema)(`
  type Query {
    hello: String
  }
`);
// The root provides a resolver function for each API endpoint
const root = {
    hello: () => 'Hello world!',
};
const app = new koa_1.default();
app.use((0, koa_mount_1.default)('/graphql', (0, koa_graphql_1.graphqlHTTP)({
    schema,
    rootValue: root,
    graphiql: { headerEditorEnabled: true },
})));
exports.default = app;
//# sourceMappingURL=server.js.map