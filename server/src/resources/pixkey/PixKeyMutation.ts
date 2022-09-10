import { GraphQLString } from 'graphql'
import { GraphQLContext } from '../../services/context'
import { KeyTypeGQL, TypePixKey } from './PixKeyTypes'
import { v4 } from 'uuid'
import PixKey from '../../models/PixKey'

const mutations = {
  newKey: {
    type: KeyTypeGQL,
    args: {
      key: { type: GraphQLString },
      type_key: { type: GraphQLString },
    },
    async resolve(
      _root: unknown,
      args: { key: string; type_key: string },
      context: GraphQLContext
    ) {
      const { currentUser } = context
      if (currentUser === null) {
        throw new Error('Unauthenticated')
      }
      if (!TypePixKey.includes(args.type_key))
        throw new Error('Type key invalid')
      if (typeof args.key !== 'string' && args.type_key !== 'RANDOM')
        throw new Error('Key not found')
      const existKey = await PixKey.findOne({
        key: args.key,
        type_key: args.type_key,
      })
        .select('_id')
        .lean()

      if (existKey) throw new Error('Key already exist')

      if (args.type_key === 'RANDOM') {
        args.key = v4()
      }

      const body = {
        user: currentUser.id,
        key: args.key,
        type_key: args.type_key,
      }

      await PixKey.create({ ...body })

      return {
        ...args,
      }
    },
  },
}

export default mutations
