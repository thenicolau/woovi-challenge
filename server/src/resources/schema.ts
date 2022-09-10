import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import userSchema from './user/UserIndex'
import pixKeySchema from './pixkey/PixKeyIndex'

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...userSchema.query,
    ...pixKeySchema.query,
  },
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    ...userSchema.mutation,
    ...pixKeySchema.mutation,
  },
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
})
