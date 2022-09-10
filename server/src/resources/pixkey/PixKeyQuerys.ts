import PixKey from '../../models/PixKey'
import { GraphQLContext } from 'services/context'
import { MyKeyTypeGQL } from './PixKeyTypes'

const querys = {
  myKeys: {
    type: MyKeyTypeGQL,
    async resolve(parent: unknown, args: unknown, context: GraphQLContext) {
      const { currentUser } = context
      if (context.currentUser === null) throw new Error('Unauthenticated')

      const keys = await PixKey.find({ user: currentUser?.id })
      return {
        keys,
      }
    },
  },
}

export default querys
