import startupConfig from './startup/config.js'
import connection from './startup/db.js'
import {appRoute, app} from './startup/routes.js'

startupConfig()
connection()
appRoute()

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`)) 