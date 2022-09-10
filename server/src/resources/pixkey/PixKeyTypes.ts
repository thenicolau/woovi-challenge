import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'

export const KeyTypeGQL = new GraphQLObjectType({
  name: 'NewKey',
  fields: () => ({
    key: { type: GraphQLString },
    type_key: { type: GraphQLString },
  }),
})

export const MyKeyTypeGQL = new GraphQLObjectType({
  name: 'MyKeys',
  fields: () => ({
    keys: { type: new GraphQLList(KeyTypeGQL) },
  }),
})

export const TypePixKey = ['DOCUMENT', 'EMAIL', 'PHONE_NUMBER', 'RANDOM']
