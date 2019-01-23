/**
 * Created by vivalaakam on 23.01.2019.
 *
 * @flow
 */

// process.env.BABEL_ENV = 'development'
process.env.PROXY_SERVER = 'http://localhost:4000'
const path = require('path')
const express = require('express')
const webpack = require('webpack')

const history = require('connect-history-api-fallback')
const config = require('./config/webpack.config')

const app = express()


app.get('/api', (req, res) => {
  res.send('hello express server')
})

app.use(history())

const conf = config(process.env.NODE_ENV)

const compiler = webpack(conf)
if (process.env.NODE_ENV === 'development') {
  // app.use(express.static(path.join(__dirname, 'public')))
  const dev_middleware = require('webpack-dev-middleware')
  const hot_middleware = require('webpack-hot-middleware')
  app.use(dev_middleware(compiler, {
    publicPath: conf.output.publicPath,
    noInfo: true
  }))

  app.use(hot_middleware(compiler, {}))
} else {
  app.use(express.static(path.join(__dirname, 'build')))
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })
}


app.listen(3000, () => console.log('Example app listening on port 3000!'))
