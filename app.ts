import Koa from 'koa'
import serve from 'koa-static'
import cors from 'koa-cors'

import {router as pets} from './routes/pets'
import {router as users} from './routes/users'
import {router as upload} from './routes/upload'
import {router as fav} from './routes/fav'

const app = new Koa()

app.use(cors())
app.use(serve('./docs'))

app.use(pets.routes())
app.use(users.routes())
app.use(upload.routes())
app.use(fav.routes())

export default app