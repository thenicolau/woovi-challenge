import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import userSchema from './user/UserIndex'

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...userSchema.query,
  },
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    ...userSchema.mutation,
  },
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
})
