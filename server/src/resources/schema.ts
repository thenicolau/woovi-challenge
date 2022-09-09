import { GraphQLSchema, GraphQLObjectType, GraphQLString} from 'graphql';
import User from "../models/User";
import { UserCreateTypeGQL, UserTypeGQL } from "./userType";
import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserTypeGQL,
      args: { id: { type: GraphQLString }},
      resolve(parent: unknown, args: { id: string }) {
        return User.findById(args.id)
      }
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    signup: {
      type: UserCreateTypeGQL,
      args: { name: { type: GraphQLString }, email: { type: GraphQLString }, password: { type: GraphQLString }},
      async resolve(_root: unknown, args: { name: string, email: string, password: string}) {
        const existUser = await User.findOne({ 'email': args.email }).select("_id").lean()
        if (existUser) throw new Error('User already exist')
        const password = await hash(args.password, 10)
        const user = await User.create({...args, balance: 0, password})
        const token = sign({ userId: user.id }, 'SECRET')
        return {
          token,
          user
        }
      }
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});