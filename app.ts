import Koa from 'koa'
import serve from 'koa-static'
import cors from 'koa-cors'

import {router as users} from './routes/users'
import {router as uploads} from './routes/uploads'
import {router as special} from './routes/special'
import {router as articles} from './routes/articles'

const app = new Koa()

app.use(cors())
app.use(users.routes())
app.use(uploads.routes())
app.use(special.routes())
app.use(articles.routes())
app.use(serve('./docs'))

export default app