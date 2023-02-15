//    jshint esversion:6
const express = require('express')

/* eslint-disable no-unused-vars */
const ejs = require('ejs')

//load lodash
var _ = require('lodash');

const homeStartingContent = 'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.'
const aboutContent = 'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.'
const contactContent = 'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.'
/* eslint-disable no-unused-vars */
const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(express.json())

const posts = []

//root route method , rendering posts[] on home page
app.get('/', (req, res) => {
  res.render('home',
    {
      homeContent: homeStartingContent,
      posts
    })
})

//about route, with some static contents 
app.get('/about', (req, res) => {
  res.render('about',
    {
      aboutContent
    })
})

//contact route with static content
app.get('/contact', (req, res) => {
  res.render('contact',
    {
      contactContent
    })
})

//compose route 
app.get('/compose', (req, res) => {
  res.render('compose')
})

//composes post method that accepts inputs, processes it with body-parser and stores an sn object in the post array
app.post('/compose', (req, res) => {
  const postTitle = req.body.postTitle
  const postContent = req.body.postContent
  const postObj = {
    title: postTitle,
    content: postContent
  }
  posts.push(postObj)
  res.redirect('/')
})

// method to set up routes
app.get('/posts/:postID', (req, res) => {
  let postTitle = req.params.postID
  let postContent = ''
  let title = ''
  
  posts.forEach((post) => {
    title = post.title
    content = post.content
  })

  if (_.toLower(postTitle) == _.toLower(title)) {
    res.render(
      'post', 
      {
        title,
        content
      })
  }
})

// app .listen
app.listen(3000, () => {
  console.log('Server started on port 3000')
})
