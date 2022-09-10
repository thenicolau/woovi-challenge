import { compare, hash } from 'bcryptjs'
import settings from '../../config/settings'
import { GraphQLString } from 'graphql'
import { sign } from 'jsonwebtoken'
import User from '../../models/User'
import { LoginTypeGQL, UserCreateTypeGQL } from './UserTypes'
const mutations = {
  signup: {
    type: UserCreateTypeGQL,
    args: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    async resolve(
      _root: unknown,
      args: { name: string; email: string; password: string }
    ) {
      const existUser = await User.findOne({ email: args.email })
        .select('_id')
        .lean()
      if (existUser) throw new Error('User already exist')
      const password = await hash(args.password, 10)
      const user = await User.create({ ...args, balance: 0, password })
      const token = sign({ userId: user.id }, settings.JWT_SECRET)
      return {
        token,
        user,
      }
    },
  },
  login: {
    type: LoginTypeGQL,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    async resolve(_root: unknown, args: { email: string; password: string }) {
      const user = await User.findOne({ email: args.email })
      if (!user) throw new Error('User not found')

      const valid = await compare(args.password, user.password)

      if (!valid) throw new Error('email or password invalid')

      const token = sign({ userId: user.id }, settings.JWT_SECRET)
      return {
        token,
      }
    },
  },
}

export default mutations
