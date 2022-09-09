import app from './server'
import Database from './database/config'

const port = process.env.PORT || 4000
app.listen(port, () => {
  Database()
})
