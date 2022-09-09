import env from 'env-var'
import dotenv from 'dotenv'

dotenv.config()
const settings = {
  MONGO_URI: env.get('MONGO_URI').required().asString(),
  JWT_SECRET: env.get('JWT_SECRET').required().asString(),
}
export default settings
