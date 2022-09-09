import { GraphQLString } from 'graphql'
import User from '../../models/User'
import { UserTypeGQL } from './UserTypes'

const querys = {
  user: {
    type: UserTypeGQL,
    args: { id: { type: GraphQLString } },
    resolve(parent: unknown, args: { id: string }) {
      return User.findById(args.id)
    },
  },
}

export default querys
