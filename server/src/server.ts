import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL,
  sendResult,
} from 'graphql-helix'
import Router from '@koa/router'
import schema from './resources/schema'

const app = new Koa()

//Middlewares
app.use(bodyParser())

const router = new Router()

app.use(async ctx => {
  const request = {
    body: ctx.request.body,
    headers: ctx.req.headers,
    method: ctx.request.method,
    query: ctx.request.query,
  }

  if (shouldRenderGraphiQL(request)) {
    ctx.body = renderGraphiQL({})
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request)

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
    })

    ctx.respond = false
    sendResult(result, ctx.res)
  }
})

app.use(router.routes())

app.use(ctx => {
  ctx.status = 404
})

export default app
