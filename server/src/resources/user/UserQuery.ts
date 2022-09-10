import { GraphQLString } from 'graphql'
import { GraphQLContext } from 'services/context'
import User from '../../models/User'
import { UserTypeGQL } from './UserTypes'

const querys = {
  me: {
    type: UserTypeGQL,
    async resolve(parent: unknown, args: unknown, context: GraphQLContext) {
      return context.currentUser
    },
  },
  user: {
    type: UserTypeGQL,
    args: { id: { type: GraphQLString } },
    async resolve(
      parent: unknown,
      args: { id: string },
      context: GraphQLContext
    ) {
      if (context.currentUser === null) {
        throw new Error('Unauthenticated')
      }
      return await User.findById(args.id)
    },
  },
}

export default querys
