import mongoose from 'mongoose'
import settings from '../config/settings'
const URI = settings.MONGO_URI
const initDB = () => {
  mongoose.connect(URI)

  mongoose.connection.once('open', () => {
    console.log('connected to database')
  })
}

export default initDB
