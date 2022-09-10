import settings from '../config/settings'
import { JwtPayload, verify } from 'jsonwebtoken'
import Koa from 'koa'
import User, { IUser } from '../models/User'

export async function authenticateUser(
  request: Koa.ParameterizedContext
): Promise<IUser | null> {
  const { authorization } = request.headers
  if (authorization) {
    const token = authorization.split(' ')[1]
    const tokenPayload = verify(token, settings.JWT_SECRET) as JwtPayload
    const userId = tokenPayload.userId

    return await User.findById(userId)
  }

  return null
}
