const express = require('express')
const app = express()
// loading body-parser
const bodyParser = require('body-parser')
// loading our routers
const mainRouter = require('./mainRoutes.js')
const classRouter = require('./classRoutes.js')
// tell express to use bodyParser for JSON and URL encoded form bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// mounting our routers
app.use('/', mainRouter)
app.use('/class', classRouter)
// add public directory
app.use('/cdn', express.static('public')) /* this will mount your public
directory to '/cdn'. i.e. your scripts folder will be at /cdn/scripts */
app.listen(3000)
console.log('Express server running on port 3000')
