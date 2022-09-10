import { IUser } from '../models/User'
import Koa from 'koa'
import { authenticateUser } from './auth'
export type GraphQLContext = {
  currentUser: IUser | null
}

export async function contextFactory(
  request: Koa.ParameterizedContext
): Promise<GraphQLContext> {
  return {
    currentUser: await authenticateUser(request),
  }
}
