import graphql, { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql'


export const UserTypeGQL = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        balance: { type: GraphQLInt }
    })
})

export const UserCreateTypeGQL = new GraphQLObjectType({
    name: 'UserCreate',
    fields: () => ({
        user: { type: UserTypeGQL },
        token: { type: GraphQLString }
    })
})

