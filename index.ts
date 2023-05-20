import Koa from 'koa'
import serve from 'koa-static'

const app: Koa = new Koa()

app.use(serve('./docs'))

app.listen(10888)