const express = require('express')
const path = require('path')
const router = express.Router()
var classList = [] // our class list array

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'index.html'))
})
// RESTful api
router.get('/api/list', function (req, res) {
  res.json(classList) // Respond with JSON
})
router.get('/api/seeInfo', function (req, res) {
  res.json()
})
router.get('/api/get/:id', function (req, res) {
  res.json(classList[req.params.id]) // Notice the wildcard in the URL?
  // Try browsing to /api/get/0 once you've added some entries
})

// for local storage
router.post('/api/createList', function (req, res) {
  classList = req.body
  res.status(201).json({ statusMessage: '201 Created List' })
})

// Create
router.post('/api/create', function (req, res) {
  console.log('Creating the following student:', req.body.student)
  classList.push(req.body.student)
  res.status(201).json({ statusMessage: '201 Created' })
  // res.redirect(req.baseUrl + '/api/list')
})
router.get('/create', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'create.html'))
})
// Delete
router.post('/api/delete', function (req, res) {
  console.log('Deleting the following student:', req.body.studentDel)
  var i = classList.indexOf(req.body.studentDel)
  if (i > -1) {
    classList.splice(i, 1)
  }
  res.status(201).json({ statusMessage: '201 Created' })
  // res.redirect(req.baseUrl + '/api/list')
})

router.get('/delete', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'delete.html'))
})
// Edit
router.get('/edit', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'edit.html'))
})
router.post('/api/edit', function (req, res) {
  console.log('editing a student entry')
  var i = classList.indexOf(req.body.studentOld)
  if (i > -1) {
    classList.splice(i, 1)
  }
  classList.push(req.body.studentNew)
  res.status(201).json({ statusMessage: '201 Created' })
  // res.redirect(req.baseUrl + '/api/list')
})
// Add Info
router.get('/addInfo', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'addInfo.html'))
})
router.post('/api/addInfo', function (req, res) {
  console.log('adding information to a student entry')
  var i = classList.indexOf(req.body.studentName)
  if (i > -1) {
    classList[i] = req.body.studentName + ' ' + req.body.studentNum + ' ' + req.body.studentCourse
  }
  res.redirect(req.baseUrl + '/api/list')
})
// Delete Course
router.get('/DelCourse', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'DelCourse.html'))
})
router.post('/api/DelCourse', function (req, res) {
  console.log('deleting course from a student entry')
  var i = classList.indexOf(req.body.studentNameDel + ' ' + req.body.studentNumDel + ' ' + req.body.studentCourseDel)
  if (i > -1) {
    classList[i] = req.body.studentNameDel + ' ' + req.body.studentNumDel
  }
  res.redirect(req.baseUrl + '/api/list')
})
module.exports = router
