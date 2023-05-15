import 'zone.js/dist/zone-node'

import { ngExpressEngine } from '@nguniversal/express-engine'
import * as express from 'express'
import { join } from 'path'

import { AppServerModule } from './src/main.server'
import { APP_BASE_HREF } from '@angular/common'
import { existsSync } from 'fs'

import * as winston from "winston"
import * as crypto from "crypto"

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    defaultMeta: {service: 'frontend-ssr'},
    transports: [
        new winston.transports.Console()
    ]
  })

  const server = express()
  const distFolder = join(process.cwd(), 'apps/frontend/dist')
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index'

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  )

  server.set('view engine', 'html')
  server.set('views', distFolder)

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  )

  // hack to get around rendering diaktoll
  server.get('/misc/diaktoll', (req, res) => {
    const l = logger.child({ requestID: crypto.randomUUID(), route: req.baseUrl })
    l.info("Starting render")
    res.sendFile(distFolder + '/index.html');
    l.info("Finished render")
  });

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    const l = logger.child({ requestID: crypto.randomUUID(), route: req.path })
    l.info("Starting render")
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] })
    l.info("Finished render")
  })

  return server
}

function run(): void {
  const port = process.env.PORT || 4000

  // Start up the Node server
  const server = app()
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`)
  })
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire
const mainModule = __non_webpack_require__.main
const moduleFilename = (mainModule && mainModule.filename) || ''
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run()
}

export * from './src/main.server'
